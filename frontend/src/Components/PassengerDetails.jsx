// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaArrowLeft } from 'react-icons/fa';

// // Styled Components (unchanged)
// const Container = styled.div`
//   max-width: 600px;
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

// const PageTitle = styled.h1`
//   color: #333;
//   margin: 0;
//   font-size: 24px;
// `;

// const Section = styled.div`
//   margin-bottom: 30px;
// `;

// const SectionTitle = styled.h2`
//   font-size: 18px;
//   color: #333;
//   margin-bottom: 15px;
//   padding-bottom: 5px;
//   border-bottom: 1px solid #eee;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-size: 14px;
//   color: #666;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 16px;
//   box-sizing: border-box;

//   &:focus {
//     outline: none;
//     border-color: #4c51bf;
//   }
// `;

// const SeatDisplay = styled.div`
//   background-color: #f0f8ff;
//   border: 1px solid #b0c4de;
//   border-radius: 4px;
//   padding: 10px;
//   font-size: 16px;
//   color: #333;
//   margin-bottom: 15px;
// `;

// const ProceedButton = styled.button`
//   padding: 12px 30px;
//   background-color: #4c51bf;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #3a3f99;
//   }

//   &:disabled {
//     background-color: #bdc3c7;
//     cursor: not-allowed;
//   }
// `;

// function PassengerDetailsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedSeats = [], schedule, totalPrice, scheduleId } = location.state || {};

//   const initialPassenger = {
//     userName: '',
//     userEmail: '',
//     userPhone: '',
//     scheduleId: scheduleId || '',
//     seatNumber: selectedSeats.map(seat => seat.seatNumber),
//   };

//   const [passenger, setPassenger] = useState(initialPassenger);
//   const [errors, setErrors] = useState({});

//   const handlePassengerChange = (field, value) => {
//     setPassenger(prevPassenger => ({
//       ...prevPassenger,
//       [field]: value
//     }));

//     // Clear error for this field if it exists
//     if (errors[field]) {
//       const newErrors = { ...errors };
//       delete newErrors[field];
//       setErrors(newErrors);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     if (!passenger.userName) {
//       newErrors.userName = 'Name is required';
//       isValid = false;
//     }
//     if (!passenger.userEmail) {
//       newErrors.userEmail = 'Email is required';
//       isValid = false;
//     }
//     if (!passenger.userPhone) {
//       newErrors.userPhone = 'Phone number is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleProceedToPayment = async () => {
//     if (validateForm()) {
//       try {
//         const response = await fetch('http://localhost:7000/api/v1/bookings', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(passenger),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log('Booking successful:', data);
//           navigate('/payment', {
//             state: {
//               passenger,
//               selectedSeats,
//               schedule,
//               totalPrice,
//               scheduleId
//             }
//           });
//         } else {
//           console.error('Booking failed:', await response.text());
//         }
//       } catch (error) {
//         console.error('Booking failed:', error);
//       }
//     }
//   };

//   return (
//     <Container>
//       <Header>
//         <BackButton onClick={() => navigate(-1)}>
//           <FaArrowLeft /> Back
//         </BackButton>
//         <PageTitle>Passenger Details</PageTitle>
//       </Header>

//       <Section>
//         <SectionTitle>Passenger Information</SectionTitle>

//         <SeatDisplay>
//           Seat: {passenger.seatNumber.join(', ')}
//         </SeatDisplay>

//         <FormGroup>
//           <Label>Email</Label>
//           <Input
//             type="email"
//             value={passenger.userEmail}
//             onChange={(e) => handlePassengerChange('userEmail', e.target.value)}
//             required
//           />
//           {errors.userEmail && (
//             <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
//               {errors.userEmail}
//             </div>
//           )}
//         </FormGroup>

//         <FormGroup>
//           <Label>Name</Label>
//           <Input
//             type="text"
//             value={passenger.userName}
//             onChange={(e) => handlePassengerChange('userName', e.target.value)}
//             required
//           />
//           {errors.userName && (
//             <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
//               {errors.userName}
//             </div>
//           )}
//         </FormGroup>

//         <FormGroup>
//           <Label>Phone Number</Label>
//           <Input
//             type="tel"
//             value={passenger.userPhone}
//             onChange={(e) => handlePassengerChange('userPhone', e.target.value)}
//             required
//           />
//           {errors.userPhone && (
//             <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
//               {errors.userPhone}
//             </div>
//           )}
//         </FormGroup>
//       </Section>

//       <ProceedButton onClick={handleProceedToPayment}>
//         PROCEED TO PAY
//       </ProceedButton>
//     </Container>
//   );
// }

// export default PassengerDetailsPage;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

// Styled Components (unchanged until Modal)
const Container = styled.div`
  max-width: 600px;
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

const PageTitle = styled.h1`
  color: #333;
  margin: 0;
  font-size: 24px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4c51bf;
  }
`;

const SeatDisplay = styled.div`
  background-color: #f0f8ff;
  border: 1px solid #b0c4de;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
`;

const ProceedButton = styled.button`
  padding: 12px 30px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a3f99;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

// New Modal Styles
const ModalOverlay = styled.div`
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
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  color: #4c51bf;
`;

const ModalDetail = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const ModalLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const ModalValue = styled.span`
  color: #666;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a3f99;
  }
`;

function PassengerDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats = [], schedule, totalPrice, scheduleId } = location.state || {};

  const initialPassenger = {
    userName: '',
    userEmail: '',
    userPhone: '',
    scheduleId: scheduleId || '',
    seatNumber: selectedSeats.map(seat => seat.seatNumber),
  };

  const [passenger, setPassenger] = useState(initialPassenger);
  const [errors, setErrors] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handlePassengerChange = (field, value) => {
    setPassenger(prevPassenger => ({
      ...prevPassenger,
      [field]: value
    }));

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!passenger.userName) {
      newErrors.userName = 'Name is required';
      isValid = false;
    }
    if (!passenger.userEmail) {
      newErrors.userEmail = 'Email is required';
      isValid = false;
    }
    if (!passenger.userPhone) {
      newErrors.userPhone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleProceedToPayment = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('https://busbudder.onrender.com/api/v1/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(passenger),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Booking successful:', data);
          setBookingData(data);
          setShowConfirmationModal(true);
        } else {
          console.error('Booking failed:', await response.text());
        }
      } catch (error) {
        console.error('Booking failed:', error);
      }
    }
  };

  const handleContinueToPayment = () => {
    setShowConfirmationModal(false);
    navigate('/payment', {
      state: {
        passenger,
        selectedSeats,
        schedule,
        totalPrice,
        scheduleId,
        bookingData
      }
    });
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </BackButton>
        <PageTitle>Passenger Details</PageTitle>
      </Header>

      <Section>
        <SectionTitle>Passenger Information</SectionTitle>

        <SeatDisplay>
          Seat: {passenger.seatNumber.join(', ')}
        </SeatDisplay>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={passenger.userEmail}
            onChange={(e) => handlePassengerChange('userEmail', e.target.value)}
            required
          />
          {errors.userEmail && (
            <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
              {errors.userEmail}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={passenger.userName}
            onChange={(e) => handlePassengerChange('userName', e.target.value)}
            required
          />
          {errors.userName && (
            <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
              {errors.userName}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={passenger.userPhone}
            onChange={(e) => handlePassengerChange('userPhone', e.target.value)}
            required
          />
          {errors.userPhone && (
            <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
              {errors.userPhone}
            </div>
          )}
        </FormGroup>
      </Section>

      <ProceedButton onClick={handleProceedToPayment}>
        PREVIEW DETAILS
      </ProceedButton>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Booking Confirmation</ModalTitle>
            
            <ModalDetail>
              <ModalLabel>Passenger Name:</ModalLabel>
              <ModalValue>{passenger.userName}</ModalValue>
            </ModalDetail>
            <ModalDetail>
              <ModalLabel>Passenger Email:</ModalLabel>
              <ModalValue>{passenger.userEmail}</ModalValue>
            </ModalDetail>

            <ModalDetail>
              <ModalLabel>Passenger Phone Number:</ModalLabel>
              <ModalValue>{passenger.userPhone}</ModalValue>
            </ModalDetail>
            
            <ModalDetail>
              <ModalLabel>Seat Numbers:</ModalLabel>
              <ModalValue>{passenger.seatNumber.join(', ')}</ModalValue>
            </ModalDetail>
            
            <ModalDetail>
              <ModalLabel>Departure:</ModalLabel>
              <ModalValue>
                {schedule?.departureTime
                  ? new Date(schedule.departureTime).toLocaleString()
                  : "N/A"}
              </ModalValue>
            </ModalDetail>
            <ModalDetail>
              <ModalLabel>Arrival:</ModalLabel>
              <ModalValue>
                {schedule?.arrivalTime
                  ? new Date(schedule.arrivalTime).toLocaleString()
                  : "N/A"}
              </ModalValue>
            </ModalDetail>
            
            <ModalDetail>
              <ModalLabel>Total Price:</ModalLabel>
              <ModalValue>KSH{totalPrice}</ModalValue>
            </ModalDetail>

            <ModalButton onClick={handleContinueToPayment}>
              CONTINUE TO PAYMENT
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default PassengerDetailsPage;