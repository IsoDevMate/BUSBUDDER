// import React, { useState, useEffect } from 'react';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/routes';

// async function handleResponse(response) {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// }

// async function getRoutes() {
//   const response = await fetch(`${API_URL}`);
//   return handleResponse(response);
// }

// async function createRoute(routeData) {
//   const response = await fetch(`${API_URL}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(routeData),
//   });
//   return handleResponse(response);
// }

// async function deleteRoute(id) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to delete route');
//   }
// }

// function RouteManagement() {
//   const [routes, setRoutes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     startPoint: '',
//     endPoint: '',
//     stops: '',
//     distance: '',
//   });

//   useEffect(() => {
//     fetchRoutes();
//   }, []);

//   const fetchRoutes = async () => {
//     try {
//       const response = await getRoutes();
//       if (response.success && Array.isArray(response.data)) {
//         setRoutes(response.data);
//       } else {
//         console.error('Expected an array in response.data but received:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching routes:', error);
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
//       const routeData = {
//         ...formData,
//         stops: formData.stops.split(',').map(s => s.trim())
//       };
//       await createRoute(routeData);
//       fetchRoutes();
//       setOpenModal(false);
//       setFormData({
//         name: '',
//         startPoint: '',
//         endPoint: '',
//         stops: '',
//         distance: '',
//       });
//     } catch (error) {
//       console.error('Error creating route:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteRoute(id);
//       fetchRoutes();
//     } catch (error) {
//       console.error('Error deleting route:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <h2>Route Management</h2>
//         <div>
//           <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//             Add Route
//           </button>
//           <button onClick={fetchRoutes} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
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
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Name</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Start Point</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>End Point</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Stops</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Distance (km)</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(routes) && routes.length > 0 ? (
//               routes.map((route) => (
//                 <tr key={route._id} style={{ borderBottom: '1px solid #ddd' }}>
//                   <td style={{ padding: '12px' }}>{route.name}</td>
//                   <td style={{ padding: '12px' }}>{route.startPoint}</td>
//                   <td style={{ padding: '12px' }}>{route.endPoint}</td>
//                   <td style={{ padding: '12px' }}>{route.stops?.join(', ') || 'None'}</td>
//                   <td style={{ padding: '12px' }}>{route.distance}</td>
//                   <td style={{ padding: '12px' }}>
//                     <button onClick={() => handleDelete(route._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No routes available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       {openModal && (
//         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
//             <h3>Add Route</h3>
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Route Name:</label>
//                 <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Start Point:</label>
//                 <input type="text" name="startPoint" value={formData.startPoint} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>End Point:</label>
//                 <input type="text" name="endPoint" value={formData.endPoint} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Stops (comma separated):</label>
//                 <input type="text" name="stops" value={formData.stops} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Distance (km):</label>
//                 <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
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

// export default RouteManagement;
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/routes';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function getRoutes() {
  const response = await fetch(`${API_URL}`);
  return handleResponse(response);
}

async function createRoute(routeData) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routeData),
  });
  return handleResponse(response);
}

async function deleteRoute(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete route');
  }
}

function RouteManagement() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startPoint: '',
    endPoint: '',
    stops: '',
    distance: '',
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await getRoutes();
      if (response.success && Array.isArray(response.data)) {
        setRoutes(response.data);
      } else {
        console.error('Expected an array in response.data but received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching routes:', error);
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
      const routeData = {
        ...formData,
        stops: formData.stops.split(',').map(s => s.trim())
      };
      await createRoute(routeData);
      fetchRoutes();
      setOpenModal(false);
      setFormData({
        name: '',
        startPoint: '',
        endPoint: '',
        stops: '',
        distance: '',
      });
    } catch (error) {
      console.error('Error creating route:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoute(id);
      fetchRoutes();
      Swal.fire({
        icon: 'success',
        title: 'Route Deleted',
        text: 'The route has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Route Management</h2>
        <div>
          <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Route
          </button>
          <button onClick={fetchRoutes} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
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
              {/* <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Name</th> */}
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Start Point</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>End Point</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Duration</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Distance (km)</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(routes) && routes.length > 0 ? (
              routes.map((route) => (
                <tr key={route._id} style={{ borderBottom: '1px solid #ddd' }}>
                  {/* <td style={{ padding: '12px' }}>{route.name}</td> */}
                  <td style={{ padding: '12px' }}>{route.startLocation}</td>
                  <td style={{ padding: '12px' }}>{route.endLocation}</td>
                  <td style={{ padding: '12px' }}>{route.estimatedDuration}</td>
                  <td style={{ padding: '12px' }}>{route.distance}</td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleDelete(route._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No routes available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {openModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h3>Add Route</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Route Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Start Point:</label>
                <input type="text" name="startPoint" value={formData.startPoint} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>End Point:</label>
                <input type="text" name="endPoint" value={formData.endPoint} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Stops (comma separated):</label>
                <input type="text" name="stops" value={formData.stops} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Distance (km):</label>
                <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
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

export default RouteManagement;
