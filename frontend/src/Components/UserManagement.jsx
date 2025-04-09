// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';
// import { FiPlus, FiRefreshCw, FiEdit2, FiTrash2, FiSearch, FiX, FiCheckCircle, FiAlertTriangle, FiPauseCircle } from 'react-icons/fi';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/auth/all-users';

// // Styled Components
// const Container = styled.div`
//   padding: 2rem;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Header = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 2rem;

//   @media (min-width: 768px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   }
// `;

// const Title = styled.h1`
//   font-size: 1.8rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin-bottom: 0.5rem;
// `;

// const Subtitle = styled.p`
//   color: #718096;
//   font-size: 0.9rem;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 0.75rem;
//   margin-top: 1rem;

//   @media (min-width: 768px) {
//     margin-top: 0;
//   }
// `;

// const Button = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   border-radius: 0.375rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//   }
// `;

// const PrimaryButton = styled(Button)`
//   background-color: #4299e1;
//   color: white;
//   border: none;

//   &:hover {
//     background-color: #3182ce;
//   }
// `;

// const SecondaryButton = styled(Button)`
//   background-color: #e2e8f0;
//   color: #2d3748;
//   border: none;

//   &:hover {
//     background-color: #cbd5e0;
//   }
// `;

// const DangerButton = styled(Button)`
//   background-color: #f56565;
//   color: white;
//   border: none;

//   &:hover {
//     background-color: #e53e3e;
//   }
// `;

// const SearchContainer = styled.div`
//   position: relative;
//   margin-bottom: 1.5rem;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   padding: 0.5rem 2.5rem 0.5rem 1rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.375rem;
//   font-size: 0.9rem;
//   transition: all 0.2s ease;

//   &:focus {
//     outline: none;
//     border-color: #4299e1;
//     box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
//   }
// `;

// const SearchIcon = styled.div`
//   position: absolute;
//   top: 50%;
//   right: 1rem;
//   transform: translateY(-50%);
//   color: #a0aec0;
// `;

// const TableContainer = styled.div`
//   background-color: white;
//   border-radius: 0.5rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const TableHeader = styled.thead`
//   background-color: #f7fafc;
// `;

// const TableHeaderCell = styled.th`
//   padding: 0.75rem 1.5rem;
//   text-align: left;
//   font-size: 0.75rem;
//   font-weight: 600;
//   color: #718096;
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
// `;

// const TableRow = styled.tr`
//   border-bottom: 1px solid #edf2f7;

//   &:hover {
//     background-color: #f8fafc;
//   }
// `;

// const TableCell = styled.td`
//   padding: 1rem 1.5rem;
//   font-size: 0.875rem;
//   color: #4a5568;
// `;

// const StatusBadge = styled.span`
//   display: inline-block;
//   padding: 0.25rem 0.5rem;
//   border-radius: 9999px;
//   font-size: 0.75rem;
//   font-weight: 600;
//   text-transform: capitalize;
// `;

// const ActiveStatus = styled(StatusBadge)`
//   background-color: #f0fff4;
//   color: #38a169;
// `;

// const MaintenanceStatus = styled(StatusBadge)`
//   background-color: #fffaf0;
//   color: #dd6b20;
// `;

// const InactiveStatus = styled(StatusBadge)`
//   background-color: #fff5f5;
//   color: #e53e3e;
// `;

// const ActionButtons = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// const ActionButton = styled.button`
//   padding: 0.5rem;
//   border-radius: 0.25rem;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   border: none;
//   background: none;
//   color: #718096;

//   &:hover {
//     background-color: #edf2f7;
//     color: #4299e1;
//   }
// `;

// const DeleteButton = styled(ActionButton)`
//   &:hover {
//     color: #e53e3e;
//   }
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
// `;

// const ModalContainer = styled.div`
//   background-color: white;
//   border-radius: 0.5rem;
//   width: 100%;
//   max-width: 28rem;
//   box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
// `;

// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1.25rem 1.5rem;
//   border-bottom: 1px solid #edf2f7;
// `;

// const ModalTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #2d3748;
// `;

// const ModalCloseButton = styled.button`
//   color: #a0aec0;
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0.25rem;

//   &:hover {
//     color: #718096;
//   }
// `;

// const ModalBody = styled.div`
//   padding: 1.5rem;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1rem;
// `;

// const FormLabel = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: #4a5568;
// `;

// const FormInput = styled.input`
//   width: 100%;
//   padding: 0.5rem 0.75rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.375rem;
//   font-size: 0.875rem;
//   transition: all 0.2s ease;

//   &:focus {
//     outline: none;
//     border-color: #4299e1;
//     box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
//   }
// `;

// const FormSelect = styled.select`
//   width: 100%;
//   padding: 0.5rem 0.75rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.375rem;
//   font-size: 0.875rem;
//   transition: all 0.2s ease;

//   &:focus {
//     outline: none;
//     border-color: #4299e1;
//     box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
//   }
// `;

// const ModalFooter = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 0.75rem;
//   padding: 1rem 1.5rem;
//   border-top: 1px solid #edf2f7;
// `;

// const LoadingSpinner = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 16rem;

//   &::after {
//     content: '';
//     width: 3rem;
//     height: 3rem;
//     border: 3px solid #e2e8f0;
//     border-top-color: #4299e1;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;
//   }

//   @keyframes spin {
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `;

// const EmptyState = styled.div`
//   padding: 2rem;
//   text-align: center;
//   color: #718096;
// `;

// const SummaryContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   gap: 1rem;
//   margin-bottom: 1.5rem;

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(4, 1fr);
//   }
// `;

// const SummaryCard = styled.div`
//   background-color: white;
//   border-radius: 0.5rem;
//   padding: 1.25rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
// `;

// const TotalSummaryCard = styled(SummaryCard)`
//   border-top: 4px solid #4299e1;
// `;

// const ActiveSummaryCard = styled(SummaryCard)`
//   border-top: 4px solid #38a169;
// `;

// const MaintenanceSummaryCard = styled(SummaryCard)`
//   border-top: 4px solid #dd6b20;
// `;

// const InactiveSummaryCard = styled(SummaryCard)`
//   border-top: 4px solid #e53e3e;
// `;

// const SummaryTitle = styled.h3`
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: #718096;
//   margin-bottom: 0.5rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const SummaryValue = styled.span`
//   font-size: 1.5rem;
//   font-weight: 600;
//   color: #2d3748;
// `;

// const SummaryChange = styled.span`
//   font-size: 0.75rem;
//   margin-top: 0.5rem;
//   color: ${props => props.positive ? '#38a169' : props.negative ? '#e53e3e' : '#718096'};
// `;

// // API Functions
// async function handleResponse(response) {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// }

// async function getUsers() {
//   const token = localStorage.getItem('accessToken'); // Use the correct key
//   console.log('Token:', token); // Log the token to verify its presence

//   if (!token) {
//     throw new Error('Token not found in localStorage');
//   }

//   const response = await fetch(`${API_URL}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     console.error('API Error:', error); // Log the API error
//     throw new Error(error.message || 'Something went wrong');
//   }

//   return response.json();
// }

// async function createUser(userData) {
//   const token = localStorage.getItem('accessToken'); // Use the correct key
//   const response = await fetch(`http://localhost:7000/api/v1/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//     body: JSON.stringify(userData),
//   });
//   return handleResponse(response);
// }

// async function updateUser(id, userData) {
//   const token = localStorage.getItem('accessToken'); // Use the correct key
//   const response = await fetch(`http://localhost:7000/api/v1/auth/update/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//     body: JSON.stringify(userData),
//   });
//   return handleResponse(response);
// }

// async function deleteUser(id) {
//   const token = localStorage.getItem('accessToken'); // Use the correct key
//   const response = await fetch(`http://localhost:7000/api/v1/auth/delete/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to delete user');
//   }
// }

// // Component
// function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     role: 'passenger',
//     bio: '',
//   });
//   const [searchQuery, setSearchQuery] = useState('');

//   const getSummaryData = () => {
//     const totalUsers = users.length;
//     const activeUsers = users.filter(user => user.role === 'active').length;
//     const maintenanceUsers = users.filter(user => user.role === 'maintenance').length;
//     const inactiveUsers = users.filter(user => user.role === 'inactive').length;

//     return {
//       total: totalUsers,
//       active: activeUsers,
//       maintenance: maintenanceUsers,
//       inactive: inactiveUsers,
//       activePercentage: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0,
//     };
//   };

//   const summaryData = getSummaryData();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await getUsers();
//       if (Array.isArray(response)) {
//         setUsers(response);
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Expected an array in response but received something else.',
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error fetching users: ${error.message}`,
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
//         await updateUser(currentUserId, formData);
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: 'User updated successfully.',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       } else {
//         await createUser(formData);
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: 'User created successfully.',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//       fetchUsers();
//       setOpenModal(false);
//       setEditMode(false);
//       setCurrentUserId(null);
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         role: 'passenger',
//         bio: '',
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error ${editMode ? 'updating' : 'creating'} user: ${error.message}`,
//       });
//     }
//   };

//   const handleEdit = (user) => {
//     setFormData({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//       bio: user.bio,
//     });
//     setCurrentUserId(user._id);
//     setEditMode(true);
//     setOpenModal(true);
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#4299e1',
//       cancelButtonColor: '#e53e3e',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await deleteUser(id);
//         Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'User has been deleted.',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         fetchUsers();
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: `Error deleting user: ${error.message}`,
//         });
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredUsers = users.filter((user) =>
//     (user.firstName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (user.lastName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (user.role || '').toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderStatusBadge = (role) => {
//     switch (role) {
//       case 'active':
//         return <ActiveStatus>{role}</ActiveStatus>;
//       case 'maintenance':
//         return <MaintenanceStatus>{role}</MaintenanceStatus>;
//       case 'inactive':
//         return <InactiveStatus>{role}</InactiveStatus>;
//       default:
//         return <StatusBadge>{role}</StatusBadge>;
//     }
//   };

//   return (
//     <Container>
//       <Header>
//         <div>
//           <Title>User Management</Title>
//           <Subtitle>Manage your users efficiently</Subtitle>
//         </div>
//         <ButtonGroup>
//           <PrimaryButton onClick={() => { setOpenModal(true); setEditMode(false); }}>
//             <FiPlus /> Add User
//           </PrimaryButton>
//           <SecondaryButton onClick={fetchUsers}>
//             <FiRefreshCw /> Refresh
//           </SecondaryButton>
//         </ButtonGroup>
//       </Header>

//       <SummaryContainer>
//         <TotalSummaryCard>
//           <SummaryTitle>
//             <FiCheckCircle /> Total Users
//           </SummaryTitle>
//           <SummaryValue>{summaryData.total}</SummaryValue>
//           <SummaryChange>
//             {summaryData.activePercentage}% operational
//           </SummaryChange>
//         </TotalSummaryCard>

//         <ActiveSummaryCard>
//           <SummaryTitle>
//             <FiCheckCircle /> Active
//           </SummaryTitle>
//           <SummaryValue>{summaryData.active}</SummaryValue>
//           <SummaryChange positive>
//             {summaryData.total > 0 ? Math.round((summaryData.active / summaryData.total) * 100) : 0}% of users
//           </SummaryChange>
//         </ActiveSummaryCard>

//         <MaintenanceSummaryCard>
//           <SummaryTitle>
//             <FiAlertTriangle /> Maintenance
//           </SummaryTitle>
//           <SummaryValue>{summaryData.maintenance}</SummaryValue>
//           <SummaryChange>
//             {summaryData.total > 0 ? Math.round((summaryData.maintenance / summaryData.total) * 100) : 0}% of users
//           </SummaryChange>
//         </MaintenanceSummaryCard>

//         <InactiveSummaryCard>
//           <SummaryTitle>
//             <FiPauseCircle /> Inactive
//           </SummaryTitle>
//           <SummaryValue>{summaryData.inactive}</SummaryValue>
//           <SummaryChange negative>
//             {summaryData.total > 0 ? Math.round((summaryData.inactive / summaryData.total) * 100) : 0}% of users
//           </SummaryChange>
//         </InactiveSummaryCard>
//       </SummaryContainer>

//       <SearchContainer>
//         <SearchInput
//           type="text"
//           placeholder="Search users by name, email, or role..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <SearchIcon>
//           <FiSearch />
//         </SearchIcon>
//       </SearchContainer>

//       <TableContainer>
//         {loading ? (
//           <LoadingSpinner />
//         ) : (
//           <Table>
//             <TableHeader>
//               <tr>
//                 <TableHeaderCell>User</TableHeaderCell>
//                 <TableHeaderCell>Email</TableHeaderCell>
//                 <TableHeaderCell>Role</TableHeaderCell>
//                 <TableHeaderCell>Created</TableHeaderCell>
//                 <TableHeaderCell>Actions</TableHeaderCell>
//               </tr>
//             </TableHeader>
//             <tbody>
//               {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <TableRow key={user._id}>
//                     <TableCell>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                         {user.profileImage ? (
//                           <img
//                             src={user.profileImage}
//                             alt={`${user.firstName} ${user.lastName}`}
//                             style={{ width: '40px', height: '40px', borderRadius: '50%' }}
//                           />
//                         ) : (
//                           <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd' }} />
//                         )}
//                         <span>{user.firstName} {user.lastName}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{renderStatusBadge(user.role)}</TableCell>
//                     <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
//                     <TableCell>
//                       <ActionButtons>
//                         <ActionButton onClick={() => handleEdit(user)} title="Edit">
//                           <FiEdit2 />
//                         </ActionButton>
//                         <DeleteButton onClick={() => handleDelete(user._id)} title="Delete">
//                           <FiTrash2 />
//                         </DeleteButton>
//                       </ActionButtons>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan="6">
//                     <EmptyState>
//                       {users.length === 0 ? 'No users available. Add your first user!' : 'No users match your search criteria.'}
//                     </EmptyState>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </tbody>
//           </Table>
//         )}
//       </TableContainer>

//       {openModal && (
//         <ModalOverlay>
//           <ModalContainer>
//             <ModalHeader>
//               <ModalTitle>{editMode ? 'Edit User' : 'Add New User'}</ModalTitle>
//               <ModalCloseButton onClick={() => {
//                 setOpenModal(false);
//                 setEditMode(false);
//                 setCurrentUserId(null);
//                 setFormData({
//                   firstName: '',
//                   lastName: '',
//                   email: '',
//                   role: 'passenger',
//                   bio: '',
//                 });
//               }}>
//                 <FiX size={20} />
//               </ModalCloseButton>
//             </ModalHeader>
//             <ModalBody>
//               <form onSubmit={handleSubmit}>
//                 <FormGroup>
//                   <FormLabel htmlFor="firstName">First Name *</FormLabel>
//                   <FormInput
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="e.g., John"
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <FormLabel htmlFor="lastName">Last Name *</FormLabel>
//                   <FormInput
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="e.g., Doe"
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <FormLabel htmlFor="email">Email *</FormLabel>
//                   <FormInput
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="e.g., john.doe@example.com"
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <FormLabel htmlFor="role">Role *</FormLabel>
//                   <FormSelect
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleInputChange}
//                   >
//                     <option value="passenger">Passenger</option>
//                     <option value="driver">Driver</option>
//                     <option value="admin">Admin</option>
//                   </FormSelect>
//                 </FormGroup>
//                 <FormGroup>
//                   <FormLabel htmlFor="bio">Bio</FormLabel>
//                   <FormInput
//                     type="text"
//                     id="bio"
//                     name="bio"
//                     value={formData.bio}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Short bio about the user"
//                   />
//                 </FormGroup>
//                 <ModalFooter>
//                   <SecondaryButton
//                     type="button"
//                     onClick={() => {
//                       setOpenModal(false);
//                       setEditMode(false);
//                       setCurrentUserId(null);
//                       setFormData({
//                         firstName: '',
//                         lastName: '',
//                         email: '',
//                         role: 'passenger',
//                         bio: '',
//                       });
//                     }}
//                   >
//                     Cancel
//                   </SecondaryButton>
//                   <PrimaryButton type="submit">
//                     {editMode ? 'Update User' : 'Add User'}
//                   </PrimaryButton>
//                 </ModalFooter>
//               </form>
//             </ModalBody>
//           </ModalContainer>
//         </ModalOverlay>
//       )}
//     </Container>
//   );
// }

// export default UserManagement;
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { FiPlus, FiRefreshCw, FiEdit2, FiTrash2, FiSearch, FiX, FiCheckCircle, FiAlertTriangle, FiPauseCircle } from 'react-icons/fi';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/auth/all-users';

// Styled Components
const Container = styled.div`
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #4299e1;
  color: white;
  border: none;

  &:hover {
    background-color: #3182ce;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #e2e8f0;
  color: #2d3748;
  border: none;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const DangerButton = styled(Button)`
  background-color: #f56565;
  color: white;
  border: none;

  &:hover {
    background-color: #e53e3e;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: #a0aec0;
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f7fafc;
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #edf2f7;

  &:hover {
    background-color: #f8fafc;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #4a5568;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const ActiveStatus = styled(StatusBadge)`
  background-color: #f0fff4;
  color: #38a169;
`;

const MaintenanceStatus = styled(StatusBadge)`
  background-color: #fffaf0;
  color: #dd6b20;
`;

const InactiveStatus = styled(StatusBadge)`
  background-color: #fff5f5;
  color: #e53e3e;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: none;
  color: #718096;

  &:hover {
    background-color: #edf2f7;
    color: #4299e1;
  }
`;

const DeleteButton = styled(ActionButton)`
  &:hover {
    color: #e53e3e;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #edf2f7;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
`;

const ModalCloseButton = styled.button`
  color: #a0aec0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    color: #718096;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #edf2f7;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;

  &::after {
    content: '';
    width: 3rem;
    height: 3rem;
    border: 3px solid #e2e8f0;
    border-top-color: #4299e1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #718096;
`;

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SummaryCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TotalSummaryCard = styled(SummaryCard)`
  border-top: 4px solid #4299e1;
`;

const ActiveSummaryCard = styled(SummaryCard)`
  border-top: 4px solid #38a169;
`;

const MaintenanceSummaryCard = styled(SummaryCard)`
  border-top: 4px solid #dd6b20;
`;

const InactiveSummaryCard = styled(SummaryCard)`
  border-top: 4px solid #e53e3e;
`;

const SummaryTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: #718096;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SummaryValue = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`;

const SummaryChange = styled.span`
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: ${props => props.positive ? '#38a169' : props.negative ? '#e53e3e' : '#718096'};
`;

// API Functions
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function getUsers() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Token not found in localStorage');
  }

  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

async function createUser(userData) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:7000/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

async function updateUser(id, userData) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`http://localhost:7000/api/v1/auth/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

async function deleteUser(id) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`http://localhost:7000/api/v1/auth/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete user');
  }
}

// Component
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'passenger',
    bio: '',
    phoneNumber: '',
    profileImage: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const getSummaryData = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.role === 'active').length;
    const maintenanceUsers = users.filter(user => user.role === 'maintenance').length;
    const inactiveUsers = users.filter(user => user.role === 'inactive').length;

    return {
      total: totalUsers,
      active: activeUsers,
      maintenance: maintenanceUsers,
      inactive: inactiveUsers,
      activePercentage: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0,
    };
  };

  const summaryData = getSummaryData();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      if (response.success && Array.isArray(response.data)) {
        setUsers(response.data.filter(user => user.role !== 'admin'));
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
        text: `Error fetching users: ${error.message}`,
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
        await updateUser(currentUserId, formData);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User updated successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createUser(formData);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User created successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      fetchUsers();
      setOpenModal(false);
      setEditMode(false);
      setCurrentUserId(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'passenger',
        bio: '',
        phoneNumber: '',
        profileImage: ''
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error ${editMode ? 'updating' : 'creating'} user: ${error.message}`,
      });
    }
  };

  const handleEdit = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      bio: user.bio,
      phoneNumber: user.phoneNumber || '',
      profileImage: user.profileImage || ''
    });
    setCurrentUserId(user._id);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4299e1',
      cancelButtonColor: '#e53e3e',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'User has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
        fetchUsers();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error deleting user: ${error.message}`,
        });
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    (user.firstName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.lastName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.role || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStatusBadge = (role) => {
    switch (role) {
      case 'active':
        return <ActiveStatus>{role}</ActiveStatus>;
      case 'maintenance':
        return <MaintenanceStatus>{role}</MaintenanceStatus>;
      case 'inactive':
        return <InactiveStatus>{role}</InactiveStatus>;
      default:
        return <StatusBadge>{role}</StatusBadge>;
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>User Management</Title>
          <Subtitle>Manage your users efficiently</Subtitle>
        </div>
        <ButtonGroup>
          {/* <PrimaryButton onClick={() => { setOpenModal(true); setEditMode(false); }}>
            <FiPlus /> Add User
          </PrimaryButton> */}
          <SecondaryButton onClick={fetchUsers}>
            <FiRefreshCw /> Refresh
          </SecondaryButton>
        </ButtonGroup>
      </Header>

      <SummaryContainer>
        <TotalSummaryCard>
          <SummaryTitle>
            <FiCheckCircle /> Total Users
          </SummaryTitle>
          <SummaryValue>{summaryData.total}</SummaryValue>
          <SummaryChange>
            {summaryData.activePercentage}% operational
          </SummaryChange>
        </TotalSummaryCard>

        {/* <ActiveSummaryCard>
          <SummaryTitle>
            <FiCheckCircle /> Active
          </SummaryTitle>
          <SummaryValue>{summaryData.active}</SummaryValue>
          <SummaryChange positive>
            {summaryData.total > 0 ? Math.round((summaryData.active / summaryData.total) * 100) : 0}% of users
          </SummaryChange>
        </ActiveSummaryCard>

        <MaintenanceSummaryCard>
          <SummaryTitle>
            <FiAlertTriangle /> Maintenance
          </SummaryTitle>
          <SummaryValue>{summaryData.maintenance}</SummaryValue>
          <SummaryChange>
            {summaryData.total > 0 ? Math.round((summaryData.maintenance / summaryData.total) * 100) : 0}% of users
          </SummaryChange>
        </MaintenanceSummaryCard>

        <InactiveSummaryCard>
          <SummaryTitle>
            <FiPauseCircle /> Inactive
          </SummaryTitle>
          <SummaryValue>{summaryData.inactive}</SummaryValue>
          <SummaryChange negative>
            {summaryData.total > 0 ? Math.round((summaryData.inactive / summaryData.total) * 100) : 0}% of users
          </SummaryChange>
        </InactiveSummaryCard> */}
      </SummaryContainer>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search users by name, email, or role..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchIcon>
          <FiSearch />
        </SearchIcon>
      </SearchContainer>

      <TableContainer>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>User</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Created</TableHeaderCell>
                {/* <TableHeaderCell>Actions</TableHeaderCell> */}
              </tr>
            </TableHeader>
            <tbody>
              {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={`${user.firstName} ${user.lastName}`}
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                          />
                        ) : (
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd' }} />
                        )}
                        <span>{user.firstName} {user.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{renderStatusBadge(user.role)}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    {/* <TableCell>
                      <ActionButtons>
                        <ActionButton onClick={() => handleEdit(user)} title="Edit">
                          <FiEdit2 />
                        </ActionButton>
                        <DeleteButton onClick={() => handleDelete(user._id)} title="Delete">
                          <FiTrash2 />
                        </DeleteButton>
                      </ActionButtons>
                    </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6">
                    <EmptyState>
                      {users.length === 0 ? 'No users available. Add your first user!' : 'No users match your search criteria.'}
                    </EmptyState>
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        )}
      </TableContainer>

      {openModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{editMode ? 'Edit User' : 'Add New User'}</ModalTitle>
              <ModalCloseButton onClick={() => {
                setOpenModal(false);
                setEditMode(false);
                setCurrentUserId(null);
                setFormData({
                  firstName: '',
                  lastName: '',
                  // email: '',
                  // role: 'passenger',
                  bio: '',
                  phoneNumber: '',
                  profileImage: ''
                });
              }}>
                <FiX size={20} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="firstName">First Name *</FormLabel>
                  <FormInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., John"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="lastName">Last Name *</FormLabel>
                  <FormInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Doe"
                  />
                </FormGroup>
                {/* <FormGroup>
                  <FormLabel htmlFor="email">Email *</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., john.doe@example.com"
                  />
                </FormGroup> */}
                {/* <FormGroup>
                  <FormLabel htmlFor="role">Role *</FormLabel>
                  <FormSelect
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="passenger">Passenger</option>
                    <option value="driver">Driver</option>
                    <option value="admin">Admin</option>
                  </FormSelect>
                </FormGroup> */}
                <FormGroup>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <FormInput
                    type="text"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="e.g., Short bio about the user"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <FormInput
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 1234567890"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="profileImage">Profile Image URL</FormLabel>
                  <FormInput
                    type="text"
                    id="profileImage"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleInputChange}
                    placeholder="e.g., https://example.com/profile.jpg"
                  />
                </FormGroup>
                <ModalFooter>
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setOpenModal(false);
                      setEditMode(false);
                      setCurrentUserId(null);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        role: 'passenger',
                        bio: '',
                        phoneNumber: '',
                        profileImage: ''
                      });
                    }}
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit">
                    {editMode ? 'Update User' : 'Add User'}
                  </PrimaryButton>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default UserManagement;
