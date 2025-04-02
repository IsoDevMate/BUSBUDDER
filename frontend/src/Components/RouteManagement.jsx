// // import React, { useState, useEffect } from 'react';
// // import Swal from 'sweetalert2';

// // const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/routes';

// // async function handleResponse(response) {
// //   if (!response.ok) {
// //     const error = await response.json();
// //     throw new Error(error.message || 'Something went wrong');
// //   }
// //   return response.json();
// // }

// // async function getRoutes() {
// //   const response = await fetch(`${API_URL}`);
// //   return handleResponse(response);
// // }

// // async function createRoute(routeData) {
// //   const response = await fetch(`${API_URL}`, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //     body: JSON.stringify(routeData),
// //   });
// //   return handleResponse(response);
// // }

// // async function updateRoute(id, routeData) {
// //   const response = await fetch(`${API_URL}/${id}`, {
// //     method: 'PUT',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //     body: JSON.stringify(routeData),
// //   });
// //   return handleResponse(response);
// // }

// // async function deleteRoute(id) {
// //   const response = await fetch(`${API_URL}/${id}`, {
// //     method: 'DELETE',
// //   });
// //   if (!response.ok) {
// //     const error = await response.json();
// //     throw new Error(error.message || 'Failed to delete route');
// //   }
// // }

// // function RouteManagement() {
// //   const [routes, setRoutes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [openModal, setOpenModal] = useState(false);
// //   const [editMode, setEditMode] = useState(false);
// //   const [editId, setEditId] = useState(null);
// //   const [formData, setFormData] = useState({
// //     startLocation: '',
// //     endLocation: '',
// //     distance: '',
// //     estimatedDuration: '',
// //   });

// //   useEffect(() => {
// //     fetchRoutes();
// //   }, []);

// //   const fetchRoutes = async () => {
// //     try {
// //       const response = await getRoutes();
// //       if (response.success && Array.isArray(response.data)) {
// //         setRoutes(response.data);
// //       } else {
// //         console.error('Expected an array in response.data but received:', response.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching routes:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (editMode) {
// //         await updateRoute(editId, formData);
// //         setEditMode(false);
// //         setEditId(null);
// //       } else {
// //         await createRoute(formData);
// //       }
// //       fetchRoutes();
// //       setOpenModal(false);
// //       setFormData({
// //         startLocation: '',
// //         endLocation: '',
// //         distance: '',
// //         estimatedDuration: '',
// //       });
// //     } catch (error) {
// //       console.error('Error creating/updating route:', error);
// //     }
// //   };

// //   const handleEdit = (route) => {
// //     setFormData({
// //       startLocation: route.startLocation,
// //       endLocation: route.endLocation,
// //       distance: route.distance,
// //       estimatedDuration: route.estimatedDuration,
// //     });
// //     setEditMode(true);
// //     setEditId(route._id);
// //     setOpenModal(true);
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await deleteRoute(id);
// //       fetchRoutes();
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Route Deleted',
// //         text: 'The route has been successfully deleted.',
// //       });
// //     } catch (error) {
// //       console.error('Error deleting route:', error);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
// //         <h2>Route Management</h2>
// //         <div>
// //           <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
// //             Add Route
// //           </button>
// //           <button onClick={fetchRoutes} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
// //             Refresh
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div>Loading...</div>
// //       ) : (
// //         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
// //           <thead>
// //             <tr style={{ backgroundColor: '#f2f2f2' }}>
// //               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Start Point</th>
// //               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>End Point</th>
// //               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Duration</th>
// //               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Distance (km)</th>
// //               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {Array.isArray(routes) && routes.length > 0 ? (
// //               routes.map((route) => (
// //                 <tr key={route._id} style={{ borderBottom: '1px solid #ddd' }}>
// //                   <td style={{ padding: '12px' }}>{route.startLocation}</td>
// //                   <td style={{ padding: '12px' }}>{route.endLocation}</td>
// //                   <td style={{ padding: '12px' }}>{route.estimatedDuration}</td>
// //                   <td style={{ padding: '12px' }}>{route.distance}</td>
// //                   <td style={{ padding: '12px' }}>
// //                     <button onClick={() => handleEdit(route)} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}>
// //                       Edit
// //                     </button>
// //                     <button onClick={() => handleDelete(route._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No routes available</td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       )}

// //       {openModal && (
// //         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// //           <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
// //             <h3>{editMode ? 'Edit Route' : 'Add Route'}</h3>
// //             <form onSubmit={handleSubmit}>
// //               <div style={{ marginBottom: '15px' }}>
// //                 <label style={{ display: 'block', marginBottom: '5px' }}>Start Point:</label>
// //                 <input type="text" name="startLocation" value={formData.startLocation} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
// //               </div>
// //               <div style={{ marginBottom: '15px' }}>
// //                 <label style={{ display: 'block', marginBottom: '5px' }}>End Point:</label>
// //                 <input type="text" name="endLocation" value={formData.endLocation} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
// //               </div>
// //               <div style={{ marginBottom: '15px' }}>
// //                 <label style={{ display: 'block', marginBottom: '5px' }}>Distance (km):</label>
// //                 <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
// //               </div>
// //               <div style={{ marginBottom: '15px' }}>
// //                 <label style={{ display: 'block', marginBottom: '5px' }}>Estimated Duration (minutes):</label>
// //                 <input type="number" name="estimatedDuration" value={formData.estimatedDuration} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
// //               </div>
// //               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
// //                 <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}>
// //                   {editMode ? 'Update' : 'Submit'}
// //                 </button>
// //                 <button type="button" onClick={() => setOpenModal(false)} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default RouteManagement;
// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';

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

// async function updateRoute(id, routeData) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
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
//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({
//     startLocation: '',
//     endLocation: '',
//     distance: '',
//     estimatedDuration: '',
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
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Expected an array in response.data but received something else.',
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error fetching routes: ${error.message}`,
//       });
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
//       if (editMode) {
//         await updateRoute(editId, formData);
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: 'Route updated successfully.',
//         });
//         setEditMode(false);
//         setEditId(null);
//       } else {
//         await createRoute(formData);
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: 'Route created successfully.',
//         });
//       }
//       fetchRoutes();
//       setOpenModal(false);
//       setFormData({
//         startLocation: '',
//         endLocation: '',
//         distance: '',
//         estimatedDuration: '',
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error ${editMode ? 'updating' : 'creating'} route: ${error.message}`,
//       });
//     }
//   };

//   const handleEdit = (route) => {
//     setFormData({
//       startLocation: route.startLocation,
//       endLocation: route.endLocation,
//       distance: route.distance,
//       estimatedDuration: route.estimatedDuration,
//     });
//     setEditMode(true);
//     setEditId(route._id);
//     setOpenModal(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteRoute(id);
//       fetchRoutes();
//       Swal.fire({
//         icon: 'success',
//         title: 'Route Deleted',
//         text: 'The route has been successfully deleted.',
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error deleting route: ${error.message}`,
//       });
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
//           {/* <button onClick={fetchRoutes} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//             Refresh
//           </button> */}
//         </div>
//       </div>

//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f2f2f2' }}>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Start Point</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>End Point</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Duration</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Distance (km)</th>
//               <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(routes) && routes.length > 0 ? (
//               routes.map((route) => (
//                 <tr key={route._id} style={{ borderBottom: '1px solid #ddd' }}>
//                   <td style={{ padding: '12px' }}>{route.startLocation}</td>
//                   <td style={{ padding: '12px' }}>{route.endLocation}</td>
//                   <td style={{ padding: '12px' }}>{route.estimatedDuration}</td>
//                   <td style={{ padding: '12px' }}>{route.distance}</td>
//                   <td style={{ padding: '12px' }}>
//                     <button onClick={() => handleEdit(route)} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}>
//                       Edit
//                     </button>
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
//             <h3>{editMode ? 'Edit Route' : 'Add Route'}</h3>
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Start Point:</label>
//                 <input type="text" name="startLocation" value={formData.startLocation} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>End Point:</label>
//                 <input type="text" name="endLocation" value={formData.endLocation} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Distance (km):</label>
//                 <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', marginBottom: '5px' }}>Estimated Duration (minutes):</label>
//                 <input type="number" name="estimatedDuration" value={formData.estimatedDuration} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}>
//                   {editMode ? 'Update' : 'Submit'}
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

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000';
const SEARCH_API_URL = `${BASE_URL}/api/v1/routes/search`;

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function searchRoutes(params) {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${SEARCH_API_URL}?${queryString}`);
  return handleResponse(response);
}

async function createRoute(routeData) {
  const response = await fetch(`${BASE_URL}/api/v1/routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routeData),
  });
  return handleResponse(response);
}

async function updateRoute(id, routeData) {
  const response = await fetch(`${BASE_URL}/api/v1/routes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routeData),
  });
  return handleResponse(response);
}

async function deleteRoute(id) {
  const response = await fetch(`${BASE_URL}/api/v1/routes/${id}`, {
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
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    distance: '',
    estimatedDuration: '',
  });
  const [searchParams, setSearchParams] = useState({
    startLocation: '',
    endLocation: '',
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await searchRoutes(searchParams);
      if (response.success && Array.isArray(response.data)) {
        setRoutes(response.data);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Expected an array in response.data but received something else.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error fetching routes: ${error.message}`,
      });
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
      if (editMode) {
        await updateRoute(editId, formData);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Route updated successfully.',
        });
        setEditMode(false);
        setEditId(null);
      } else {
        await createRoute(formData);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Route created successfully.',
        });
      }
      fetchRoutes();
      setOpenModal(false);
      setFormData({
        startLocation: '',
        endLocation: '',
        distance: '',
        estimatedDuration: '',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error ${editMode ? 'updating' : 'creating'} route: ${error.message}`,
      });
    }
  };

  const handleEdit = (route) => {
    setFormData({
      startLocation: route.startLocation,
      endLocation: route.endLocation,
      distance: route.distance,
      estimatedDuration: route.estimatedDuration,
    });
    setEditMode(true);
    setEditId(route._id);
    setOpenModal(true);
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error deleting route: ${error.message}`,
      });
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRoutes();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Route Management</h2>
        <div>
          <button onClick={() => setOpenModal(true)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Route
          </button>
          {/* <button onClick={fetchRoutes} style={{ padding: '10px 20px', backgroundColor: '#4c51bf', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Refresh
          </button> */}
        </div>
      </div>

      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="startLocation"
          placeholder="Start Location"
          value={searchParams.startLocation}
          onChange={handleSearchChange}
          style={{ width: 'calc(30% - 10px)', padding: '10px', marginRight: '10px', boxSizing: 'border-box' }}
        />
        <input
          type="text"
          name="endLocation"
          placeholder="End Location"
          value={searchParams.endLocation}
          onChange={handleSearchChange}
          style={{ width: 'calc(30% - 10px)', padding: '10px', marginRight: '10px', boxSizing: 'border-box' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4c51bf', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Search
        </button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
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
                  <td style={{ padding: '12px' }}>{route.startLocation}</td>
                  <td style={{ padding: '12px' }}>{route.endLocation}</td>
                  <td style={{ padding: '12px' }}>{route.estimatedDuration}</td>
                  <td style={{ padding: '12px' }}>{route.distance}</td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleEdit(route)} style={{ backgroundColor: '#4c51bf', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}>
                      Edit
                    </button>
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
            <h3>{editMode ? 'Edit Route' : 'Add Route'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Start Point:</label>
                <input type="text" name="startLocation" value={formData.startLocation} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>End Point:</label>
                <input type="text" name="endLocation" value={formData.endLocation} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Distance (km):</label>
                <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Estimated Duration (minutes):</label>
                <input type="number" name="estimatedDuration" value={formData.estimatedDuration} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" style={{ backgroundColor:'#4c51bf', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}>
                  {editMode ? 'Update' : 'Submit'}
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
