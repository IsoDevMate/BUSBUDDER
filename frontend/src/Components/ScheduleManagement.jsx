import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/schedules';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function getSchedules() {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

async function createSchedule(scheduleData) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(scheduleData),
  });
  return handleResponse(response);
}

async function updateSchedule(id, scheduleData) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(scheduleData),
  });
  return handleResponse(response);
}

async function cancelSchedule(id) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_URL}/${id}/cancel`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    routeName: '',
    busNumber: '',
    departureTime: '',
    arrivalTime: '',
    fare: 0,
    status: 'scheduled'
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSchedules();
      const scheduleArray = Array.isArray(data) ? data : (data.data || []);
      setSchedules(scheduleArray);
    } catch (err) {
      console.error('Error fetching schedules:', err);
      setError('Failed to load schedules. Please try again.');
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
    setError(null);

    try {
      const schedulePayload = {
        routeName: formData.routeName,
        busNumber: formData.busNumber,
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        fare: Number(formData.fare)
      };

      if (editMode && selectedSchedule) {
        await updateSchedule(selectedSchedule, schedulePayload);
      } else {
        await createSchedule(schedulePayload);
      }

      fetchSchedules();
      resetForm();
    } catch (err) {
      console.error('Error saving schedule:', err);
      setError(editMode ? 'Failed to update schedule' : 'Failed to create schedule');
    }
  };

  const resetForm = () => {
    setOpenModal(false);
    setFormData({
      routeName: '',
      busNumber: '',
      departureTime: '',
      arrivalTime: '',
      fare: 0,
      status: 'scheduled'
    });
    setEditMode(false);
    setSelectedSchedule(null);
  };

  const handleEdit = (schedule) => {
    setFormData({
      routeName: schedule.routeName,
      busNumber: schedule.busNumber,
      departureTime: new Date(schedule.departureTime).toISOString().slice(0, 16),
      arrivalTime: new Date(schedule.arrivalTime).toISOString().slice(0, 16),
      fare: schedule.fare || 0,
      status: schedule.status || 'scheduled'
    });

    setSelectedSchedule(schedule._id);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleCancel = async (id) => {
    try {
      await cancelSchedule(id);
      fetchSchedules();
    } catch (err) {
      console.error('Error canceling schedule:', err);
      setError('Failed to cancel schedule');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Schedule Management</h2>
        <div>
          <button
            onClick={() => {
              resetForm();
              setOpenModal(true);
            }}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add Schedule
          </button>
          <button
            onClick={fetchSchedules}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#ffeeee', borderRadius: '5px' }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading schedules...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Route Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Bus Number</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Departure Time</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Arrival Time</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Fare</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(schedules) && schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{schedule.routeName}</td>
                  <td style={{ padding: '12px' }}>{schedule.busNumber}</td>
                  <td style={{ padding: '12px' }}>{new Date(schedule.departureTime).toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>{new Date(schedule.arrivalTime).toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>Ksh {schedule.fare.toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: getStatusBackgroundColor(schedule.status),
                      color: getStatusColor(schedule.status)
                    }}>
                      {schedule.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => handleEdit(schedule)}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        marginRight: '5px'
                      }}
                    >
                      Edit
                    </button>
                    {schedule.status === 'scheduled' && (
                      <button
                        onClick={() => handleCancel(schedule._id)}
                        style={{
                          backgroundColor: '#ffc107',
                          color: 'black',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  No schedules available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {openModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3>{editMode ? 'Edit Schedule' : 'Add Schedule'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Route Name:</label>
                <input
                  type="text"
                  name="routeName"
                  value={formData.routeName}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
                  placeholder="Enter route name"
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Bus Number:</label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
                  placeholder="Enter bus number"
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Departure Time:</label>
                <input
                  type="datetime-local"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Arrival Time:</label>
                <input
                  type="datetime-local"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fare (Ksh):</label>
                <input
                  type="number"
                  name="fare"
                  value={formData.fare}
                  onChange={handleInputChange}
                  required
                  min="0"
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer'
                  }}
                >
                  {editMode ? 'Update Schedule' : 'Create Schedule'}
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
      return '#006400'; // Dark green
    case 'cancelled':
      return '#8B0000'; // Dark red
    case 'departed':
      return '#000'; // Black
    case 'arrived':
      return '#00008B'; // Dark blue
    default:
      return '#333';
  }
}

function getStatusBackgroundColor(status) {
  switch (status) {
    case 'scheduled':
      return '#E6FFE6'; // Light green
    case 'cancelled':
      return '#FFE6E6'; // Light red
    case 'departed':
      return '#FFF3E0'; // Light orange
    case 'arrived':
      return '#E6F0FF'; // Light blue
    default:
      return '#F5F5F5';
  }
}

export default ScheduleManagement;
