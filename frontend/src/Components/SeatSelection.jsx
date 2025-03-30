// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import styled from 'styled-components';
// // import { FaChair, FaArrowLeft, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

// // // Styled Components
// // const Container = styled.div`
// //   max-width: 800px;
// //   margin: 0 auto;
// //   padding: 20px;
// //   font-family: Arial, sans-serif;
// // `;

// // const Header = styled.div`
// //   display: flex;
// //   align-items: center;
// //   margin-bottom: 20px;
// // `;

// // const BackButton = styled.button`
// //   display: flex;
// //   align-items: center;
// //   background: none;
// //   border: none;
// //   cursor: pointer;
// //   font-size: 16px;
// //   color: #333;
// //   margin-right: 20px;
// //   padding: 5px 10px;
// //   border-radius: 4px;
// //   transition: background-color 0.2s;

// //   &:hover {
// //     background-color: #f0f0f0;
// //   }

// //   svg {
// //     margin-right: 5px;
// //   }
// // `;

// // const BusTitle = styled.h2`
// //   color: #333;
// //   margin: 0;
// // `;

// // const PriceInfo = styled.div`
// //   font-size: 18px;
// //   font-weight: bold;
// //   margin-bottom: 20px;
// //   color: #333;
// // `;

// // const SeatLegend = styled.div`
// //   display: flex;
// //   gap: 20px;
// //   margin-bottom: 20px;
// //   font-size: 14px;
// // `;

// // const LegendItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: 5px;
// // `;

// // const LegendColor = styled.div`
// //   width: 15px;
// //   height: 15px;
// //   border-radius: 3px;
// //   background-color: ${({ color }) => color};
// // `;

// // const LocationInfo = styled.div`
// //   display: flex;
// //   justify-content: space-between;
// //   margin-bottom: 20px;
// //   padding: 15px;
// //   background-color: #f5f5f5;
// //   border-radius: 8px;
// // `;

// // const LocationItem = styled.div`
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const LocationLabel = styled.span`
// //   font-size: 12px;
// //   color: #666;
// // `;

// // const LocationValue = styled.span`
// //   font-size: 16px;
// //   font-weight: bold;
// // `;

// // const SeatLayout = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: 10px;
// //   margin-top: 20px;
// // `;

// // const SeatRow = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   gap: 10px;
// // `;

// // const Seat = styled.div`
// //   width: 40px;
// //   height: 40px;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   background-color: ${({ status }) => 
// //     status === 'booked' ? '#e74c3c' : 
// //     status === 'selected' ? '#f39c12' : '#2ecc71'};
// //   color: white;
// //   border-radius: 5px;
// //   cursor: ${({ status }) => status === 'booked' ? 'not-allowed' : 'pointer'};
// //   font-weight: bold;
// //   position: relative;
// //   transition: transform 0.2s;

// //   &:hover {
// //     transform: ${({ status }) => status !== 'booked' ? 'scale(1.1)' : 'none'};
// //   }
// // `;

// // const SeatIcon = styled(FaChair)`
// //   font-size: 16px;
// //   margin-bottom: 2px;
// // `;

// // const SeatNumber = styled.span`
// //   font-size: 12px;
// // `;

// // const LoadingMessage = styled.div`
// //   text-align: center;
// //   padding: 40px;
// //   color: #7f8c8d;
// //   font-size: 18px;
// // `;

// // const ErrorMessage = styled.div`
// //   text-align: center;
// //   padding: 40px;
// //   color: #e74c3c;
// //   font-size: 18px;
// // `;

// // const SelectedSeatsSection = styled.div`
// //   margin-top: 30px;
// //   padding: 20px;
// //   background-color: #f5f5f5;
// //   border-radius: 8px;
// // `;

// // const SelectedSeatsList = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   gap: 10px;
// //   margin-top: 10px;
// // `;

// // const SeatBadge = styled.div`
// //   padding: 5px 10px;
// //   background-color: #4c51bf;
// //   color: white;
// //   border-radius: 20px;
// //   display: flex;
// //   align-items: center;
// //   gap: 5px;
// // `;

// // const BookButton = styled.button`
// //   width: 100%;
// //   padding: 12px;
// //   background-color: #4c51bf;
// //   color: white;
// //   border: none;
// //   border-radius: 8px;
// //   font-size: 16px;
// //   cursor: pointer;
// //   margin-top: 15px;
// //   transition: background-color 0.2s;

// //   &:hover {
// //     background-color: #3a3f99;
// //   }

// //   &:disabled {
// //     background-color: #bdc3c7;
// //     cursor: not-allowed;
// //   }
// // `;

// // // API base URL
// // const API_BASE_URL = 'http://localhost:3001';

// // function SeatSelectionPage() {
// //   const { busId } = useParams();
// //   const navigate = useNavigate();
// //   const [seats, setSeats] = useState([]);
// //   const [selectedSeats, setSelectedSeats] = useState([]);
// //   const [bus, setBus] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const fetchWithValidation = async (url) => {
// //     try {
// //       const response = await fetch(url);
      
// //       // First check if response is HTML
// //       const contentType = response.headers.get('content-type');
// //       if (contentType && contentType.includes('text/html')) {
// //         const text = await response.text();
// //         throw new Error('Server returned HTML instead of JSON. Is the API running?');
// //       }
  
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
  
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Fetch error:', error);
// //       throw error;
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);
        
// //         // 1. Verify the bus exists
// //         const busData = await fetchWithValidation(`${API_BASE_URL}/buses/${busId}`);
// //         setBus(busData);

// //         // 2. Fetch both booked and available seats
// //         const [bookedSeats, notbookedSeats] = await Promise.all([
// //           fetchWithValidation(`${API_BASE_URL}/booked?busId=${busId}`),
// //           fetchWithValidation(`${API_BASE_URL}/notbooked?busId=${busId}`)
// //         ]);

// //         // Combine seats with status
// //         const allSeats = [
// //           ...bookedSeats.map(seat => ({ ...seat, status: 'booked' })),
// //           ...notbookedSeats.map(seat => ({ ...seat, status: 'available' }))
// //         ];

// //         setSeats(allSeats);
// //       } catch (err) {
// //         setError(err.message);
// //         console.error('API Error:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [busId]);

// //   const handleSeatClick = (seat) => {
// //     if (seat.status === 'booked') return;

// //     setSelectedSeats(prev => 
// //       prev.some(s => s.id === seat.id)
// //         ? prev.filter(s => s.id !== seat.id)
// //         : [...prev, { ...seat, status: 'selected' }]
// //     );
// //   };

// //   const renderSeats = () => {
// //     // Group seats by row for better organization
// //     // Assuming seatNumber format is like 'A1', 'B2', etc. where the letter represents a row
// //     const groupedSeats = {};
    
// //     seats.forEach(seat => {
// //       // Extract row identifier (usually the letter part)
// //       const row = seat.seatNumber.charAt(0);
      
// //       if (!groupedSeats[row]) {
// //         groupedSeats[row] = [];
// //       }
      
// //       groupedSeats[row].push(seat);
// //     });

// //     // Sort each row by seat number
// //     Object.keys(groupedSeats).forEach(row => {
// //       groupedSeats[row].sort((a, b) => {
// //         const numA = parseInt(a.seatNumber.substring(1));
// //         const numB = parseInt(b.seatNumber.substring(1));
// //         return numA - numB;
// //       });
// //     });
    
// //     // Sort rows alphabetically
// //     return Object.keys(groupedSeats).sort().map(row => (
// //       <SeatRow key={`row-${row}`}>
// //         {groupedSeats[row].map(seat => {
// //           const isSelected = selectedSeats.some(s => s.id === seat.id);

// //           return (
// //             <Seat
// //               key={seat.id}
// //               status={isSelected ? 'selected' : seat.status}
// //               onClick={() => handleSeatClick(seat)}
// //             >
// //               <SeatIcon />
// //               <SeatNumber>{seat.seatNumber}</SeatNumber>
// //             </Seat>
// //           );
// //         })}
// //       </SeatRow>
// //     ));
// //   };

// //   if (loading) {
// //     return (
// //       <Container>
// //         <Header>
// //           <BackButton onClick={() => navigate(-1)}>
// //             <FaArrowLeft /> Back
// //           </BackButton>
// //         </Header>
// //         <LoadingMessage>Loading seat layout...</LoadingMessage>
// //       </Container>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Container>
// //         <Header>
// //           <BackButton onClick={() => navigate(-1)}>
// //             <FaArrowLeft /> Back
// //           </BackButton>
// //         </Header>
// //         <ErrorMessage>
// //           <FaExclamationTriangle style={{ marginRight: 10 }} />
// //           {error}
// //           {error.includes('not found') && (
// //             <div style={{ marginTop: 10, fontSize: 14 }}>
// //               Please check the bus ID and try again
// //             </div>
// //           )}
// //         </ErrorMessage>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <Container>
// //       <Header>
// //         <BackButton onClick={() => navigate(-1)}>
// //           <FaArrowLeft /> Back
// //         </BackButton>
// //         <BusTitle>{bus?.name || 'Select Seats'}</BusTitle>
// //       </Header>

// //       <PriceInfo>Normal: KES {bus?.price || '0'}</PriceInfo>

// //       <SeatLegend>
// //         <LegendItem>
// //           <LegendColor color="#2ecc71" />
// //           <span>Available Seat</span>
// //         </LegendItem>
// //         <LegendItem>
// //           <LegendColor color="#f39c12" />
// //           <span>Selected seats</span>
// //         </LegendItem>
// //         <LegendItem>
// //           <LegendColor color="#e74c3c" />
// //           <span>Booked seats</span>
// //         </LegendItem>
// //       </SeatLegend>

// //       <LocationInfo>
// //         <LocationItem>
// //           <LocationLabel>Pick Point:</LocationLabel>
// //           <LocationValue>KPCU Office</LocationValue>
// //         </LocationItem>
// //         <LocationItem>
// //           <LocationLabel>Drop Point:</LocationLabel>
// //           <LocationValue>Kisumu Office</LocationValue>
// //         </LocationItem>
// //       </LocationInfo>

// //       <SeatLayout>
// //         {renderSeats()}
// //       </SeatLayout>

// //       <SelectedSeatsSection>
// //         <h3>Selected Seats:</h3>
// //         {selectedSeats.length > 0 ? (
// //           <>
// //             <SelectedSeatsList>
// //               {selectedSeats.map(seat => (
// //                 <SeatBadge key={seat.id}>
// //                   <FaChair size={12} /> {seat.seatNumber}
// //                 </SeatBadge>
// //               ))}
// //             </SelectedSeatsList>
// //             <BookButton onClick={() => navigate('/payment', { 
// //               state: { 
// //                 selectedSeats: selectedSeats,
// //                 busDetails: bus 
// //               } 
// //             })}>
// //               Proceed to Payment
// //             </BookButton>
// //           </>
// //         ) : (
// //           <p>No seats selected</p>
// //         )}
// //       </SelectedSeatsSection>
// //     </Container>
// //   );
// // }

// // export default SeatSelectionPage;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaChair, FaArrowLeft, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

// // Styled Components
// const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
//   font-family: Arial, sans-serif;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const BackButton = styled.button`
//   display: flex;
//   align-items: center;
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 16px;
//   color: #333;
//   margin-right: 20px;
//   padding: 5px 10px;
//   border-radius: 4px;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #f0f0f0;
//   }

//   svg {
//     margin-right: 5px;
//   }
// `;

// const BusTitle = styled.h2`
//   color: #333;
//   margin: 0;
// `;

// const PriceInfo = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const SeatLegend = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 20px;
//   font-size: 14px;
// `;

// const LegendItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 5px;
// `;

// const LegendColor = styled.div`
//   width: 15px;
//   height: 15px;
//   border-radius: 3px;
//   background-color: ${({ color }) => color};
// `;

// const LocationInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 20px;
//   padding: 15px;
//   background-color: #f5f5f5;
//   border-radius: 8px;
// `;

// const LocationItem = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const LocationLabel = styled.span`
//   font-size: 12px;
//   color: #666;
// `;

// const LocationValue = styled.span`
//   font-size: 16px;
//   font-weight: bold;
// `;

// const SeatLayout = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const SeatRow = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10px;
// `;

// const Seat = styled.div`
//   width: 40px;
//   height: 40px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: ${({ status }) => 
//     status === 'booked' ? '#e74c3c' : 
//     status === 'selected' ? '#f39c12' : '#2ecc71'};
//   color: white;
//   border-radius: 5px;
//   cursor: ${({ status }) => status === 'booked' ? 'not-allowed' : 'pointer'};
//   font-weight: bold;
//   position: relative;
//   transition: transform 0.2s;

//   &:hover {
//     transform: ${({ status }) => status !== 'booked' ? 'scale(1.1)' : 'none'};
//   }
// `;

// const SeatIcon = styled(FaChair)`
//   font-size: 16px;
//   margin-bottom: 2px;
// `;

// const SeatNumber = styled.span`
//   font-size: 12px;
// `;

// const LoadingMessage = styled.div`
//   text-align: center;
//   padding: 40px;
//   color: #7f8c8d;
//   font-size: 18px;
// `;

// const ErrorMessage = styled.div`
//   text-align: center;
//   padding: 40px;
//   color: #e74c3c;
//   font-size: 18px;
// `;

// const SelectedSeatsSection = styled.div`
//   margin-top: 30px;
//   padding: 20px;
//   background-color: #f5f5f5;
//   border-radius: 8px;
// `;

// const SelectedSeatsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   margin-top: 10px;
// `;

// const SeatBadge = styled.div`
//   padding: 5px 10px;
//   background-color: #4c51bf;
//   color: white;
//   border-radius: 20px;
//   display: flex;
//   align-items: center;
//   gap: 5px;
// `;

// const BookButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   background-color: #4c51bf;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 16px;
//   cursor: pointer;
//   margin-top: 15px;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #3a3f99;
//   }

//   &:disabled {
//     background-color: #bdc3c7;
//     cursor: not-allowed;
//   }
// `;

// const TotalPriceDisplay = styled.div`
//   margin-top: 15px;
//   padding: 10px;
//   background-color: #eaeaea;
//   border-radius: 6px;
//   font-size: 16px;
//   font-weight: bold;
//   display: flex;
//   justify-content: space-between;
//   color: #333;
// `;

// // API base URL
// const API_BASE_URL = 'http://localhost:3001';

// function SeatSelectionPage() {
//   const { busId } = useParams();
//   const navigate = useNavigate();
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [bus, setBus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchWithValidation = async (url) => {
//     try {
//       const response = await fetch(url);
      
//       // First check if response is HTML
//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.includes('text/html')) {
//         const text = await response.text();
//         throw new Error('Server returned HTML instead of JSON. Is the API running?');
//       }
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       return await response.json();
//     } catch (error) {
//       console.error('Fetch error:', error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // 1. Verify the bus exists
//         const busData = await fetchWithValidation(`${API_BASE_URL}/buses/${busId}`);
//         setBus(busData);

//         // 2. Fetch both booked and available seats
//         const [bookedSeats, notbookedSeats] = await Promise.all([
//           fetchWithValidation(`${API_BASE_URL}/booked?busId=${busId}`),
//           fetchWithValidation(`${API_BASE_URL}/notbooked?busId=${busId}`)
//         ]);

//         // Combine seats with status
//         const allSeats = [
//           ...bookedSeats.map(seat => ({ ...seat, status: 'booked' })),
//           ...notbookedSeats.map(seat => ({ ...seat, status: 'available' }))
//         ];

//         setSeats(allSeats);
//       } catch (err) {
//         setError(err.message);
//         console.error('API Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [busId]);

//   const handleSeatClick = (seat) => {
//     if (seat.status === 'booked') return;

//     setSelectedSeats(prev => 
//       prev.some(s => s.id === seat.id)
//         ? prev.filter(s => s.id !== seat.id)
//         : [...prev, { ...seat, status: 'selected' }]
//     );
//   };

//   // Calculate total price based on number of selected seats and bus price
//   const calculateTotalPrice = () => {
//     if (!bus || !bus.price) return 0;
//     return selectedSeats.length * bus.price;
//   };

//   const renderSeats = () => {
//     // Group seats by row for better organization
//     // Assuming seatNumber format is like 'A1', 'B2', etc. where the letter represents a row
//     const groupedSeats = {};
    
//     seats.forEach(seat => {
//       // Extract row identifier (usually the letter part)
//       const row = seat.seatNumber.charAt(0);
      
//       if (!groupedSeats[row]) {
//         groupedSeats[row] = [];
//       }
      
//       groupedSeats[row].push(seat);
//     });

//     // Sort each row by seat number
//     Object.keys(groupedSeats).forEach(row => {
//       groupedSeats[row].sort((a, b) => {
//         const numA = parseInt(a.seatNumber.substring(1));
//         const numB = parseInt(b.seatNumber.substring(1));
//         return numA - numB;
//       });
//     });
    
//     // Sort rows alphabetically
//     return Object.keys(groupedSeats).sort().map(row => (
//       <SeatRow key={`row-${row}`}>
//         {groupedSeats[row].map(seat => {
//           const isSelected = selectedSeats.some(s => s.id === seat.id);

//           return (
//             <Seat
//               key={seat.id}
//               status={isSelected ? 'selected' : seat.status}
//               onClick={() => handleSeatClick(seat)}
//             >
//               <SeatIcon />
//               <SeatNumber>{seat.seatNumber}</SeatNumber>
//             </Seat>
//           );
//         })}
//       </SeatRow>
//     ));
//   };

//   if (loading) {
//     return (
//       <Container>
//         <Header>
//           <BackButton onClick={() => navigate(-1)}>
//             <FaArrowLeft /> Back
//           </BackButton>
//         </Header>
//         <LoadingMessage>Loading seat layout...</LoadingMessage>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container>
//         <Header>
//           <BackButton onClick={() => navigate(-1)}>
//             <FaArrowLeft /> Back
//           </BackButton>
//         </Header>
//         <ErrorMessage>
//           <FaExclamationTriangle style={{ marginRight: 10 }} />
//           {error}
//           {error.includes('not found') && (
//             <div style={{ marginTop: 10, fontSize: 14 }}>
//               Please check the bus ID and try again
//             </div>
//           )}
//         </ErrorMessage>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Header>
//         <BackButton onClick={() => navigate(-1)}>
//           <FaArrowLeft /> Back
//         </BackButton>
//         <BusTitle>{bus?.name || 'Select Seats'}</BusTitle>
//       </Header>

//       <PriceInfo>Normal: KES {bus?.price || '0'}</PriceInfo>

//       <SeatLegend>
//         <LegendItem>
//           <LegendColor color="#2ecc71" />
//           <span>Available Seat</span>
//         </LegendItem>
//         <LegendItem>
//           <LegendColor color="#f39c12" />
//           <span>Selected seats</span>
//         </LegendItem>
//         <LegendItem>
//           <LegendColor color="#e74c3c" />
//           <span>Booked seats</span>
//         </LegendItem>
//       </SeatLegend>

//       <LocationInfo>
//         <LocationItem>
//           <LocationLabel>Pick Point:</LocationLabel>
//           <LocationValue>KPCU Office</LocationValue>
//         </LocationItem>
//         <LocationItem>
//           <LocationLabel>Drop Point:</LocationLabel>
//           <LocationValue>Kisumu Office</LocationValue>
//         </LocationItem>
//       </LocationInfo>

//       <SeatLayout>
//         {renderSeats()}
//       </SeatLayout>

//       <SelectedSeatsSection>
//         <h3>Selected Seats:</h3>
//         {selectedSeats.length > 0 ? (
//           <>
//             <SelectedSeatsList>
//               {selectedSeats.map(seat => (
//                 <SeatBadge key={seat.id}>
//                   <FaChair size={12} /> {seat.seatNumber}
//                 </SeatBadge>
//               ))}
//             </SelectedSeatsList>
            
//             <TotalPriceDisplay>
//               <span>Total Price:</span>
//               <span>KES {calculateTotalPrice().toLocaleString()}</span>
//             </TotalPriceDisplay>
            
//             <BookButton onClick={() => navigate('/payment', { 
//               state: { 
//                 selectedSeats: selectedSeats,
//                 busDetails: bus,
//                 totalPrice: calculateTotalPrice()
//               } 
//             })}>
//               Proceed to Payment
//             </BookButton>
//           </>
//         ) : (
//           <p>No seats selected</p>
//         )}
//       </SelectedSeatsSection>
//     </Container>
//   );
// }

// export default SeatSelectionPage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaChair, FaArrowLeft, FaCheck, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  margin-right: 20px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    margin-right: 5px;
  }
`;

const BusTitle = styled.h2`
  color: #333;
  margin: 0;
`;

const PriceInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const SeatLegend = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
`;

const LocationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const LocationItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationLabel = styled.span`
  font-size: 12px;
  color: #666;
`;

const LocationValue = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const SeatLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const SeatRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Seat = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ status }) => 
    status === 'booked' ? '#e74c3c' : 
    status === 'selected' ? '#f39c12' : '#2ecc71'};
  color: white;
  border-radius: 5px;
  cursor: ${({ status }) => status === 'booked' ? 'not-allowed' : 'pointer'};
  font-weight: bold;
  position: relative;
  transition: transform 0.2s;

  &:hover {
    transform: ${({ status }) => status !== 'booked' ? 'scale(1.1)' : 'none'};
  }
`;

const SeatIcon = styled(FaChair)`
  font-size: 16px;
  margin-bottom: 2px;
`;

const SeatNumber = styled.span`
  font-size: 12px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #e74c3c;
  font-size: 18px;
`;

const SelectedSeatsSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const SelectedSeatsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const SeatBadge = styled.div`
  padding: 5px 10px;
  background-color: #4c51bf;
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BookButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a3f99;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const TotalPriceDisplay = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #eaeaea;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  color: #333;
`;

// Modal Styles
const ReviewModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #666;
`;

const ReviewContent = styled.div`
  margin-bottom: 20px;
`;

const ReviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    font-weight: bold;
    color: #666;
  }
`;

const GrandTotal = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:first-child {
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background-color: #eaeaea;
    }
  }

  &:last-child {
    background-color: #4c51bf;
    color: white;
    border: none;

    &:hover {
      background-color: #3a3f99;
    }
  }
`;

// API base URL
const API_BASE_URL = 'http://localhost:3001';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function SeatSelectionPage() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchWithValidation = async (url) => {
    try {
      const response = await fetch(url);
      
      // First check if response is HTML
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        const text = await response.text();
        throw new Error('Server returned HTML instead of JSON. Is the API running?');
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Verify the bus exists
        const busData = await fetchWithValidation(`${API_BASE_URL}/buses/${busId}`);
        setBus(busData);

        // 2. Fetch both booked and available seats
        const [bookedSeats, notbookedSeats] = await Promise.all([
          fetchWithValidation(`${API_BASE_URL}/booked?busId=${busId}`),
          fetchWithValidation(`${API_BASE_URL}/notbooked?busId=${busId}`)
        ]);

        // Combine seats with status
        const allSeats = [
          ...bookedSeats.map(seat => ({ ...seat, status: 'booked' })),
          ...notbookedSeats.map(seat => ({ ...seat, status: 'available' }))
        ];

        setSeats(allSeats);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [busId]);

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;

    setSelectedSeats(prev => 
      prev.some(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, { ...seat, status: 'selected' }]
    );
  };

  // Calculate total price based on number of selected seats and bus price
  const calculateTotalPrice = () => {
    if (!bus || !bus.price) return 0;
    return selectedSeats.length * bus.price;
  };

  const handleProceedToPayment = () => {
    setShowReviewModal(true);
  };

  const confirmPayment = () => {
    setShowReviewModal(false);
    navigate('/payment', { 
      state: { 
        selectedSeats: selectedSeats,
        busDetails: bus,
        totalPrice: calculateTotalPrice()
      } 
    });
  };

  const renderSeats = () => {
    // Group seats by row for better organization
    // Assuming seatNumber format is like 'A1', 'B2', etc. where the letter represents a row
    const groupedSeats = {};
    
    seats.forEach(seat => {
      // Extract row identifier (usually the letter part)
      const row = seat.seatNumber.charAt(0);
      
      if (!groupedSeats[row]) {
        groupedSeats[row] = [];
      }
      
      groupedSeats[row].push(seat);
    });

    // Sort each row by seat number
    Object.keys(groupedSeats).forEach(row => {
      groupedSeats[row].sort((a, b) => {
        const numA = parseInt(a.seatNumber.substring(1));
        const numB = parseInt(b.seatNumber.substring(1));
        return numA - numB;
      });
    });
    
    // Sort rows alphabetically
    return Object.keys(groupedSeats).sort().map(row => (
      <SeatRow key={`row-${row}`}>
        {groupedSeats[row].map(seat => {
          const isSelected = selectedSeats.some(s => s.id === seat.id);

          return (
            <Seat
              key={seat.id}
              status={isSelected ? 'selected' : seat.status}
              onClick={() => handleSeatClick(seat)}
            >
              <SeatIcon />
              <SeatNumber>{seat.seatNumber}</SeatNumber>
            </Seat>
          );
        })}
      </SeatRow>
    ));
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </BackButton>
        </Header>
        <LoadingMessage>Loading seat layout...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </BackButton>
        </Header>
        <ErrorMessage>
          <FaExclamationTriangle style={{ marginRight: 10 }} />
          {error}
          {error.includes('not found') && (
            <div style={{ marginTop: 10, fontSize: 14 }}>
              Please check the bus ID and try again
            </div>
          )}
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </BackButton>
        <BusTitle>{bus?.name || 'Select Seats'}</BusTitle>
      </Header>

      <PriceInfo>Normal: KES {bus?.price || '0'}</PriceInfo>

      <SeatLegend>
        <LegendItem>
          <LegendColor color="#2ecc71" />
          <span>Available Seat</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#f39c12" />
          <span>Selected seats</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#e74c3c" />
          <span>Booked seats</span>
        </LegendItem>
      </SeatLegend>

      <LocationInfo>
        <LocationItem>
          <LocationLabel>Pick Point:</LocationLabel>
          <LocationValue>KPCU Office</LocationValue>
        </LocationItem>
        <LocationItem>
          <LocationLabel>Drop Point:</LocationLabel>
          <LocationValue>Kisumu Office</LocationValue>
        </LocationItem>
      </LocationInfo>

      <SeatLayout>
        {renderSeats()}
      </SeatLayout>

      <SelectedSeatsSection>
        <h3>Selected Seats:</h3>
        {selectedSeats.length > 0 ? (
          <>
            <SelectedSeatsList>
              {selectedSeats.map(seat => (
                <SeatBadge key={seat.id}>
                  <FaChair size={12} /> {seat.seatNumber}
                </SeatBadge>
              ))}
            </SelectedSeatsList>
            
            <TotalPriceDisplay>
              <span>Total Price:</span>
              <span>KES {calculateTotalPrice().toLocaleString()}</span>
            </TotalPriceDisplay>
            
            <BookButton onClick={handleProceedToPayment} disabled={selectedSeats.length === 0}>
              Proceed to Payment
            </BookButton>
          </>
        ) : (
          <p>No seats selected</p>
        )}
      </SelectedSeatsSection>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onRequestClose={() => setShowReviewModal(false)}
        contentLabel="Trip Review"
      >
        <ModalHeader>
          <ModalTitle>Trip Review</ModalTitle>
          <CloseButton onClick={() => setShowReviewModal(false)}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ReviewContent>
          <h3>{bus?.name || 'Nairobi to Kisumu'} | {new Date().toLocaleDateString()}</h3>
          
          <ReviewTable>
            <thead>
              <tr>
                <th>Bus</th>
                <th>Depart</th>
                <th>Arrive</th>
                <th>Seats</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bus?.name || 'Nairobi - Kisumu'}</td>
                <td>KPCU Office</td>
                <td>Kisumu Office</td>
                <td>{selectedSeats.map(s => s.seatNumber).join(', ')}</td>
                <td>NORMAL: {selectedSeats.length} X {bus?.price || '1600'} = KES {calculateTotalPrice().toLocaleString()}</td>
              </tr>
            </tbody>
          </ReviewTable>

          <GrandTotal>
            <div>Grand Total</div>
            <div>KES {calculateTotalPrice().toLocaleString()}</div>
          </GrandTotal>
        </ReviewContent>

        <ModalActions>
          <ActionButton onClick={() => setShowReviewModal(false)}>
            Cancel
          </ActionButton>
          <ActionButton onClick={confirmPayment}>
            Confirm & Pay
          </ActionButton>
        </ModalActions>
      </ReviewModal>
    </Container>
  );
}

export default SeatSelectionPage;