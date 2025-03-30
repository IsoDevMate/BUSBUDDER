// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaChair, FaArrowLeft, FaMoneyBillWave } from 'react-icons/fa';

// // Styled Components
// const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 25px;
// `;

// const BackButton = styled.button`
//   display: flex;
//   align-items: center;
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 16px;
//   color: #2c3e50;
//   margin-right: 20px;
//   padding: 8px 12px;
//   border-radius: 6px;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: #f0f0f0;
//   }

//   svg {
//     margin-right: 8px;
//   }
// `;

// const Title = styled.h1`
//   color: #2c3e50;
//   margin: 0;
//   font-size: 1.8rem;
// `;

// const TripInfo = styled.div`
//   background-color: #f8f9fa;
//   border-radius: 10px;
//   padding: 20px;
//   margin-bottom: 25px;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.05);
// `;

// const InfoRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 15px;

//   &:last-child {
//     margin-bottom: 0;
//   }
// `;

// const InfoLabel = styled.span`
//   font-weight: 600;
//   color: #7f8c8d;
// `;

// const InfoValue = styled.span`
//   font-weight: 500;
//   color: #2c3e50;
// `;

// const SeatLegend = styled.div`
//   display: flex;
//   gap: 20px;
//   margin: 20px 0;
// `;

// const LegendItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-size: 0.9rem;
// `;

// const LegendColor = styled.div`
//   width: 18px;
//   height: 18px;
//   border-radius: 4px;
//   background-color: ${({ color }) => color};
// `;

// const SeatLayout = styled.div`
//   display: grid;
//   grid-template-columns: repeat(12, 1fr);
//   gap: 10px;
//   margin: 25px 0;
// `;

// const Seat = styled.div`
//   width: 45px;
//   height: 45px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: ${({ status }) =>
//     status === 'booked' ? '#e74c3c' :
//     status === 'selected' ? '#f39c12' : '#2ecc71'};
//   color: white;
//   border-radius: 4px;
//   cursor: ${({ status }) => status === 'booked' ? 'not-allowed' : 'pointer'};
//   font-weight: 600;
//   transition: all 0.2s ease;
//   position: relative;

//   &:hover {
//     transform: ${({ status }) => status !== 'booked' ? 'scale(1.1)' : 'none'};
//     box-shadow: ${({ status }) => status !== 'booked' ? '0 3px 10px rgba(0,0,0,0.2)' : 'none'};
//   }
// `;

// const SeatIcon = styled(FaChair)`
//   font-size: 16px;
//   margin-bottom: 3px;
// `;

// const SeatNumber = styled.span`
//   font-size: 11px;
// `;

// const SelectedSeatsSection = styled.div`
//   background-color: #f8f9fa;
//   border-radius: 10px;
//   padding: 20px;
//   margin-top: 30px;
// `;

// const SelectedSeatsHeader = styled.h3`
//   margin-top: 0;
//   margin-bottom: 15px;
//   color: #2c3e50;
// `;

// const SelectedSeatsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// const SeatBadge = styled.div`
//   padding: 6px 12px;
//   background-color: #4c51bf;
//   color: white;
//   border-radius: 20px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   font-size: 0.9rem;
// `;

// const TotalPrice = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 1.1rem;
//   font-weight: 600;
//   padding: 15px 0;
//   border-top: 1px solid #eee;
// `;

// const BookButton = styled.button`
//   width: 100%;
//   padding: 15px;
//   background-color: #4c51bf;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   margin-top: 15px;
//   transition: all 0.2s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;

//   &:hover {
//     background-color: #3a3f99;
//     transform: translateY(-2px);
//   }

//   &:disabled {
//     background-color: #bdc3c7;
//     cursor: not-allowed;
//     transform: none;
//   }
// `;

// const LoadingMessage = styled.div`
//   text-align: center;
//   padding: 40px;
//   color: #7f8c8d;
//   font-size: 1.1rem;
// `;

// const ErrorMessage = styled.div`
//   text-align: center;
//   padding: 40px;
//   color: #e74c3c;
//   font-size: 1.1rem;
// `;

// function SeatSelectionPage() {
//   const { scheduleId } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [schedule, setSchedule] = useState(null);
//   const [busLayout, setBusLayout] = useState([]);

//   useEffect(() => {
//     const initializePage = async () => {
//       try {
//         setLoading(true);

//         // First try to get schedule from navigation state
//         let scheduleData = state?.schedule;

//         // If not available in state, fetch from API
//         if (!scheduleData) {
//           const response = await fetch(`http://localhost:7000/api/schedules/${scheduleId}`);
//           const result = await response.json();
//           if (!result.success) throw new Error(result.message);
//           scheduleData = result.data;
//         }

//         setSchedule(scheduleData);

//         // Fetch booked seats
//         const seatsResponse = await fetch(`http://localhost:7000/api/schedules/${scheduleId}/seats`);
//         const seatsResult = await seatsResponse.json();
//         if (!seatsResult.success) throw new Error(seatsResult.message);

//         setBookedSeats(seatsResult.data?.bookedSeats || []);

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializePage();
//   }, [scheduleId, state]);

//   useEffect(() => {
//     if (schedule?.busId?.capacity) {
//       generateSeatLayout();
//     }
//   }, [schedule, bookedSeats]);

//   const generateSeatLayout = () => {
//     const capacity = schedule.busId.capacity;
//     const layout = [];

//     for (let seatNum = 1; seatNum <= capacity; seatNum++) {
//       const isBooked = bookedSeats.some(s => s.seatNumber === seatNum);

//       layout.push({
//         _id: `${scheduleId}-${seatNum}`,
//         seatNumber: seatNum,
//         status: isBooked ? 'booked' : 'available'
//       });
//     }

//     setBusLayout(layout);
//   };

//   const handleSeatClick = (seat) => {
//     if (seat.status === 'booked') return;

//     setSelectedSeats(prev =>
//       prev.some(s => s._id === seat._id)
//         ? prev.filter(s => s._id !== seat._id)
//         : [...prev, { ...seat, status: 'selected' }]
//     );
//   };

//   const calculateTotal = () => {
//     return selectedSeats.length * (schedule?.fare || 0);
//   };

//   const handleBookNow = () => {
//     navigate('/payment', {
//       state: {
//         schedule,          
//         selectedSeats,    
//         totalPrice: calculateTotal(),
//         scheduleId: scheduleId  
//       }
//     });
//   };

//   const renderSeats = () => {
//     return busLayout.map(seat => (
//       <Seat
//         key={seat._id}
//         status={selectedSeats.some(s => s._id === seat._id) ? 'selected' : seat.status}
//         onClick={() => handleSeatClick(seat)}
//       >
//         <SeatIcon />
//         <SeatNumber>{seat.seatNumber}</SeatNumber>
//       </Seat>
//     ));
//   };

//   if (loading) return <LoadingMessage>Loading seat information...</LoadingMessage>;
//   if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
//   if (!schedule) return <ErrorMessage>Schedule not found</ErrorMessage>;

//   return (
//     <Container>
//       <Header>
//         <BackButton onClick={() => navigate(-1)}>
//           <FaArrowLeft /> Back
//         </BackButton>
//         <Title>Select Your Seats</Title>
//       </Header>

//       <TripInfo>
//         <InfoRow>
//           <InfoLabel>Bus:</InfoLabel>
//           <InfoValue>{schedule.busId?.busNumber || 'N/A'}</InfoValue>
//         </InfoRow>
//         <InfoRow>
//           <InfoLabel>Route:</InfoLabel>
//           <InfoValue>
//             {schedule.routeId?.startLocation} → {schedule.routeId?.endLocation}
//           </InfoValue>
//         </InfoRow>
//         <InfoRow>
//           <InfoLabel>Departure:</InfoLabel>
//           <InfoValue>
//             {new Date(schedule.departureTime).toLocaleString()}
//           </InfoValue>
//         </InfoRow>
//       </TripInfo>

//       <SeatLegend>
//         <LegendItem>
//           <LegendColor color="#2ecc71" /> Available
//         </LegendItem>
//         <LegendItem>
//           <LegendColor color="#f39c12" /> Selected
//         </LegendItem>
//         <LegendItem>
//           <LegendColor color="#e74c3c" /> Booked
//         </LegendItem>
//       </SeatLegend>

//       <SeatLayout>
//         {renderSeats()}
//       </SeatLayout>

//       {selectedSeats.length > 0 && (
//         <SelectedSeatsSection>
//           <SelectedSeatsHeader>Your Seats</SelectedSeatsHeader>
//           <SelectedSeatsList>
//             {selectedSeats.map(seat => (
//               <SeatBadge key={seat._id}>
//                 <FaChair /> {seat.seatNumber}
//               </SeatBadge>
//             ))}
//           </SelectedSeatsList>
//           <TotalPrice>
//             <span>Total:</span>
//             <span>KES {calculateTotal().toLocaleString()}</span>
//           </TotalPrice>
//           <BookButton onClick={handleBookNow}>
//             <FaMoneyBillWave /> Continue to Payment
//           </BookButton>
//         </SelectedSeatsSection>
//       )}
//     </Container>
//   );
// }

// export default SeatSelectionPage;

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaChair, FaArrowLeft, FaMoneyBillWave, FaTimes } from 'react-icons/fa';

// Styled Components (same as before)
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #2c3e50;
  margin-right: 20px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    margin-right: 8px;
  }
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 1.8rem;
`;

const TripInfoCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const InfoValue = styled.span`
  font-weight: 500;
  color: #2c3e50;
  font-size: 1rem;
`;

const SeatSelectionContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
`;

const SeatLegend = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
`;

const LegendColor = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  margin: 25px 0;
`;

const Seat = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ status }) =>
    status === 'booked' ? '#e74c3c' :
    status === 'selected' ? '#f39c12' : '#2ecc71'};
  color: white;
  border-radius: 6px;
  cursor: ${({ status }) => status === 'booked' ? 'not-allowed' : 'pointer'};
  font-weight: 600;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: ${({ status }) => status !== 'booked' ? 'scale(1.1)' : 'none'};
    box-shadow: ${({ status }) => status !== 'booked' ? '0 3px 10px rgba(0,0,0,0.2)' : 'none'};
  }
`;

const SeatIcon = styled(FaChair)`
  font-size: 18px;
  margin-bottom: 3px;
`;

const SeatNumber = styled.span`
  font-size: 12px;
`;

const SelectedSeatsSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
`;

const SectionHeader = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ClearSelection = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SelectedSeatsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const SeatBadge = styled.div`
  padding: 8px 12px;
  background-color: #4c51bf;
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
`;

const PriceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 15px 0;
  border-top: 1px solid #eee;
`;

const BookButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #3a3f99;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #e74c3c;
  font-size: 1.1rem;
`;

function SeatSelectionPage() {
  const { scheduleId } = useParams();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);

  useEffect(() => {
    const fetchScheduleAndGenerateSeats = async () => {
      try {
        setLoading(true);
        
        // Get schedule data either from navigation state or API
        let scheduleData = locationState?.schedule;
        if (!scheduleData) {
          const response = await fetch(`http://localhost:7000/api/schedules/${scheduleId}`);
          const result = await response.json();
          if (!result.success) throw new Error(result.message);
          scheduleData = result.data;
        }

        setSchedule(scheduleData);

        // Generate seat layout based on capacity and available seats
        if (scheduleData.busId?.capacity && scheduleData.availableSeats !== undefined) {
          const totalSeats = scheduleData.busId.capacity;
          const availableSeats = scheduleData.availableSeats;
          const bookedSeatsCount = totalSeats - availableSeats;

          const layout = [];
          for (let seatNum = 1; seatNum <= totalSeats; seatNum++) {
            layout.push({
              _id: `${scheduleId}-${seatNum}`, // Maintain original _id format
              seatNumber: seatNum, // Maintain original property name
              status: seatNum <= bookedSeatsCount ? 'booked' : 'available'
            });
          }

          setSeatLayout(layout);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleAndGenerateSeats();
  }, [scheduleId, locationState]);

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;

    setSelectedSeats(prev => {
      const isAlreadySelected = prev.some(s => s._id === seat._id);
      if (isAlreadySelected) {
        return prev.filter(s => s._id !== seat._id);
      } else {
        return [...prev, { 
          ...seat, 
          status: 'selected',
          // Maintain exact same structure as original
          _id: seat._id,
          seatNumber: seat.seatNumber
        }];
      }
    });
  };

  const clearSelection = () => {
    setSelectedSeats([]);
  };

  const calculateTotal = () => {
    return selectedSeats.length * (schedule?.fare || 0);
  };

  const handleBookNow = () => {
    // Maintain EXACT same structure as original when navigating to payment
    navigate('/payment', {
      state: {
        schedule,          // Same as original
        selectedSeats,     // Same array structure with _id and seatNumber
        totalPrice: calculateTotal(),
        scheduleId: scheduleId  // Same as original
      }
    });
  };

  const renderSeats = () => {
    return seatLayout.map(seat => (
      <Seat
        key={seat._id}
        status={selectedSeats.some(s => s._id === seat._id) ? 'selected' : seat.status}
        onClick={() => handleSeatClick(seat)}
      >
        <SeatIcon />
        <SeatNumber>{seat.seatNumber}</SeatNumber>
      </Seat>
    ));
  };

  if (loading) return <LoadingMessage>Loading seat information...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!schedule) return <ErrorMessage>Schedule not found</ErrorMessage>;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </BackButton>
        <Title>Select Your Seats</Title>
      </Header>

      <TripInfoCard>
        <InfoItem>
          <InfoLabel>Bus Number</InfoLabel>
          <InfoValue>{schedule.busId?.busNumber || 'N/A'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Route</InfoLabel>
          <InfoValue>
            {schedule.routeId?.startLocation} → {schedule.routeId?.endLocation}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Departure</InfoLabel>
          <InfoValue>
            {new Date(schedule.departureTime).toLocaleString()}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Fare per Seat</InfoLabel>
          <InfoValue>KES {schedule.fare?.toLocaleString() || '0'}</InfoValue>
        </InfoItem>
      </TripInfoCard>

      <SeatSelectionContainer>
        <SeatLegend>
          <LegendItem>
            <LegendColor color="#2ecc71" /> Available
          </LegendItem>
          <LegendItem>
            <LegendColor color="#f39c12" /> Selected
          </LegendItem>
          <LegendItem>
            <LegendColor color="#e74c3c" /> Booked
          </LegendItem>
        </SeatLegend>

        <SeatGrid>
          {renderSeats()}
        </SeatGrid>
      </SeatSelectionContainer>

      {selectedSeats.length > 0 && (
        <SelectedSeatsSection>
          <SectionHeader>
            Selected Seats
            <ClearSelection onClick={clearSelection}>
              <FaTimes /> Clear
            </ClearSelection>
          </SectionHeader>
          <SelectedSeatsList>
            {selectedSeats.map(seat => (
              <SeatBadge key={seat._id}>
                <FaChair /> {seat.seatNumber}
              </SeatBadge>
            ))}
          </SelectedSeatsList>
          <PriceSummary>
            <span>Total Price:</span>
            <span>KES {calculateTotal().toLocaleString()}</span>
          </PriceSummary>
          <BookButton onClick={handleBookNow}>
            <FaMoneyBillWave /> Enter Your Details
          </BookButton>
        </SelectedSeatsSection>
      )}
    </Container>
  );
}

export default SeatSelectionPage;