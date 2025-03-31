// import React, { useState, useEffect } from 'react';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/buses?status=';

// async function handleResponse(response) {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// }

// async function getBuses() {
//   const response = await fetch(`${API_URL}`);
//   return handleResponse(response);
// }

// async function createBus(busData) {
//   const response = await fetch(`${API_URL}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(busData),
//   });
//   return handleResponse(response);
// }

// async function updateBusStatus(id, status) {
//   const response = await fetch(`${API_URL}/${id}/status`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ status }),
//   });
//   return handleResponse(response);
// }

// async function deleteBus(id) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to delete bus');
//   }
// }

// function BusManagement() {
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [formData, setFormData] = useState({
//     busNumber: '',
//     capacity: '',
//     type: '',
//     status: 'active',
//   });

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   const fetchBuses = async () => {
//     try {
//       const response = await getBuses();
//       console.log('Fetched buses response:', response); // Log the response to inspect it
//       if (response.success && Array.isArray(response.data)) {
//         setBuses(response.data);
//       } else {
//         console.error('Expected an array in response.data but received:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching buses:', error);
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
//       await createBus(formData);
//       fetchBuses();
//       setOpenModal(false);
//     } catch (error) {
//       console.error('Error creating bus:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteBus(id);
//       fetchBuses();
//     } catch (error) {
//       console.error('Error deleting bus:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <h2>Bus Management</h2>
//         <div>
//           <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//             Add Bus
//           </button>
//           <button onClick={fetchBuses} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
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
//               {/* <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>ID</th> */}
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Bus Number</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Capacity</th>
//               {/* <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Type</th> */}
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Amenities</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Created At</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(buses) && buses.length > 0 ? (
//               buses.map((bus) => (
//                 <tr key={bus._id} style={{ borderBottom: '1px solid #ddd' }}>
//                   {/* <td style={{ padding: '12px' }}>{bus._id}</td> */}
//                   <td style={{ padding: '12px' }}>{bus.busNumber}</td>
//                   <td style={{ padding: '12px' }}>{bus.capacity}</td>
//                   {/* <td style={{ padding: '12px' }}>{bus.type}</td> */}
//                   <td style={{ padding: '12px', color: getStatusColor(bus.status) }}>
//                     {bus.status}
//                   </td>
//                   <td style={{ padding: '12px' }}>{bus.amenities ? bus.amenities.join(', ') : 'None'}</td>
//                   <td style={{ padding: '12px' }}>{new Date(bus.createdAt).toLocaleString()}</td>
//                   <td style={{ padding: '12px' }}>
//                     <button onClick={() => handleDelete(bus._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No buses available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       {openModal && (
//         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
//             <h3>Add Bus</h3>
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Bus Number:</label>
//                 <input type="text" name="busNumber" value={formData.busNumber} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Capacity:</label>
//                 <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Type:</label>
//                 <input type="text" name="type" value={formData.type} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
//                 <select name="status" value={formData.status} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
//                   <option value="active">Active</option>
//                   <option value="maintenance">Maintenance</option>
//                   <option value="inactive">Inactive</option>
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
//     case 'active':
//       return 'green';
//     case 'maintenance':
//       return 'orange';
//     case 'inactive':
//       return 'red';
//     default:
//       return 'gray';
//   }
// }

// export default BusManagement;
import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/buses?status=';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function getBuses() {
  const response = await fetch(`${API_URL}`);
  return handleResponse(response);
}

async function createBus(busData) {
  const response = await fetch(`http://localhost:7000/api/v1/buses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(busData),
  });
  return handleResponse(response);
}

async function updateBusStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
}

async function deleteBus(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete bus');
  }
}

function BusManagement() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    busNumber: '',
    model: '',
    capacity: '',
    amenities: [],
    status: 'active',
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await getBuses();
      console.log('Fetched buses response:', response); // Log the response to inspect it
      if (response.success && Array.isArray(response.data)) {
        setBuses(response.data);
      } else {
        console.error('Expected an array in response.data but received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching buses:', error);
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

  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      amenities: value.split(',').map(amenity => amenity.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBus(formData);
      fetchBuses();
      setOpenModal(false);
    } catch (error) {
      console.error('Error creating bus:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBus(id);
      fetchBuses();
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Bus Management</h2>
        <div>
          <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Bus
          </button>
          <button onClick={fetchBuses} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
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
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Bus Number</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Capacity</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Amenities</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Created At</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(buses) && buses.length > 0 ? (
              buses.map((bus) => (
                <tr key={bus._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{bus.busNumber}</td>
                  <td style={{ padding: '12px' }}>{bus.capacity}</td>
                  <td style={{ padding: '12px', color: getStatusColor(bus.status) }}>
                    {bus.status}
                  </td>
                  <td style={{ padding: '12px' }}>{bus.amenities ? bus.amenities.join(', ') : 'None'}</td>
                  <td style={{ padding: '12px' }}>{new Date(bus.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleDelete(bus._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No buses available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {openModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h3>Add Bus</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Bus Number:</label>
                <input type="text" name="busNumber" value={formData.busNumber} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Model:</label>
                <input type="text" name="model" value={formData.model} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Capacity:</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Amenities:</label>
                <input type="text" name="amenities" value={formData.amenities.join(', ')} onChange={handleAmenitiesChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                <small>Enter amenities separated by commas</small>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
                <select name="status" value={formData.status} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
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
    case 'active':
      return 'green';
    case 'maintenance':
      return 'orange';
    case 'inactive':
      return 'red';
    default:
      return 'gray';
  }
}

export default BusManagement;
