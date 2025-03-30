import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/schedules?skip=0&limit=10&status=scheduled&startDate=2025-04-01&endDate=2025-04-30'

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function getSchedules() {
  const response = await fetch(`${API_URL}`);
  return handleResponse(response);
}

async function createSchedule(scheduleData) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(scheduleData),
  });
  return handleResponse(response);
}

async function cancelSchedule(id) {
  const response = await fetch(`${API_URL}/${id}/cancel`, {
    method: 'POST',
  });
  return handleResponse(response);
}

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    routeId: '',
    busId: '',
    departureTime: '',
    arrivalTime: '',
    status: 'scheduled'
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await getSchedules();
      if (response.success && Array.isArray(response.data)) {
        setSchedules(response.data);
      } else {
        console.error('Expected an array in response.data but received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSchedule(formData);
      fetchSchedules();
      setOpenModal(false);
      setFormData({
        routeId: '',
        busId: '',
        departureTime: '',
        arrivalTime: '',
        status: 'scheduled'
      });
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelSchedule(id);
      fetchSchedules();
    } catch (error) {
      console.error('Error canceling schedule:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Schedule Management</h2>
        <div>
          <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Schedule
          </button>
          <button onClick={fetchSchedules} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Route ID</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Bus Number</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Departure Time</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Arrival Time</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(schedules) && schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{schedule.routeId || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{schedule.busId?.busNumber || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{new Date(schedule.departureTime).toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>{new Date(schedule.arrivalTime).toLocaleString()}</td>
                  <td style={{ padding: '12px', color: getStatusColor(schedule.status) }}>
                    {schedule.status}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleCancel(schedule._id)} style={{ backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No schedules available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {openModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h3>Add Schedule</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Route ID:</label>
                <input type="text" name="routeId" value={formData.routeId} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Bus ID:</label>
                <input type="text" name="busId" value={formData.busId} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Departure Time:</label>
                <input type="datetime-local" name="departureTime" value={formData.departureTime} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Arrival Time:</label>
                <input type="datetime-local" name="arrivalTime" value={formData.arrivalTime} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}>
                  Submit
                </button>
                <button type="button" onClick={() => setOpenModal(false)} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'scheduled':
      return 'green';
    case 'cancelled':
      return 'red';
    case 'departed':
      return 'orange';
    case 'arrived':
      return 'blue';
    default:
      return 'gray';
  }
}

export default ScheduleManagement;
