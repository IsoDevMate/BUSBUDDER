// // // import React, { useState, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import { useNavigate } from 'react-router-dom';

// // // // Main Container Styles
// // // const DashboardContainer = styled.div`
// // //   max-width: 1200px;
// // //   margin: 0 auto;
// // //   padding: 20px;
// // //   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// // // `;

// // // // Header Styles
// // // const Header = styled.header`
// // //   display: flex;
// // //   justify-content: space-between;
// // //   align-items: center;
// // //   margin-bottom: 30px;
// // //   padding-bottom: 20px;
// // //   border-bottom: 1px solid #e2e8f0;
// // // `;

// // // const Title = styled.h1`
// // //   color: #2d3748;
// // //   font-size: 28px;
// // //   margin: 0;
// // // `;

// // // const UserGreeting = styled.div`
// // //   display: flex;
// // //   align-items: center;
// // //   gap: 15px;
// // // `;

// // // const Avatar = styled.div`
// // //   width: 50px;
// // //   height: 50px;
// // //   border-radius: 50%;
// // //   background-color: #4c51bf;
// // //   color: white;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // //   font-size: 20px;
// // //   font-weight: bold;
// // // `;

// // // const GreetingText = styled.div`
// // //   text-align: right;
// // // `;

// // // const WelcomeText = styled.p`
// // //   margin: 0;
// // //   color: #718096;
// // //   font-size: 14px;
// // // `;

// // // const UserName = styled.p`
// // //   margin: 0;
// // //   font-weight: 600;
// // //   color: #2d3748;
// // // `;

// // // // Dashboard Layout
// // // const DashboardContent = styled.div`
// // //   display: grid;
// // //   grid-template-columns: 300px 1fr;
// // //   gap: 30px;

// // //   @media (max-width: 768px) {
// // //     grid-template-columns: 1fr;
// // //   }
// // // `;

// // // // Profile Card Styles
// // // const ProfileCard = styled.div`
// // //   background-color: white;
// // //   border-radius: 10px;
// // //   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// // //   padding: 25px;
// // // `;

// // // const CardTitle = styled.h2`
// // //   color: #2d3748;
// // //   font-size: 20px;
// // //   margin-top: 0;
// // //   margin-bottom: 20px;
// // //   padding-bottom: 15px;
// // //   border-bottom: 1px solid #e2e8f0;
// // // `;

// // // const ProfileDetail = styled.div`
// // //   margin-bottom: 20px;
// // // `;

// // // const DetailLabel = styled.p`
// // //   color: #718096;
// // //   font-size: 14px;
// // //   margin: 0 0 5px 0;
// // // `;

// // // const DetailValue = styled.p`
// // //   color: #2d3748;
// // //   font-size: 16px;
// // //   font-weight: 500;
// // //   margin: 0;
// // //   padding: 8px 0;
// // // `;

// // // const ProfileImage = styled.div`
// // //   width: 150px;
// // //   height: 150px;
// // //   border-radius: 50%;
// // //   background-color: #edf2f7;
// // //   margin: 0 auto 20px;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // //   overflow: hidden;
// // //   position: relative;
// // // `;

// // // const InitialsAvatar = styled.div`
// // //   width: 100%;
// // //   height: 100%;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // //   background-color: #4c51bf;
// // //   color: white;
// // //   font-size: 48px;
// // //   font-weight: bold;
// // // `;

// // // // Stats Card Styles
// // // const StatsCard = styled.div`
// // //   background-color: white;
// // //   border-radius: 10px;
// // //   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// // //   padding: 25px;
// // //   margin-bottom: 30px;
// // // `;

// // // const StatsGrid = styled.div`
// // //   display: grid;
// // //   grid-template-columns: repeat(3, 1fr);
// // //   gap: 20px;

// // //   @media (max-width: 600px) {
// // //     grid-template-columns: 1fr;
// // //   }
// // // `;

// // // const StatItem = styled.div`
// // //   text-align: center;
// // //   padding: 15px;
// // //   border-radius: 8px;
// // //   background-color: #f8fafc;
// // // `;

// // // const StatValue = styled.div`
// // //   font-size: 28px;
// // //   font-weight: 700;
// // //   color: #4c51bf;
// // //   margin-bottom: 5px;
// // // `;

// // // const StatLabel = styled.div`
// // //   font-size: 14px;
// // //   color: #718096;
// // // `;

// // // // Activity Styles
// // // const RecentActivity = styled.div`
// // //   background-color: white;
// // //   border-radius: 10px;
// // //   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// // //   padding: 25px;
// // // `;

// // // const ActivityItem = styled.div`
// // //   padding: 15px 0;
// // //   border-bottom: 1px solid #e2e8f0;
// // //   display: flex;
// // //   align-items: center;
// // //   gap: 15px;

// // //   &:last-child {
// // //     border-bottom: none;
// // //   }
// // // `;

// // // const ActivityIcon = styled.div`
// // //   width: 40px;
// // //   height: 40px;
// // //   border-radius: 50%;
// // //   background-color: #edf2f7;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // //   color: #4c51bf;
// // // `;

// // // const ActivityText = styled.div`
// // //   flex: 1;
// // // `;

// // // const ActivityTitle = styled.p`
// // //   margin: 0;
// // //   font-weight: 500;
// // //   color: #2d3748;
// // // `;

// // // const ActivityDate = styled.p`
// // //   margin: 5px 0 0;
// // //   font-size: 12px;
// // //   color: #718096;
// // // `;

// // // // Button Styles
// // // const Button = styled.button`
// // //   padding: 10px 20px;
// // //   border: none;
// // //   border-radius: 6px;
// // //   font-size: 16px;
// // //   cursor: pointer;
// // //   transition: all 0.3s;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // //   gap: 8px;

// // //   &:hover {
// // //     opacity: 0.9;
// // //   }
// // // `;

// // // const PrimaryButton = styled(Button)`
// // //   background-color: #4c51bf;
// // //   color: white;
// // //   width: 100%;
// // //   margin-top: 20px;
// // // `;

// // // const DangerButton = styled(Button)`
// // //   background-color: #f56565;
// // //   color: white;
// // //   width: 100%;
// // //   margin-top: 10px;
// // // `;

// // // // Edit Modal Styles
// // // const EditProfileModal = styled.div`
// // //   position: fixed;
// // //   top: 0;
// // //   left: 0;
// // //   right: 0;
// // //   bottom: 0;
// // //   background-color: rgba(0, 0, 0, 0.5);
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // //   z-index: 1000;
// // // `;

// // // const ModalContent = styled.div`
// // //   background-color: white;
// // //   border-radius: 10px;
// // //   padding: 30px;
// // //   width: 90%;
// // //   max-width: 500px;
// // //   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
// // // `;

// // // const ModalHeader = styled.div`
// // //   display: flex;
// // //   justify-content: space-between;
// // //   align-items: center;
// // //   margin-bottom: 20px;
// // // `;

// // // const ModalTitle = styled.h3`
// // //   margin: 0;
// // //   color: #2d3748;
// // // `;

// // // const CloseButton = styled.button`
// // //   background: none;
// // //   border: none;
// // //   font-size: 20px;
// // //   cursor: pointer;
// // //   color: #718096;
// // // `;

// // // const FormGroup = styled.div`
// // //   margin-bottom: 20px;
// // // `;

// // // const FormLabel = styled.label`
// // //   display: block;
// // //   margin-bottom: 8px;
// // //   font-weight: 500;
// // //   color: #4a5568;
// // // `;

// // // const FormInput = styled.input`
// // //   width: 100%;
// // //   padding: 10px 15px;
// // //   border: 1px solid #e2e8f0;
// // //   border-radius: 6px;
// // //   font-size: 16px;
// // //   transition: border-color 0.3s;

// // //   &:focus {
// // //     outline: none;
// // //     border-color: #4c51bf;
// // //   }
// // // `;

// // // const FormTextarea = styled.textarea`
// // //   width: 100%;
// // //   padding: 10px 15px;
// // //   border: 1px solid #e2e8f0;
// // //   border-radius: 6px;
// // //   font-size: 16px;
// // //   min-height: 100px;
// // //   resize: vertical;
// // //   transition: border-color 0.3s;

// // //   &:focus {
// // //     outline: none;
// // //     border-color: #4c51bf;
// // //   }
// // // `;

// // // const ImageUploadWrapper = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   margin-bottom: 20px;
// // // `;

// // // const ImagePreview = styled.img`
// // //   width: 150px;
// // //   height: 150px;
// // //   border-radius: 50%;
// // //   object-fit: cover;
// // //   margin-bottom: 15px;
// // //   border: 2px solid #e2e8f0;
// // // `;

// // // const UploadLabel = styled.label`
// // //   padding: 8px 15px;
// // //   background-color: #edf2f7;
// // //   border-radius: 6px;
// // //   cursor: pointer;
// // //   transition: background-color 0.3s;

// // //   &:hover {
// // //     background-color: #e2e8f0;
// // //   }
// // // `;

// // // const UploadInput = styled.input`
// // //   display: none;
// // // `;

// // // const ModalFooter = styled.div`
// // //   display: flex;
// // //   justify-content: flex-end;
// // //   gap: 15px;
// // //   margin-top: 30px;
// // // `;

// // // const ErrorMessage = styled.p`
// // //   color: #e53e3e;
// // //   margin-top: 10px;
// // //   text-align: center;
// // // `;

// // // const LoadingMessage = styled.div`
// // //   text-align: center;
// // //   padding: 40px;
// // //   color: #4a5568;
// // // `;

// // // const ErrorAlert = styled.div`
// // //   color: #e53e3e;
// // //   text-align: center;
// // //   padding: 40px;
// // // `;

// // // const PassengerDashboard = () => {
// // //   const navigate = useNavigate();
// // //   const [passenger, setPassenger] = useState(null);
// // //   const [bookings, setBookings] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [bookingsLoading, setBookingsLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [bookingsError, setBookingsError] = useState(null);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [editData, setEditData] = useState({
// // //     firstName: '',
// // //     lastName: '',
// // //     phoneNumber: '',
// // //     bio: '',
// // //     profileImage: ''
// // //   });
// // //   const [imagePreview, setImagePreview] = useState('');
// // //   const [isUpdating, setIsUpdating] = useState(false);
// // //   const [updateError, setUpdateError] = useState('');

// // //   useEffect(() => {
// // //     const fetchPassengerDetails = async () => {
// // //       setLoading(true);
// // //       setError(null);
// // //       try {
// // //         const token = localStorage.getItem('accessToken');
// // //         const response = await fetch('http://localhost:7000/api/v1/auth/profile', {
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //           },
// // //         });

// // //         if (!response.ok) {
// // //           throw new Error('Failed to fetch passenger details');
// // //         }

// // //         const data = await response.json();
// // //         setPassenger(data.data);
// // //         setEditData({
// // //           firstName: data.data.firstName || '',
// // //           lastName: data.data.lastName || '',
// // //           phoneNumber: data.data.phoneNumber || '',
// // //           bio: data.data.bio || '',
// // //           profileImage: data.data.profileImage || ''
// // //         });
// // //         setImagePreview(data.data.profileImage || '');
// // //       } catch (err) {
// // //         console.error('Error fetching passenger details:', err);
// // //         setError('Failed to load passenger details. Please try again.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchPassengerDetails();
// // //   }, [navigate]);

// // //   useEffect(() => {
// // //     const fetchBookings = async () => {
// // //       if (!passenger?.email) return;
      
// // //       setBookingsLoading(true);
// // //       setBookingsError(null);
// // //       try {
// // //         const token = localStorage.getItem('accessToken');
// // //         const response = await fetch(
// // //           `http://localhost:7000/api/v1/bookings?email=${passenger.email}`, 
// // //           {
// // //             headers: {
// // //               'Authorization': `Bearer ${token}`,
// // //             },
// // //           }
// // //         );

// // //         if (!response.ok) {
// // //           throw new Error('Failed to fetch bookings');
// // //         }

// // //         const data = await response.json();
// // //         setBookings(data.data || []);
// // //       } catch (err) {
// // //         console.error('Error fetching bookings:', err);
// // //         setBookingsError('Failed to load bookings. Please try again.');
// // //       } finally {
// // //         setBookingsLoading(false);
// // //       }
// // //     };

// // //     fetchBookings();
// // //   }, [passenger?.email]);

// // //   const getInitials = (firstName, lastName) => {
// // //     return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
// // //   };

// // //   const handleEditChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setEditData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleImageChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setImagePreview(reader.result);
// // //       };
// // //       reader.readAsDataURL(file);
// // //       setEditData(prev => ({
// // //         ...prev,
// // //         profileImage: file
// // //       }));
// // //     }
// // //   };

// // //   const handleUpdateProfile = async () => {
// // //     setIsUpdating(true);
// // //     setUpdateError('');
    
// // //     try {
// // //       const token = localStorage.getItem('accessToken');
      
// // //       const formData = new FormData();
// // //       formData.append('firstName', editData.firstName);
// // //       formData.append('lastName', editData.lastName);
// // //       formData.append('phoneNumber', editData.phoneNumber);
// // //       formData.append('bio', editData.bio);
// // //       if (editData.profileImage instanceof File) {
// // //         formData.append('profileImage', editData.profileImage);
// // //       }

// // //       const response = await fetch('http://localhost:7000/api/v1/auth/update-profile', {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //         },
// // //         body: formData
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Failed to update profile');
// // //       }

// // //       const data = await response.json();
// // //       setPassenger(data.data);
// // //       setIsEditing(false);
// // //     } catch (err) {
// // //       console.error('Error updating profile:', err);
// // //       setUpdateError(err.message || 'Failed to update profile. Please try again.');
// // //     } finally {
// // //       setIsUpdating(false);
// // //     }
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.removeItem('accessToken');
// // //     localStorage.removeItem('userId');
// // //     localStorage.removeItem('userRole');
// // //     localStorage.removeItem('userName');
// // //     navigate('/login');
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <DashboardContainer>
// // //         <LoadingMessage>Loading passenger details...</LoadingMessage>
// // //       </DashboardContainer>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <DashboardContainer>
// // //         <ErrorAlert>{error}</ErrorAlert>
// // //       </DashboardContainer>
// // //     );
// // //   }

// // //   // Calculate stats from bookings data
// // //   const stats = {
// // //     tripsCompleted: bookings.filter(b => b.status === 'completed').length,
// // //     upcomingTrips: bookings.filter(b => b.status === 'confirmed').length,
// // //     rewardsPoints: bookings.reduce((total, booking) => total + (booking.rewardsEarned || 0), 0)
// // //   };

// // //   return (
// // //     <DashboardContainer>
// // //       <Header>
// // //         <Title>Passenger Dashboard</Title>
// // //         <UserGreeting>
// // //           <GreetingText>
// // //             <WelcomeText>Welcome back</WelcomeText>
// // //             <UserName>{passenger?.firstName} {passenger?.lastName}</UserName>
// // //           </GreetingText>
// // //           <Avatar>{getInitials(passenger?.firstName, passenger?.lastName)}</Avatar>
// // //         </UserGreeting>
// // //       </Header>

// // //       <DashboardContent>
// // //         <div>
// // //           <ProfileCard>
// // //             <ProfileImage>
// // //               {passenger?.profileImage ? (
// // //                 <img 
// // //                   src={passenger.profileImage} 
// // //                   alt="Profile" 
// // //                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// // //                 />
// // //               ) : (
// // //                 <InitialsAvatar>
// // //                   {getInitials(passenger?.firstName, passenger?.lastName)}
// // //                 </InitialsAvatar>
// // //               )}
// // //             </ProfileImage>
            
// // //             <CardTitle>Profile Details</CardTitle>
            
// // //             <ProfileDetail>
// // //               <DetailLabel>Full Name</DetailLabel>
// // //               <DetailValue>{passenger?.firstName} {passenger?.lastName}</DetailValue>
// // //             </ProfileDetail>
            
// // //             <ProfileDetail>
// // //               <DetailLabel>Email</DetailLabel>
// // //               <DetailValue>{passenger?.email}</DetailValue>
// // //             </ProfileDetail>
            
// // //             <ProfileDetail>
// // //               <DetailLabel>Phone Number</DetailLabel>
// // //               <DetailValue>{passenger?.phoneNumber || 'Not provided'}</DetailValue>
// // //             </ProfileDetail>
            
// // //             <ProfileDetail>
// // //               <DetailLabel>Account Type</DetailLabel>
// // //               <DetailValue style={{ 
// // //                 textTransform: 'capitalize',
// // //                 color: passenger?.role === 'admin' ? '#9f7aea' : '#4c51bf'
// // //               }}>
// // //                 {passenger?.role}
// // //               </DetailValue>
// // //             </ProfileDetail>
            
// // //             {passenger?.bio && (
// // //               <ProfileDetail>
// // //                 <DetailLabel>Bio</DetailLabel>
// // //                 <DetailValue>{passenger.bio}</DetailValue>
// // //               </ProfileDetail>
// // //             )}
            
// // //             <ProfileDetail>
// // //               <DetailLabel>Member Since</DetailLabel>
// // //               <DetailValue>
// // //                 {new Date(passenger?.createdAt).toLocaleDateString('en-US', {
// // //                   year: 'numeric',
// // //                   month: 'long',
// // //                   day: 'numeric'
// // //                 })}
// // //               </DetailValue>
// // //             </ProfileDetail>
            
// // //             <PrimaryButton onClick={() => setIsEditing(true)}>
// // //               <i className="fas fa-edit"></i> Edit Profile
// // //             </PrimaryButton>
            
// // //             <DangerButton onClick={handleLogout}>
// // //               <i className="fas fa-sign-out-alt"></i> Logout
// // //             </DangerButton>
// // //           </ProfileCard>
// // //         </div>
        
// // //         <div>
// // //           <StatsCard>
// // //             <CardTitle>Your Travel Stats</CardTitle>
// // //             <StatsGrid>
// // //               <StatItem>
// // //                 <StatValue>{stats.tripsCompleted}</StatValue>
// // //                 <StatLabel>Trips Completed</StatLabel>
// // //               </StatItem>
// // //               <StatItem>
// // //                 <StatValue>{stats.upcomingTrips}</StatValue>
// // //                 <StatLabel>Upcoming Trips</StatLabel>
// // //               </StatItem>
// // //               <StatItem>
// // //                 <StatValue>{stats.rewardsPoints}</StatValue>
// // //                 <StatLabel>Reward Points</StatLabel>
// // //               </StatItem>
// // //             </StatsGrid>
// // //           </StatsCard>
          
// // //           <RecentActivity>
// // //             <CardTitle>Recent Bookings</CardTitle>
            
// // //             {bookingsLoading ? (
// // //               <LoadingMessage>Loading bookings...</LoadingMessage>
// // //             ) : bookingsError ? (
// // //               <ErrorAlert>{bookingsError}</ErrorAlert>
// // //             ) : bookings.length === 0 ? (
// // //               <LoadingMessage>No bookings found</LoadingMessage>
// // //             ) : (
// // //               bookings.slice(0, 3).map(booking => (
// // //                 <ActivityItem key={booking._id}>
// // //                   <ActivityIcon>
// // //                     <i className="fas fa-bus"></i>
// // //                   </ActivityIcon>
// // //                   <ActivityText>
// // //                     <ActivityTitle>
// // //                       Booking #{booking.ticketId} - {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
// // //                     </ActivityTitle>
// // //                     <ActivityDate>
// // //                       {new Date(booking.bookingDate).toLocaleDateString('en-US', {
// // //                         year: 'numeric',
// // //                         month: 'long',
// // //                         day: 'numeric',
// // //                         hour: '2-digit',
// // //                         minute: '2-digit'
// // //                       })} • Seats: {booking.seatNumber?.join(', ') || 'Not assigned'}
// // //                     </ActivityDate>
// // //                   </ActivityText>
// // //                 </ActivityItem>
// // //               ))
// // //             )}
// // //           </RecentActivity>
// // //         </div>
// // //       </DashboardContent>

// // //       {isEditing && (
// // //         <EditProfileModal>
// // //           <ModalContent>
// // //             <ModalHeader>
// // //               <ModalTitle>Edit Profile</ModalTitle>
// // //               <CloseButton onClick={() => setIsEditing(false)}>×</CloseButton>
// // //             </ModalHeader>
            
// // //             <ImageUploadWrapper>
// // //               {imagePreview ? (
// // //                 <ImagePreview src={imagePreview} alt="Profile Preview" />
// // //               ) : (
// // //                 <InitialsAvatar>
// // //                   {getInitials(editData.firstName, editData.lastName)}
// // //                 </InitialsAvatar>
// // //               )}
// // //               <UploadLabel>
// // //                 <i className="fas fa-camera"></i> Change Photo
// // //                 <UploadInput 
// // //                   type="file" 
// // //                   accept="image/*" 
// // //                   onChange={handleImageChange}
// // //                 />
// // //               </UploadLabel>
// // //             </ImageUploadWrapper>
            
// // //             <FormGroup>
// // //               <FormLabel>First Name</FormLabel>
// // //               <FormInput
// // //                 type="text"
// // //                 name="firstName"
// // //                 value={editData.firstName}
// // //                 onChange={handleEditChange}
// // //                 required
// // //               />
// // //             </FormGroup>
            
// // //             <FormGroup>
// // //               <FormLabel>Last Name</FormLabel>
// // //               <FormInput
// // //                 type="text"
// // //                 name="lastName"
// // //                 value={editData.lastName}
// // //                 onChange={handleEditChange}
// // //                 required
// // //               />
// // //             </FormGroup>
            
// // //             <FormGroup>
// // //               <FormLabel>Phone Number</FormLabel>
// // //               <FormInput
// // //                 type="tel"
// // //                 name="phoneNumber"
// // //                 value={editData.phoneNumber}
// // //                 onChange={handleEditChange}
// // //               />
// // //             </FormGroup>
            
// // //             <FormGroup>
// // //               <FormLabel>Bio</FormLabel>
// // //               <FormTextarea
// // //                 name="bio"
// // //                 value={editData.bio}
// // //                 onChange={handleEditChange}
// // //                 placeholder="Tell us about yourself..."
// // //               />
// // //             </FormGroup>
            
// // //             {updateError && <ErrorMessage>{updateError}</ErrorMessage>}
            
// // //             <ModalFooter>
// // //               <Button 
// // //                 onClick={() => setIsEditing(false)} 
// // //                 disabled={isUpdating}
// // //                 style={{ background: '#e2e8f0', color: '#4a5568' }}
// // //               >
// // //                 Cancel
// // //               </Button>
// // //               <PrimaryButton onClick={handleUpdateProfile} disabled={isUpdating}>
// // //                 {isUpdating ? (
// // //                   <>
// // //                     <i className="fas fa-spinner fa-spin"></i> Updating...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <i className="fas fa-save"></i> Save Changes
// // //                   </>
// // //                 )}
// // //               </PrimaryButton>
// // //             </ModalFooter>
// // //           </ModalContent>
// // //         </EditProfileModal>
// // //       )}
// // //     </DashboardContainer>
// // //   );
// // // };

// // // export default PassengerDashboard;
// // import React, { useState, useEffect, useRef } from 'react';
// // import styled from 'styled-components';
// // import { useNavigate } from 'react-router-dom';
// // import { usePDF } from 'react-to-pdf';

// // // Main Container Styles
// // const DashboardContainer = styled.div`
// //   max-width: 1200px;
// //   margin: 0 auto;
// //   padding: 20px;
// //   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// // `;

// // // Header Styles
// // const Header = styled.header`
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   margin-bottom: 30px;
// //   padding-bottom: 20px;
// //   border-bottom: 1px solid #e2e8f0;
// // `;

// // const Title = styled.h1`
// //   color: #2d3748;
// //   font-size: 28px;
// //   margin: 0;
// // `;

// // const UserGreeting = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: 15px;
// // `;

// // const Avatar = styled.div`
// //   width: 50px;
// //   height: 50px;
// //   border-radius: 50%;
// //   background-color: #4c51bf;
// //   color: white;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   font-size: 20px;
// //   font-weight: bold;
// // `;

// // const GreetingText = styled.div`
// //   text-align: right;
// // `;

// // const WelcomeText = styled.p`
// //   margin: 0;
// //   color: #718096;
// //   font-size: 14px;
// // `;

// // const UserName = styled.p`
// //   margin: 0;
// //   font-weight: 600;
// //   color: #2d3748;
// // `;

// // // Dashboard Layout
// // const DashboardContent = styled.div`
// //   display: grid;
// //   grid-template-columns: 300px 1fr;
// //   gap: 30px;

// //   @media (max-width: 768px) {
// //     grid-template-columns: 1fr;
// //   }
// // `;

// // // Profile Card Styles
// // const ProfileCard = styled.div`
// //   background-color: white;
// //   border-radius: 10px;
// //   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// //   padding: 25px;
// // `;

// // const CardTitle = styled.h2`
// //   color: #2d3748;
// //   font-size: 20px;
// //   margin-top: 0;
// //   margin-bottom: 20px;
// //   padding-bottom: 15px;
// //   border-bottom: 1px solid #e2e8f0;
// // `;

// // const ProfileDetail = styled.div`
// //   margin-bottom: 20px;
// // `;

// // // const DetailLabel = styled.p`
// // //   color: #718096;
// // //   font-size: 14px;
// // //   margin: 0 0 5px 0;
// // // `;

// // const DetailValue = styled.p`
// //   color: #2d3748;
// //   font-size: 16px;
// //   font-weight: 500;
// //   margin: 0;
// //   padding: 8px 0;
// // `;

// // const ProfileImage = styled.div`
// //   width: 150px;
// //   height: 150px;
// //   border-radius: 50%;
// //   background-color: #edf2f7;
// //   margin: 0 auto 20px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   overflow: hidden;
// //   position: relative;
// // `;

// // const InitialsAvatar = styled.div`
// //   width: 100%;
// //   height: 100%;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   background-color: #4c51bf;
// //   color: white;
// //   font-size: 48px;
// //   font-weight: bold;
// // `;

// // // Stats Card Styles
// // const StatsCard = styled.div`
// //   background-color: white;
// //   border-radius: 10px;
// //   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// //   padding: 25px;
// //   margin-bottom: 30px;
// // `;

// // const StatsGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(3, 1fr);
// //   gap: 20px;

// //   @media (max-width: 600px) {
// //     grid-template-columns: 1fr;
// //   }
// // `;

// // const StatItem = styled.div`
// //   text-align: center;
// //   padding: 15px;
// //   border-radius: 8px;
// //   background-color: #f8fafc;
// // `;

// // const StatValue = styled.div`
// //   font-size: 28px;
// //   font-weight: 700;
// //   color: #4c51bf;
// //   margin-bottom: 5px;
// // `;

// // const StatLabel = styled.div`
// //   font-size: 14px;
// //   color: #718096;
// // `;

// // // Activity Styles
// // const RecentActivity = styled.div`
// //   background-color: white;
// //   border-radius: 10px;
// //   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// //   padding: 25px;
// // `;

// // const ActivityItem = styled.div`
// //   padding: 15px 0;
// //   border-bottom: 1px solid #e2e8f0;
// //   display: flex;
// //   align-items: center;
// //   gap: 15px;

// //   &:last-child {
// //     border-bottom: none;
// //   }
// // `;

// // const ActivityIcon = styled.div`
// //   width: 40px;
// //   height: 40px;
// //   border-radius: 50%;
// //   background-color: #edf2f7;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   color: #4c51bf;
// // `;

// // const ActivityText = styled.div`
// //   flex: 1;
// // `;

// // const ActivityTitle = styled.p`
// //   margin: 0;
// //   font-weight: 500;
// //   color: #2d3748;
// // `;

// // const ActivityDate = styled.p`
// //   margin: 5px 0 0;
// //   font-size: 12px;
// //   color: #718096;
// // `;

// // // Button Styles
// // const Button = styled.button`
// //   padding: 10px 20px;
// //   border: none;
// //   border-radius: 6px;
// //   font-size: 16px;
// //   cursor: pointer;
// //   transition: all 0.3s;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   gap: 8px;

// //   &:hover {
// //     opacity: 0.9;
// //   }
// // `;

// // const PrimaryButton = styled(Button)`
// //   background-color: #4c51bf;
// //   color: white;
// //   width: 100%;
// //   margin-top: 20px;
// // `;

// // const DangerButton = styled(Button)`
// //   background-color: #f56565;
// //   color: white;
// //   width: 100%;
// //   margin-top: 10px;
// // `;

// // // Ticket Download Styles
// // const DownloadButton = styled(Button)`
// //   padding: 6px 12px;
// //   background-color: #38a169;
// //   color: white;
// //   border: none;
// //   border-radius: 4px;
// //   font-size: 14px;
// //   margin-top: 10px;

// //   &:hover {
// //     background-color: #2f855a;
// //   }
// // `;

// // // Ticket PDF Styles (hidden)
// // const TicketContainer = styled.div`
// //   display: none;
// // `;

// // const Ticket = styled.div`
// //   width: 100%;
// //   max-width: 500px;
// //   margin: 0 auto;
// //   padding: 20px;
// //   background-color: #ffffff;
// //   border: 1px solid #e2e8f0;
// //   border-radius: 8px;
// //   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// // `;

// // const TicketHeader = styled.div`
// //   text-align: center;
// //   margin-bottom: 20px;
// //   padding-bottom: 15px;
// //   border-bottom: 1px solid #e2e8f0;
// // `;

// // const TicketTitle = styled.h2`
// //   color: #2d3748;
// //   margin: 0;
// // `;

// // const TicketBody = styled.div`
// //   display: grid;
// //   grid-template-columns: 1fr 1fr;
// //   gap: 20px;
// //   margin-bottom: 20px;
// // `;

// // const TicketSection = styled.div`
// //   margin-bottom: 15px;
// // `;

// // const SectionTitle = styled.h3`
// //   color: #4a5568;
// //   font-size: 16px;
// //   margin: 0 0 10px 0;
// // `;

// // const TicketDetail = styled.div`
// //   margin-bottom: 8px;
// // `;

// // const DetailLabel = styled.span`
// //   font-weight: 500;
// //   color: #4a5568;
// // `;

// // // const DetailValue = styled.span`
// // //   color: #2d3748;
// // // `;

// // const TicketFooter = styled.div`
// //   margin-top: 20px;
// //   padding-top: 15px;
// //   border-top: 1px solid #e2e8f0;
// //   text-align: center;
// //   font-size: 12px;
// //   color: #718096;
// // `;

// // // Loading and Error Messages
// // const LoadingMessage = styled.div`
// //   text-align: center;
// //   padding: 40px;
// //   color: #4a5568;
// // `;

// // const ErrorAlert = styled.div`
// //   color: #e53e3e;
// //   text-align: center;
// //   padding: 40px;
// // `;

// // const PassengerDashboard = () => {
// //   const navigate = useNavigate();
// //   const { toPDF, targetRef } = usePDF({ filename: 'bus-ticket.pdf' });
// //   const ticketRef = useRef(null);

// //   const [passenger, setPassenger] = useState(null);
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [bookingsLoading, setBookingsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [bookingsError, setBookingsError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editData, setEditData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     phoneNumber: '',
// //     bio: '',
// //     profileImage: ''
// //   });
// //   const [imagePreview, setImagePreview] = useState('');
// //   const [isUpdating, setIsUpdating] = useState(false);
// //   const [updateError, setUpdateError] = useState('');

// //   useEffect(() => {
// //     const fetchPassengerDetails = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const token = localStorage.getItem('accessToken');
// //         const response = await fetch('http://localhost:7000/api/v1/auth/profile', {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error('Failed to fetch passenger details');
// //         }

// //         const data = await response.json();
// //         setPassenger(data.data);
// //         setEditData({
// //           firstName: data.data.firstName || '',
// //           lastName: data.data.lastName || '',
// //           phoneNumber: data.data.phoneNumber || '',
// //           bio: data.data.bio || '',
// //           profileImage: data.data.profileImage || ''
// //         });
// //         setImagePreview(data.data.profileImage || '');
// //       } catch (err) {
// //         console.error('Error fetching passenger details:', err);
// //         setError('Failed to load passenger details. Please try again.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPassengerDetails();
// //   }, [navigate]);

// //   useEffect(() => {
// //     const fetchBookings = async () => {
// //       if (!passenger?.email) return;
      
// //       setBookingsLoading(true);
// //       setBookingsError(null);
// //       try {
// //         const token = localStorage.getItem('accessToken');
// //         const response = await fetch(
// //           `http://localhost:7000/api/v1/bookings?email=${passenger.email}`, 
// //           {
// //             headers: {
// //               'Authorization': `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           throw new Error('Failed to fetch bookings');
// //         }

// //         const data = await response.json();
// //         setBookings(data.data || []);
// //       } catch (err) {
// //         console.error('Error fetching bookings:', err);
// //         setBookingsError('Failed to load bookings. Please try again.');
// //       } finally {
// //         setBookingsLoading(false);
// //       }
// //     };

// //     fetchBookings();
// //   }, [passenger?.email]);

// //   const getInitials = (firstName, lastName) => {
// //     return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
// //   };

// //   const handleEditChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //       setEditData(prev => ({
// //         ...prev,
// //         profileImage: file
// //       }));
// //     }
// //   };

// //   const handleUpdateProfile = async () => {
// //     setIsUpdating(true);
// //     setUpdateError('');
    
// //     try {
// //       const token = localStorage.getItem('accessToken');
      
// //       const formData = new FormData();
// //       formData.append('firstName', editData.firstName);
// //       formData.append('lastName', editData.lastName);
// //       formData.append('phoneNumber', editData.phoneNumber);
// //       formData.append('bio', editData.bio);
// //       if (editData.profileImage instanceof File) {
// //         formData.append('profileImage', editData.profileImage);
// //       }

// //       const response = await fetch('http://localhost:7000/api/v1/auth/update-profile', {
// //         method: 'PUT',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //         },
// //         body: formData
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to update profile');
// //       }

// //       const data = await response.json();
// //       setPassenger(data.data);
// //       setIsEditing(false);
// //     } catch (err) {
// //       console.error('Error updating profile:', err);
// //       setUpdateError(err.message || 'Failed to update profile. Please try again.');
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

// //   const handleDownloadTicket = (booking) => {
// //     ticketRef.current = {
// //       ...booking,
// //       passengerName: `${passenger?.firstName} ${passenger?.lastName}`,
// //       passengerEmail: passenger?.email,
// //       passengerPhone: passenger?.phoneNumber
// //     };
// //     toPDF();
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('accessToken');
// //     localStorage.removeItem('userId');
// //     localStorage.removeItem('userRole');
// //     localStorage.removeItem('userName');
// //     navigate('/login');
// //   };

// //   if (loading) {
// //     return (
// //       <DashboardContainer>
// //         <LoadingMessage>Loading passenger details...</LoadingMessage>
// //       </DashboardContainer>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <DashboardContainer>
// //         <ErrorAlert>{error}</ErrorAlert>
// //       </DashboardContainer>
// //     );
// //   }

// //   // Calculate stats from bookings data
// //   const stats = {
// //     tripsCompleted: bookings.filter(b => b.status === 'completed').length,
// //     upcomingTrips: bookings.filter(b => b.status === 'confirmed').length,
// //     rewardsPoints: bookings.reduce((total, booking) => total + (booking.rewardsEarned || 0), 0)
// //   };

// //   return (
// //     <DashboardContainer>
// //       <Header>
// //         <Title>Passenger Dashboard</Title>
// //         <UserGreeting>
// //           <GreetingText>
// //             <WelcomeText>Welcome back</WelcomeText>
// //             <UserName>{passenger?.firstName} {passenger?.lastName}</UserName>
// //           </GreetingText>
// //           <Avatar>{getInitials(passenger?.firstName, passenger?.lastName)}</Avatar>
// //         </UserGreeting>
// //       </Header>

// //       <DashboardContent>
// //         <div>
// //           <ProfileCard>
// //             <ProfileImage>
// //               {passenger?.profileImage ? (
// //                 <img 
// //                   src={passenger.profileImage} 
// //                   alt="Profile" 
// //                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //                 />
// //               ) : (
// //                 <InitialsAvatar>
// //                   {getInitials(passenger?.firstName, passenger?.lastName)}
// //                 </InitialsAvatar>
// //               )}
// //             </ProfileImage>
            
// //             <CardTitle>Profile Details</CardTitle>
            
// //             <ProfileDetail>
// //               <DetailLabel>Full Name</DetailLabel>
// //               <DetailValue>{passenger?.firstName} {passenger?.lastName}</DetailValue>
// //             </ProfileDetail>
            
// //             <ProfileDetail>
// //               <DetailLabel>Email</DetailLabel>
// //               <DetailValue>{passenger?.email}</DetailValue>
// //             </ProfileDetail>
            
// //             <ProfileDetail>
// //               <DetailLabel>Phone Number</DetailLabel>
// //               <DetailValue>{passenger?.phoneNumber || 'Not provided'}</DetailValue>
// //             </ProfileDetail>
            
// //             <ProfileDetail>
// //               <DetailLabel>Account Type</DetailLabel>
// //               <DetailValue style={{ 
// //                 textTransform: 'capitalize',
// //                 color: passenger?.role === 'admin' ? '#9f7aea' : '#4c51bf'
// //               }}>
// //                 {passenger?.role}
// //               </DetailValue>
// //             </ProfileDetail>
            
// //             {passenger?.bio && (
// //               <ProfileDetail>
// //                 <DetailLabel>Bio</DetailLabel>
// //                 <DetailValue>{passenger.bio}</DetailValue>
// //               </ProfileDetail>
// //             )}
            
// //             <ProfileDetail>
// //               <DetailLabel>Member Since</DetailLabel>
// //               <DetailValue>
// //                 {new Date(passenger?.createdAt).toLocaleDateString('en-US', {
// //                   year: 'numeric',
// //                   month: 'long',
// //                   day: 'numeric'
// //                 })}
// //               </DetailValue>
// //             </ProfileDetail>
            
// //             <PrimaryButton onClick={() => setIsEditing(true)}>
// //               <i className="fas fa-edit"></i> Edit Profile
// //             </PrimaryButton>
            
// //             <DangerButton onClick={handleLogout}>
// //               <i className="fas fa-sign-out-alt"></i> Logout
// //             </DangerButton>
// //           </ProfileCard>
// //         </div>
        
// //         <div>
// //           <StatsCard>
// //             <CardTitle>Your Travel Stats</CardTitle>
// //             <StatsGrid>
// //               <StatItem>
// //                 <StatValue>{stats.tripsCompleted}</StatValue>
// //                 <StatLabel>Trips Completed</StatLabel>
// //               </StatItem>
// //               <StatItem>
// //                 <StatValue>{stats.upcomingTrips}</StatValue>
// //                 <StatLabel>Upcoming Trips</StatLabel>
// //               </StatItem>
// //               <StatItem>
// //                 <StatValue>{stats.rewardsPoints}</StatValue>
// //                 <StatLabel>Reward Points</StatLabel>
// //               </StatItem>
// //             </StatsGrid>
// //           </StatsCard>
          
// //           <RecentActivity>
// //             <CardTitle>Recent Bookings</CardTitle>
            
// //             {bookingsLoading ? (
// //               <LoadingMessage>Loading bookings...</LoadingMessage>
// //             ) : bookingsError ? (
// //               <ErrorAlert>{bookingsError}</ErrorAlert>
// //             ) : bookings.length === 0 ? (
// //               <LoadingMessage>No bookings found</LoadingMessage>
// //             ) : (
// //               bookings.slice(0, 3).map(booking => (
// //                 <ActivityItem key={booking._id}>
// //                   <ActivityIcon>
// //                     <i className="fas fa-bus"></i>
// //                   </ActivityIcon>
// //                   <ActivityText>
// //                     <ActivityTitle>
// //                       Booking #{booking.ticketId} - {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
// //                     </ActivityTitle>
// //                     <ActivityDate>
// //                       {new Date(booking.bookingDate).toLocaleDateString('en-US', {
// //                         year: 'numeric',
// //                         month: 'long',
// //                         day: 'numeric',
// //                         hour: '2-digit',
// //                         minute: '2-digit'
// //                       })} • Seats: {booking.seatNumber?.join(', ') || 'Not assigned'}
// //                     </ActivityDate>
// //                     <DownloadButton onClick={() => handleDownloadTicket(booking)}>
// //                       <i className="fas fa-download"></i> Download Ticket
// //                     </DownloadButton>
// //                   </ActivityText>
// //                 </ActivityItem>
// //               ))
// //             )}
// //           </RecentActivity>
// //         </div>
// //       </DashboardContent>

// //       {/* Hidden ticket template for PDF generation */}
// //       <TicketContainer ref={targetRef}>
// //         {ticketRef.current && (
// //           <Ticket>
// //             <TicketHeader>
// //               <TicketTitle>Bus Ticket</TicketTitle>
// //               <p>Ticket ID: {ticketRef.current.ticketId}</p>
// //             </TicketHeader>
            
// //             <TicketBody>
// //               <div>
// //                 <TicketSection>
// //                   <SectionTitle>Journey Details</SectionTitle>
// //                   <TicketDetail>
// //                     <DetailLabel>Booking Date: </DetailLabel>
// //                     <DetailValue>
// //                       {new Date(ticketRef.current.bookingDate).toLocaleString()}
// //                     </DetailValue>
// //                   </TicketDetail>
// //                   <TicketDetail>
// //                     <DetailLabel>Status: </DetailLabel>
// //                     <DetailValue>
// //                       {ticketRef.current.status}
// //                     </DetailValue>
// //                   </TicketDetail>
// //                   <TicketDetail>
// //                     <DetailLabel>Payment: </DetailLabel>
// //                     <DetailValue>
// //                       {ticketRef.current.paymentStatus}
// //                     </DetailValue>
// //                   </TicketDetail>
// //                   <TicketDetail>
// //                     <DetailLabel>Seats: </DetailLabel>
// //                     <DetailValue>
// //                       {ticketRef.current.seatNumber?.join(', ') || 'Not assigned'}
// //                     </DetailValue>
// //                   </TicketDetail>
// //                 </TicketSection>
// //               </div>
              
// //               <div>
// //                 <TicketSection>
// //                   <SectionTitle>Passenger Details</SectionTitle>
// //                   <TicketDetail>
// //                     <DetailLabel>Name: </DetailLabel>
// //                     <DetailValue>{ticketRef.current.passengerName}</DetailValue>
// //                   </TicketDetail>
// //                   <TicketDetail>
// //                     <DetailLabel>Email: </DetailLabel>
// //                     <DetailValue>{ticketRef.current.passengerEmail}</DetailValue>
// //                   </TicketDetail>
// //                   <TicketDetail>
// //                     <DetailLabel>Phone: </DetailLabel>
// //                     <DetailValue>{ticketRef.current.passengerPhone || 'Not provided'}</DetailValue>
// //                   </TicketDetail>
// //                 </TicketSection>
// //               </div>
// //             </TicketBody>
            
// //             <TicketFooter>
// //               <p>Thank you for choosing our service. Please present this ticket when boarding.</p>
// //               <p>For any inquiries, contact support@busbudder.com</p>
// //             </TicketFooter>
// //           </Ticket>
// //         )}
// //       </TicketContainer>
// //     </DashboardContainer>
// //   );
// // };

// // export default PassengerDashboard;
// import React, { useState, useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { usePDF } from 'react-to-pdf';

// // ... all your styled components remain the same ...
// const DashboardContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

// // Header Styles
// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 30px;
//   padding-bottom: 20px;
//   border-bottom: 1px solid #e2e8f0;
// `;

// const Title = styled.h1`
//   color: #2d3748;
//   font-size: 28px;
//   margin: 0;
// `;

// const UserGreeting = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;
// `;

// const Avatar = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   background-color: #4c51bf;
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   font-weight: bold;
// `;

// const GreetingText = styled.div`
//   text-align: right;
// `;

// const WelcomeText = styled.p`
//   margin: 0;
//   color: #718096;
//   font-size: 14px;
// `;

// const UserName = styled.p`
//   margin: 0;
//   font-weight: 600;
//   color: #2d3748;
// `;

// // Dashboard Layout
// const DashboardContent = styled.div`
//   display: grid;
//   grid-template-columns: 300px 1fr;
//   gap: 30px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// // Profile Card Styles
// const ProfileCard = styled.div`
//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   padding: 25px;
// `;

// const CardTitle = styled.h2`
//   color: #2d3748;
//   font-size: 20px;
//   margin-top: 0;
//   margin-bottom: 20px;
//   padding-bottom: 15px;
//   border-bottom: 1px solid #e2e8f0;
// `;

// const ProfileDetail = styled.div`
//   margin-bottom: 20px;
// `;

// const DetailLabel = styled.p`
//   color: #718096;
//   font-size: 14px;
//   margin: 0 0 5px 0;
// `;

// const DetailValue = styled.p`
//   color: #2d3748;
//   font-size: 16px;
//   font-weight: 500;
//   margin: 0;
//   padding: 8px 0;
// `;

// const ProfileImage = styled.div`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   background-color: #edf2f7;
//   margin: 0 auto 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   position: relative;
// `;

// const InitialsAvatar = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #4c51bf;
//   color: white;
//   font-size: 48px;
//   font-weight: bold;
// `;

// // Stats Card Styles
// const StatsCard = styled.div`
//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   padding: 25px;
//   margin-bottom: 30px;
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const StatItem = styled.div`
//   text-align: center;
//   padding: 15px;
//   border-radius: 8px;
//   background-color: #f8fafc;
// `;

// const StatValue = styled.div`
//   font-size: 28px;
//   font-weight: 700;
//   color: #4c51bf;
//   margin-bottom: 5px;
// `;

// const StatLabel = styled.div`
//   font-size: 14px;
//   color: #718096;
// `;

// // Activity Styles
// const RecentActivity = styled.div`
//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   padding: 25px;
// `;

// const ActivityItem = styled.div`
//   padding: 15px 0;
//   border-bottom: 1px solid #e2e8f0;
//   display: flex;
//   align-items: center;
//   gap: 15px;

//   &:last-child {
//     border-bottom: none;
//   }
// `;

// const ActivityIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #edf2f7;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #4c51bf;
// `;

// const ActivityText = styled.div`
//   flex: 1;
// `;

// const ActivityTitle = styled.p`
//   margin: 0;
//   font-weight: 500;
//   color: #2d3748;
// `;

// const ActivityDate = styled.p`
//   margin: 5px 0 0;
//   font-size: 12px;
//   color: #718096;
// `;

// // Button Styles
// const Button = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 6px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: all 0.3s;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const PrimaryButton = styled(Button)`
//   background-color: #4c51bf;
//   color: white;
//   width: 100%;
//   margin-top: 20px;
// `;

// const DangerButton = styled(Button)`
//   background-color: #f56565;
//   color: white;
//   width: 100%;
//   margin-top: 10px;
// `;

// // Ticket Download Styles
// const DownloadButton = styled(Button)`
//   padding: 6px 12px;
//   background-color: #38a169;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   font-size: 14px;
//   margin-top: 10px;

//   &:hover {
//     background-color: #2f855a;
//   }
// `;

// // Ticket PDF Styles
// const TicketContainer = styled.div`
//   margin-top: 20px;
// `;

// const Ticket = styled.div`
//   width: 100%;
//   max-width: 500px;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 8px;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

// const TicketHeader = styled.div`
//   text-align: center;
//   margin-bottom: 20px;
//   padding-bottom: 15px;
//   border-bottom: 1px solid #e2e8f0;
// `;

// const TicketTitle = styled.h2`
//   color: #2d3748;
//   margin: 0;
// `;

// const TicketBody = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 20px;
//   margin-bottom: 20px;
// `;

// const TicketSection = styled.div`
//   margin-bottom: 15px;
// `;

// const SectionTitle = styled.h3`
//   color: #4a5568;
//   font-size: 16px;
//   margin: 0 0 10px 0;
// `;

// const TicketFooter = styled.div`
//   margin-top: 20px;
//   padding-top: 15px;
//   border-top: 1px solid #e2e8f0;
//   text-align: center;
//   font-size: 12px;
//   color: #718096;
// `;

// // Loading and Error Messages
// const LoadingMessage = styled.div`
//   text-align: center;
//   padding: 40px;
//   color: #4a5568;
// `;

// const ErrorAlert = styled.div`
//   color: #e53e3e;
//   text-align: center;
//   padding: 40px;
// `;


// const PassengerDashboard = () => {
//   const navigate = useNavigate();
//   const targetRef = useRef(null);
//   const { toPDF } = usePDF({ targetRef });

//   const [passenger, setPassenger] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [bookingsLoading, setBookingsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [bookingsError, setBookingsError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     bio: '',
//     profileImage: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [updateError, setUpdateError] = useState('');
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [showTicket, setShowTicket] = useState(false);
//   const [pdfReady, setPdfReady] = useState(false);

//   useEffect(() => {
//     const fetchPassengerDetails = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem('accessToken');
//         const response = await fetch('http://localhost:7000/api/v1/auth/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch passenger details');
//         }

//         const data = await response.json();
//         setPassenger(data.data);
//         setEditData({
//           firstName: data.data.firstName || '',
//           lastName: data.data.lastName || '',
//           phoneNumber: data.data.phoneNumber || '',
//           bio: data.data.bio || '',
//           profileImage: data.data.profileImage || ''
//         });
//         setImagePreview(data.data.profileImage || '');
//       } catch (err) {
//         console.error('Error fetching passenger details:', err);
//         setError('Failed to load passenger details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPassengerDetails();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!passenger?.email) return;
      
//       setBookingsLoading(true);
//       setBookingsError(null);
//       try {
//         const token = localStorage.getItem('accessToken');
//         const response = await fetch(
//           `http://localhost:7000/api/v1/bookings?email=${passenger.email}`, 
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error('Failed to fetch bookings');
//         }

//         const data = await response.json();
//         setBookings(data.data || []);
//       } catch (err) {
//         console.error('Error fetching bookings:', err);
//         setBookingsError('Failed to load bookings. Please try again.');
//       } finally {
//         setBookingsLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [passenger?.email]);

//   // New effect to handle PDF generation after ticket is shown
//   useEffect(() => {
//     if (showTicket && selectedTicket && pdfReady) {
//       // Use a longer timeout to ensure the component is fully rendered
//       const timer = setTimeout(() => {
//         if (targetRef.current) {
//           toPDF();
//         }
//       }, 500);
      
//       return () => clearTimeout(timer);
//     }
//   }, [showTicket, selectedTicket, pdfReady, toPDF]);

//   const getInitials = (firstName, lastName) => {
//     return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setEditData(prev => ({
//         ...prev,
//         profileImage: file
//       }));
//     }
//   };

//   const handleUpdateProfile = async () => {
//     setIsUpdating(true);
//     setUpdateError('');
    
//     try {
//       const token = localStorage.getItem('accessToken');
      
//       const formData = new FormData();
//       formData.append('firstName', editData.firstName);
//       formData.append('lastName', editData.lastName);
//       formData.append('phoneNumber', editData.phoneNumber);
//       formData.append('bio', editData.bio);
//       if (editData.profileImage instanceof File) {
//         formData.append('profileImage', editData.profileImage);
//       }

//       const response = await fetch('http://localhost:7000/api/v1/auth/update-profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       const data = await response.json();
//       setPassenger(data.data);
//       setIsEditing(false);
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setUpdateError(err.message || 'Failed to update profile. Please try again.');
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleDownloadTicket = (booking) => {
//     setSelectedTicket({
//       ...booking,
//       passengerName: `${passenger?.firstName} ${passenger?.lastName}`,
//       passengerEmail: passenger?.email,
//       passengerPhone: passenger?.phoneNumber
//     });
//     setShowTicket(true);
    
//     // Use setTimeout to ensure the ticket component is rendered before generating PDF
//     setTimeout(() => {
//       toPDF();
//     }, 100);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userName');
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <DashboardContainer>
//         <LoadingMessage>Loading passenger details...</LoadingMessage>
//       </DashboardContainer>
//     );
//   }

//   if (error) {
//     return (
//       <DashboardContainer>
//         <ErrorAlert>{error}</ErrorAlert>
//       </DashboardContainer>
//     );
//   }

//   // Calculate stats from bookings data
//   const stats = {
//     tripsCompleted: bookings.filter(b => b.status === 'completed').length,
//     upcomingTrips: bookings.filter(b => b.status === 'confirmed').length,
//     rewardsPoints: bookings.reduce((total, booking) => total + (booking.rewardsEarned || 0), 0)
//   };

//   return (
//     <DashboardContainer>
//       <Header>
//         <Title>Passenger Dashboard</Title>
//         <UserGreeting>
//           <GreetingText>
//             <WelcomeText>Welcome back</WelcomeText>
//             <UserName>{passenger?.firstName} {passenger?.lastName}</UserName>
//           </GreetingText>
//           <Avatar>{getInitials(passenger?.firstName, passenger?.lastName)}</Avatar>
//         </UserGreeting>
//       </Header>

//       <DashboardContent>
//         <div>
//           <ProfileCard>
//             <ProfileImage>
//               {passenger?.profileImage ? (
//                 <img 
//                   src={passenger.profileImage} 
//                   alt="Profile" 
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                 />
//               ) : (
//                 <InitialsAvatar>
//                   {getInitials(passenger?.firstName, passenger?.lastName)}
//                 </InitialsAvatar>
//               )}
//             </ProfileImage>
            
//             <CardTitle>Profile Details</CardTitle>
            
//             <ProfileDetail>
//               <DetailLabel>Full Name</DetailLabel>
//               <DetailValue>{passenger?.firstName} {passenger?.lastName}</DetailValue>
//             </ProfileDetail>
            
//             <ProfileDetail>
//               <DetailLabel>Email</DetailLabel>
//               <DetailValue>{passenger?.email}</DetailValue>
//             </ProfileDetail>
            
//             <ProfileDetail>
//               <DetailLabel>Phone Number</DetailLabel>
//               <DetailValue>{passenger?.phoneNumber || 'Not provided'}</DetailValue>
//             </ProfileDetail>
            
//             <ProfileDetail>
//               <DetailLabel>Account Type</DetailLabel>
//               <DetailValue style={{ 
//                 textTransform: 'capitalize',
//                 color: passenger?.role === 'admin' ? '#9f7aea' : '#4c51bf'
//               }}>
//                 {passenger?.role}
//               </DetailValue>
//             </ProfileDetail>
            
//             {passenger?.bio && (
//               <ProfileDetail>
//                 <DetailLabel>Bio</DetailLabel>
//                 <DetailValue>{passenger.bio}</DetailValue>
//               </ProfileDetail>
//             )}
            
//             <ProfileDetail>
//               <DetailLabel>Member Since</DetailLabel>
//               <DetailValue>
//                 {new Date(passenger?.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </DetailValue>
//             </ProfileDetail>
            
//             <PrimaryButton onClick={() => setIsEditing(true)}>
//               <i className="fas fa-edit"></i> Edit Profile
//             </PrimaryButton>
            
//             <DangerButton onClick={handleLogout}>
//               <i className="fas fa-sign-out-alt"></i> Logout
//             </DangerButton>
//           </ProfileCard>
//         </div>
        
//         <div>
//           <StatsCard>
//             <CardTitle>Your Travel Stats</CardTitle>
//             <StatsGrid>
//               <StatItem>
//                 <StatValue>{stats.tripsCompleted}</StatValue>
//                 <StatLabel>Trips Completed</StatLabel>
//               </StatItem>
//               <StatItem>
//                 <StatValue>{stats.upcomingTrips}</StatValue>
//                 <StatLabel>Upcoming Trips</StatLabel>
//               </StatItem>
//               <StatItem>
//                 <StatValue>{stats.rewardsPoints}</StatValue>
//                 <StatLabel>Reward Points</StatLabel>
//               </StatItem>
//             </StatsGrid>
//           </StatsCard>
          
//           <RecentActivity>
//             <CardTitle>Recent Bookings</CardTitle>
            
//             {bookingsLoading ? (
//               <LoadingMessage>Loading bookings...</LoadingMessage>
//             ) : bookingsError ? (
//               <ErrorAlert>{bookingsError}</ErrorAlert>
//             ) : bookings.length === 0 ? (
//               <LoadingMessage>No bookings found</LoadingMessage>
//             ) : (
//               bookings.slice(0, 3).map(booking => (
//                 <ActivityItem key={booking._id}>
//                   <ActivityIcon>
//                     <i className="fas fa-bus"></i>
//                   </ActivityIcon>
//                   <ActivityText>
//                     <ActivityTitle>
//                       Booking #{booking.ticketId} - {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
//                     </ActivityTitle>
//                     <ActivityDate>
//                       {new Date(booking.bookingDate).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })} • Seats: {booking.seatNumber?.join(', ') || 'Not assigned'}
//                     </ActivityDate>
//                     <DownloadButton onClick={() => handleDownloadTicket(booking)}>
//                       <i className="fas fa-download"></i> Download Ticket
//                     </DownloadButton>
//                   </ActivityText>
//                 </ActivityItem>
//               ))
//             )}
//           </RecentActivity>
//         </div>
//       </DashboardContent>

//       {/* The ticket component for PDF generation - Only shown when needed */}
//       {showTicket && selectedTicket && (
//         <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
//           <div ref={targetRef}>
//             <Ticket>
//               <TicketHeader>
//                 <TicketTitle>Bus Ticket</TicketTitle>
//                 <p>Ticket ID: {selectedTicket.ticketId}</p>
//               </TicketHeader>
              
//               <TicketBody>
//                 <div>
//                   <TicketSection>
//                     <SectionTitle>Journey Details</SectionTitle>
//                     <div>
//                       <span style={{ fontWeight: 500, color: '#4a5568' }}>Booking Date: </span>
//                       <span style={{ color: '#2d3748' }}>
//                         {new Date(selectedTicket.bookingDate).toLocaleString()}
//                       </span>
//                     </div>
//                     <div style={{ marginTop: '8px' }}>
//                       <span style={{ fontWeight: 500, color: '#4a5568' }}>Status: </span>
//                       <span style={{ color: '#2d3748' }}>
//                         {selectedTicket.status}
//                       </span>
//                     </div>
//                     <div style={{ marginTop: '8px' }}>
//                       <span style={{ fontWeight: 500, color: '#4a5568' }}>Payment: </span>
//                       <span style={{ color: '#2d3748' }}>
//                         {selectedTicket.paymentStatus}
//                       </span>
//                     </div>
//                     <div style={{ marginTop: '8px' }}>
//                       <span style={{ fontWeight: 500, color: '#4a5568' }}>Seats: </span>
//                       <span style={{ color: '#2d3748' }}>
//                         {selectedTicket.seatNumber?.join(', ') || 'Not assigned'}
//                       </span>
//                     </div>
//                   </TicketSection>
//                 </div>
                
//                 <div>
//                   <TicketSection>
//                     <SectionTitle>Passenger Details</SectionTitle>
//                     <div>
//                       <span style={{ fontWeight: 500, color: '#4a5568' }}>Name: </span>
//                       <span style={{ color: '#2d3748' }}>{selectedTicket.passengerName}</span>
//                     </div>
//                     <div style={{ marginTop: '8px' }}>
//                       <span style={{ fontWeight: 500, color: '#4a5568' }}>Email: </span>
//                       <span style={{ color: '#2d3748' }}>{selectedTicket.passengerEmail}</span>
//                     </div>
//                     <div style={{ marginTop: '8px' }}>
//                       <span style={{ fontWeight: 500, color: '#4a5568' }}>Phone: </span>
//                       <span style={{ color: '#2d3748' }}>{selectedTicket.passengerPhone || 'Not provided'}</span>
//                     </div>
//                   </TicketSection>
//                 </div>
//               </TicketBody>
              
//               <TicketFooter>
//                 <p>Thank you for choosing our service. Please present this ticket when boarding.</p>
//                 <p>For any inquiries, contact support@busbudder.com</p>
//               </TicketFooter>
//             </Ticket>
//           </div>
//         </div>
//       )}
//     </DashboardContainer>
//   );
// };

// export default PassengerDashboard;
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 28px;
  margin: 0;
`;

const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4c51bf;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const GreetingText = styled.div`
  text-align: right;
`;

const WelcomeText = styled.p`
  margin: 0;
  color: #718096;
  font-size: 14px;
`;

const UserName = styled.p`
  margin: 0;
  font-weight: 600;
  color: #2d3748;
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const CardTitle = styled.h2`
  color: #2d3748;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
`;

const ProfileDetail = styled.div`
  margin-bottom: 20px;
`;

const DetailLabel = styled.p`
  color: #718096;
  font-size: 14px;
  margin: 0 0 5px 0;
`;

const DetailValue = styled.p`
  color: #2d3748;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  padding: 8px 0;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #edf2f7;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const InitialsAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4c51bf;
  color: white;
  font-size: 48px;
  font-weight: bold;
`;

const StatsCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 30px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8fafc;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #4c51bf;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #718096;
`;

const RecentActivity = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const ActivityItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 15px;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #edf2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4c51bf;
`;

const ActivityText = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.p`
  margin: 0;
  font-weight: 500;
  color: #2d3748;
`;

const ActivityDate = styled.p`
  margin: 5px 0 0;
  font-size: 12px;
  color: #718096;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #4c51bf;
  color: white;
  width: 100%;
  margin-top: 20px;
`;

const DangerButton = styled(Button)`
  background-color: #f56565;
  color: white;
  width: 100%;
  margin-top: 10px;
`;

const DownloadButton = styled(Button)`
  padding: 6px 12px;
  background-color: #38a169;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background-color: #2f855a;
  }
`;

const TicketContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
`;

const Ticket = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const TicketHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
`;

const TicketTitle = styled.h2`
  color: #2d3748;
  margin: 0;
`;

const TicketBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const TicketSection = styled.div`
  margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
  color: #4a5568;
  font-size: 16px;
  margin: 0 0 10px 0;
`;

const TicketFooter = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  font-size: 12px;
  color: #718096;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #4a5568;
`;

const ErrorAlert = styled.div`
  color: #e53e3e;
  text-align: center;
  padding: 40px;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  color: #4a5568;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4c51bf;
    box-shadow: 0 0 0 1px #4c51bf;
  }
`;

const FormTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4c51bf;
    box-shadow: 0 0 0 1px #4c51bf;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SecondaryButton = styled(Button)`
  background-color: #e2e8f0;
  color: #4a5568;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const ticketRef = useRef(null);
  const { toPDF } = usePDF();
  
  const [passenger, setPassenger] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingsError, setBookingsError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: '',
    profileImage: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  // Fetch passenger details
  useEffect(() => {
    const fetchPassengerDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await fetch('http://localhost:7000/api/v1/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('accessToken');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch passenger details');
        }

        const data = await response.json();
        setPassenger(data.data);
        setEditData({
          firstName: data.data.firstName || '',
          lastName: data.data.lastName || '',
          phoneNumber: data.data.phoneNumber || '',
          bio: data.data.bio || '',
          profileImage: data.data.profileImage || ''
        });
        setImagePreview(data.data.profileImage || '');
      } catch (err) {
        console.error('Error fetching passenger details:', err);
        setError('Failed to load passenger details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPassengerDetails();
  }, [navigate]);

  // Fetch bookings when passenger data is available
  useEffect(() => {
    const fetchBookings = async () => {
      if (!passenger?.email) return;

      setBookingsLoading(true);
      setBookingsError(null);
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await fetch(
          `http://localhost:7000/api/v1/bookings?email=${passenger.email}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('accessToken');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data.data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setBookingsError('Failed to load bookings. Please try again.');
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [passenger?.email, navigate]);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setEditData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('firstName', editData.firstName);
      formData.append('lastName', editData.lastName);
      formData.append('phoneNumber', editData.phoneNumber);
      formData.append('bio', editData.bio);
      if (editData.profileImage instanceof File) {
        formData.append('profileImage', editData.profileImage);
      }

      const response = await fetch('http://localhost:7000/api/v1/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/login');
          return;
        }
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setPassenger(data.data);
      setIsEditing(false);
      // Show success message
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setUpdateError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewTicket = (booking) => {
    setSelectedTicket({
      ...booking,
      passengerName: `${passenger?.firstName} ${passenger?.lastName}`,
      passengerEmail: passenger?.email,
      passengerPhone: passenger?.phoneNumber
    });
    setShowTicketModal(true);
  };
  
  const handleDownloadTicket = () => {
    if (ticketRef.current) {
      try {
        toPDF(ticketRef, { 
          filename: `ticket-${selectedTicket.ticketId}.pdf`,
          page: { 
            margin: 10,
            format: 'letter',
            orientation: 'portrait'
          }
        });
      } catch (err) {
        console.error("Error generating PDF:", err);
        alert("Failed to generate PDF. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingMessage>Loading passenger details...</LoadingMessage>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <ErrorAlert>{error}</ErrorAlert>
      </DashboardContainer>
    );
  }

  const stats = {
    tripsCompleted: bookings.filter(b => b.status === 'completed').length,
    upcomingTrips: bookings.filter(b => b.status === 'confirmed').length,
    rewardsPoints: bookings.reduce((total, booking) => total + (booking.rewardsEarned || 0), 0)
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Passenger Dashboard</Title>
        <UserGreeting>
          <GreetingText>
            <WelcomeText>Welcome back</WelcomeText>
            <UserName>{passenger?.firstName} {passenger?.lastName}</UserName>
          </GreetingText>
          <Avatar>{getInitials(passenger?.firstName, passenger?.lastName)}</Avatar>
        </UserGreeting>
      </Header>

      <DashboardContent>
        <div>
          {isEditing ? (
            <ProfileCard>
              <CardTitle>Edit Profile</CardTitle>
              
              <EditForm onSubmit={handleUpdateProfile}>
                <ProfileImage>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <InitialsAvatar>
                      {getInitials(editData.firstName, editData.lastName)}
                    </InitialsAvatar>
                  )}
                </ProfileImage>
                
                <FormGroup>
                  <FormLabel htmlFor="profileImage">Profile Image</FormLabel>
                  <FormInput
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <FormInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleEditChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <FormInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleEditChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <FormInput
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={editData.phoneNumber}
                    onChange={handleEditChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <FormTextarea
                    id="bio"
                    name="bio"
                    value={editData.bio}
                    onChange={handleEditChange}
                    placeholder="Tell us a bit about yourself..."
                  />
                </FormGroup>
                
                {updateError && (
                  <ErrorAlert>{updateError}</ErrorAlert>
                )}
                
                <ButtonGroup>
                  <SecondaryButton 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton 
                    type="submit"
                    disabled={isUpdating}
                    style={{ margin: 0 }}
                  >
                    {isUpdating ? 'Updating...' : 'Save Changes'}
                  </PrimaryButton>
                </ButtonGroup>
              </EditForm>
            </ProfileCard>
          ) : (
            <ProfileCard>
              <ProfileImage>
                {passenger?.profileImage ? (
                  <img
                    src={passenger.profileImage}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <InitialsAvatar>
                    {getInitials(passenger?.firstName, passenger?.lastName)}
                  </InitialsAvatar>
                )}
              </ProfileImage>

              <CardTitle>Profile Details</CardTitle>

              <ProfileDetail>
                <DetailLabel>Full Name</DetailLabel>
                <DetailValue>{passenger?.firstName} {passenger?.lastName}</DetailValue>
              </ProfileDetail>

              <ProfileDetail>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{passenger?.email}</DetailValue>
              </ProfileDetail>

              <ProfileDetail>
                <DetailLabel>Phone Number</DetailLabel>
                <DetailValue>{passenger?.phoneNumber || 'Not provided'}</DetailValue>
              </ProfileDetail>

              <ProfileDetail>
                <DetailLabel>Account Type</DetailLabel>
                <DetailValue style={{
                  textTransform: 'capitalize',
                  color: passenger?.role === 'admin' ? '#9f7aea' : '#4c51bf'
                }}>
                  {passenger?.role}
                </DetailValue>
              </ProfileDetail>

              {passenger?.bio && (
                <ProfileDetail>
                  <DetailLabel>Bio</DetailLabel>
                  <DetailValue>{passenger.bio}</DetailValue>
                </ProfileDetail>
              )}

              <ProfileDetail>
                <DetailLabel>Member Since</DetailLabel>
                <DetailValue>
                  {new Date(passenger?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </DetailValue>
              </ProfileDetail>

              <PrimaryButton onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit"></i> Edit Profile
              </PrimaryButton>

              <DangerButton onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </DangerButton>
            </ProfileCard>
          )}
        </div>

        <div>
          <StatsCard>
            <CardTitle>Your Travel Stats</CardTitle>
            <StatsGrid>
              <StatItem>
                <StatValue>{stats.tripsCompleted}</StatValue>
                <StatLabel>Trips Completed</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{stats.upcomingTrips}</StatValue>
                <StatLabel>Upcoming Trips</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{stats.rewardsPoints}</StatValue>
                <StatLabel>Reward Points</StatLabel>
              </StatItem>
            </StatsGrid>
          </StatsCard>

          <RecentActivity>
            <CardTitle>Recent Bookings</CardTitle>

            {bookingsLoading ? (
              <LoadingMessage>Loading bookings...</LoadingMessage>
            ) : bookingsError ? (
              <ErrorAlert>{bookingsError}</ErrorAlert>
            ) : bookings.length === 0 ? (
              <LoadingMessage>No bookings found</LoadingMessage>
            ) : (
              bookings.slice(0, 5).map(booking => (
                <ActivityItem key={booking._id}>
                  <ActivityIcon>
                    <i className="fas fa-bus"></i>
                  </ActivityIcon>
                  <ActivityText>
                    <ActivityTitle>
                      Booking #{booking.ticketId} - {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
                    </ActivityTitle>
                    <ActivityDate>
                      {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })} • Seats: {booking.seatNumber?.join(', ') || 'Not assigned'}
                    </ActivityDate>
                    <DownloadButton onClick={() => handleViewTicket(booking)}>
                      <i className="fas fa-ticket-alt"></i> View Ticket
                    </DownloadButton>
                  </ActivityText>
                </ActivityItem>
              ))
            )}
          </RecentActivity>
        </div>
      </DashboardContent>

      {/* Ticket Modal */}
      {showTicketModal && selectedTicket && (
        <Modal>
          <ModalContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Ticket Preview</h2>
              <Button onClick={() => setShowTicketModal(false)} style={{ padding: '5px 10px', backgroundColor: '#e2e8f0' }}>
                <i className="fas fa-times"></i>
              </Button>
            </div>
            
            <TicketContainer ref={ticketRef}>
              <Ticket>
                <TicketHeader>
                  <TicketTitle>Bus Ticket</TicketTitle>
                  <p>Ticket ID: {selectedTicket.ticketId}</p>
                </TicketHeader>

                <TicketBody>
                  <div>
                    <TicketSection>
                      <SectionTitle>Journey Details</SectionTitle>
                      <div>
                        <span style={{ fontWeight: 500, color: '#4a5568' }}>Booking Date: </span>
                        <span style={{ color: '#2d3748' }}>
                          {new Date(selectedTicket.bookingDate).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <span style={{ fontWeight: 500, color: '#4a5568' }}>Status: </span>
                        <span style={{ color: '#2d3748' }}>
                          {selectedTicket.status}
                        </span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <span style={{ fontWeight: 500, color: '#4a5568' }}>Payment: </span>
                        <span style={{ color: '#2d3748' }}>
                          {selectedTicket.paymentStatus}
                        </span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <span style={{ fontWeight: 500, color: '#4a5568' }}>Seats: </span>
                        <span style={{ color: '#2d3748' }}>
                          {selectedTicket.seatNumber?.join(', ') || 'Not assigned'}
                        </span>
                      </div>
                    </TicketSection>
                  </div>

                  <div>
                    <TicketSection>
                      <SectionTitle>Passenger Details</SectionTitle>
                      <div>
                        <span style={{ fontWeight: 500, color: '#4a5568' }}>Name: </span>
                        <span style={{ color: '#2d3748' }}>{selectedTicket.passengerName}</span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <span style={{ fontWeight: 500, color: '#4a5568' }}>Email: </span>
                        <span style={{ color: '#2d3748' }}>{selectedTicket.passengerEmail}</span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <span style={{ fontWeight: 500, color: '#4a5568' }}>Phone: </span>
                        <span style={{ color: '#2d3748' }}>{selectedTicket.passengerPhone || 'Not provided'}</span>
                      </div>
                    </TicketSection>
                  </div>
                </TicketBody>

                <TicketFooter>
                  <p>Thank you for choosing our service. Please present this ticket when boarding.</p>
                  <p>For any inquiries, contact support@busbudder.com</p>
                </TicketFooter>
              </Ticket>
            </TicketContainer>
            
            <PrimaryButton onClick={handleDownloadTicket} style={{ marginTop: '20px' }}>
              <i className="fas fa-download"></i> Download as PDF
            </PrimaryButton>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default PassengerDashboard;