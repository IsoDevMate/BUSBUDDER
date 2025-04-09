// import React, { useState, useEffect } from 'react';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/bookings';

// async function handleResponse(response) {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// }

// async function getBookings() {
//   const response = await fetch(`${API_URL}`);
//   return handleResponse(response);
// }

// async function createBooking(bookingData) {
//   const response = await fetch(`${API_URL}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(bookingData),
//   });
//   return handleResponse(response);
// }

// async function cancelBooking(id) {
//   const response = await fetch(`${API_URL}/${id}/cancel`, {
//     method: 'POST',
//   });
//   return handleResponse(response);
// }

// function BookingManagement() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [formData, setFormData] = useState({
//     scheduleId: '',
//     userId: '',
//     seats: '',
//     status: 'confirmed'
//   });

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await getBookings();
//       if (response.success && Array.isArray(response.data)) {
//         setBookings(response.data);
//       } else {
//         console.error('Expected an array in response.data but received:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const bookingData = {
//         ...formData,
//         seats: formData.seats.split(',').map(s => s.trim())
//       };
//       await createBooking(bookingData);
//       fetchBookings();
//       setOpenModal(false);
//       setFormData({
//         scheduleId: '',
//         userId: '',
//         seats: '',
//         status: 'confirmed'
//       });
//     } catch (error) {
//       console.error('Error creating booking:', error);
//     }
//   };

//   const handleCancel = async (id) => {
//     try {
//       await cancelBooking(id);
//       fetchBookings();
//     } catch (error) {
//       console.error('Error canceling booking:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <h2>Booking Management</h2>
//         <div>
//           <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//             New Booking
//           </button>
//           <button onClick={fetchBookings} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//             Refresh
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f2f2f2' }}>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Schedule ID</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>User ID</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Seats</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Created At</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(bookings) && bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <tr key={booking._id} style={{ borderBottom: '1px solid #ddd' }}>
//                   <td style={{ padding: '12px' }}>{booking.scheduleId}</td>
//                   <td style={{ padding: '12px' }}>{booking.userId}</td>
//                   <td style={{ padding: '12px' }}>{booking.seats?.join(', ') || 'None'}</td>
//                   <td style={{ padding: '12px', color: getStatusColor(booking.status) }}>
//                     {booking.status}
//                   </td>
//                   <td style={{ padding: '12px' }}>{new Date(booking.createdAt).toLocaleString()}</td>
//                   <td style={{ padding: '12px' }}>
//                     <button onClick={() => handleCancel(booking._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No bookings available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       {openModal && (
//         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
//             <h3>New Booking</h3>
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Schedule ID:</label>
//                 <input type="text" name="scheduleId" value={formData.scheduleId} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>User ID:</label>
//                 <input type="text" name="userId" value={formData.userId} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Seats (comma separated):</label>
//                 <input type="text" name="seats" value={formData.seats} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
//                 <select name="status" value={formData.status} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="pending">Pending</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}>
//                   Submit
//                 </button>
//                 <button type="button" onClick={() => setOpenModal(false)} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function getStatusColor(status) {
//   switch (status) {
//     case 'confirmed':
//       return 'green';
//     case 'pending':
//       return 'orange';
//     case 'cancelled':
//       return 'red';
//     default:
//       return 'gray';
//   }
// }

// export default BookingManagement;
import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/bookings';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function getBookings() {
  const response = await fetch(`${API_URL}`);
  return handleResponse(response);
}

async function createBooking(bookingData) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  return handleResponse(response);
}

async function cancelBooking(id) {
  const response = await fetch(`${API_URL}/${id}/cancel`, {
    method: 'POST',
  });
  return handleResponse(response);
}

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    scheduleId: '',
    userId: '',
    seats: '',
    status: 'confirmed'
  });
  const [serverResponse, setServerResponse] = useState(null); // New state for server response

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookings();
      if (response.success && Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        console.error('Expected an array in response.data but received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
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
    setServerResponse(null); // Reset server response
    try {
      const bookingData = {
        ...formData,
        seats: formData.seats.split(',').map(s => s.trim())
      };
      const response = await createBooking(bookingData);
      setServerResponse(response.message || 'Booking created successfully');
      fetchBookings();
      setOpenModal(false);
      setFormData({
        scheduleId: '',
        userId: '',
        seats: '',
        status: 'confirmed'
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      setServerResponse(error.message);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      fetchBookings();
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Booking Management</h2>
        <div>
          <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            New Booking
          </button>
          <button onClick={fetchBookings} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
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
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Schedule ID</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>User ID</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Seats</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Created At</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookings) && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{booking.scheduleId}</td>
                  <td style={{ padding: '12px' }}>{booking.userId}</td>
                  <td style={{ padding: '12px' }}>{booking.seats?.join(', ') || 'None'}</td>
                  <td style={{ padding: '12px', color: getStatusColor(booking.status) }}>
                    {booking.status}
                  </td>
                  <td style={{ padding: '12px' }}>{new Date(booking.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleCancel(booking._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No bookings available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {openModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h3>New Booking</h3>
            {serverResponse && (
              <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e6ffe6', borderRadius: '5px', color: '#006400' }}>
                {serverResponse}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Schedule ID:</label>
                <input type="text" name="scheduleId" value={formData.scheduleId} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>User ID:</label>
                <input type="text" name="userId" value={formData.userId} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Seats (comma separated):</label>
                <input type="text" name="seats" value={formData.seats} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
                <select name="status" value={formData.status} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
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
    case 'confirmed':
      return 'green';
    case 'pending':
      return 'orange';
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
}

export default BookingManagement;
