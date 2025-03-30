import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaCheckCircle, FaSpinner } from 'react-icons/fa';

// Styled Components
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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
`;

const PaymentSummary = styled.div`
  margin-bottom: 25px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #eee;
  
  &:last-child {
    border-bottom: none;
    font-weight: bold;
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
`;

const Label = styled.span`
  color: #666;
`;

const Value = styled.span`
  color: #333;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
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

const PaymentButton = styled.button`
  padding: 15px 30px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #3a3f99;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const MpesaInstructions = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid #4c51bf;
  padding: 15px;
  margin: 20px 0;
  font-size: 14px;
  color: #333;
`;

const StatusMessage = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 15px;
  border-radius: 4px;
  background-color: ${props => props.success ? '#d4edda' : props.error ? '#f8d7da' : '#e2e3e5'};
  color: ${props => props.success ? '#155724' : props.error ? '#721c24' : '#383d41'};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: 24px;
  margin-bottom: 10px;
  
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SuccessIcon = styled(FaCheckCircle)`
  font-size: 24px;
  margin-bottom: 10px;
  color: #28a745;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
`;

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { passenger, selectedSeats, schedule, totalPrice, bookingData } = location.state || {};
  
  const [reservation, setReservation] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('initial'); // initial, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(passenger?.userPhone || '');
  const [phoneError, setPhoneError] = useState('');
  
  useEffect(() => {
    // Fetch reservation details if bookingData is available
    const fetchReservation = async () => {
      if (bookingData && bookingData.data && bookingData.data._id) {
        try {
          const response = await fetch(`https://busbudder.onrender.com/api/v1/reservations/${bookingData.data._id}`);
          if (response.ok) {
            const data = await response.json();
            setReservation(data.data);
          } else {
            console.error('Failed to fetch reservation details');
          }
        } catch (error) {
          console.error('Error fetching reservation details:', error);
        }
      }
    };
    
    fetchReservation();
  }, [bookingData]);
  
  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneError('Phone number is required');
      return false;
    }
    
    // Basic validation for Kenyan phone numbers - more permissive to avoid false negatives
    const kenyanPhoneRegex = /^(0|\+254|254)?\d{9,10}$/;
    if (!kenyanPhoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid Kenyan phone number');
      return false;
    }
    
    setPhoneError('');
    return true;
  };
  
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    if (phoneError) setPhoneError('');
  };
  
  const handlePayment = async () => {
    if (!validatePhoneNumber()) return;
    
    // Even if reservation is not available, still attempt to process payment
    // using available data (bookingData) to avoid blocking the user
    const reservationId = reservation?._id || bookingData?.data?._id || "pending";
    
    setPaymentStatus('loading');
    
    try {
      // Prepare the payload for the STK push using the correct format
      const stkPayload = {
        reservationId: reservationId,
        amount: totalPrice || 1,
        paymentMethod: "mpesa",
        phoneNumber: phoneNumber
      };
      
      console.log("Sending payment request:", stkPayload);
      
      // Call the M-Pesa STK push API with the correct endpoint
      const response = await fetch('https://busbudder.onrender.com/api/v1/payments/stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stkPayload),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('M-Pesa STK push successful:', data);
        setPaymentStatus('success');
      } else {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Failed to initiate M-Pesa payment' };
        }
        console.error('M-Pesa STK push failed:', errorData);
        setPaymentStatus('error');
        setErrorMessage(errorData.message || 'Failed to initiate M-Pesa payment');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('error');
      setErrorMessage('An error occurred while processing your payment. Please try again.');
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </BackButton>
        <PageTitle>Payment</PageTitle>
      </Header>
      
      {/* <Section>
        <SectionTitle>Booking Summary</SectionTitle>
        <PaymentSummary>
          <SummaryItem>
            <Label>Passenger:</Label>
            <Value>{passenger?.userName || 'N/A'}</Value>
          </SummaryItem>
          <SummaryItem>
            <Label>Seat(s):</Label>
            <Value>{passenger?.seatNumber?.join(', ') || 'N/A'}</Value>
          </SummaryItem>
          <SummaryItem>
            <Label>From:</Label>
            <Value>{schedule?.origin || 'N/A'}</Value>
          </SummaryItem>
          <SummaryItem>
            <Label>To:</Label>
            <Value>{schedule?.destination || 'N/A'}</Value>
          </SummaryItem>
          <SummaryItem>
            <Label>Departure:</Label>
            <Value>{formatDate(schedule?.departureTime)}</Value>
          </SummaryItem>
          <SummaryItem>
            <Label>Arrival:</Label>
            <Value>{formatDate(schedule?.arrivalTime)}</Value>
          </SummaryItem>
          <SummaryItem>
            <Label>Total Amount:</Label>
            <Value bold>KSH {totalPrice || 0}</Value>
          </SummaryItem>
        </PaymentSummary>
      </Section> */}
      
      <Section>
        <SectionTitle>M-Pesa Payment</SectionTitle>
        <SummaryItem>
            <Label>Total Amount:</Label>
            <Value bold>KSH {totalPrice || 0}</Value>
          </SummaryItem>
        
        <MpesaInstructions>
          <p><strong>Instructions:</strong></p>
          <p>1. Enter or confirm your phone number below</p>
          <p>2. Click the "Pay with M-Pesa" button</p>
          <p>3. You will receive an STK push notification on your phone</p>
          <p>4. Enter your M-Pesa PIN to complete the payment</p>
          <p>5. Wait for confirmation</p>
        </MpesaInstructions>
        
        {paymentStatus === 'initial' && (
          <>
            <FormGroup>
              <InputLabel>M-Pesa Phone Number</InputLabel>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="e.g., 0712345678"
              />
              {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
            </FormGroup>
            
            <PaymentButton onClick={handlePayment}>
              Pay with M-Pesa
            </PaymentButton>
          </>
        )}
        
        {paymentStatus === 'loading' && (
          <StatusMessage>
            <SpinnerIcon />
            <p>Processing your payment...</p>
            <p>Please check your phone for the M-Pesa prompt</p>
          </StatusMessage>
        )}
        
        {paymentStatus === 'success' && (
          <StatusMessage success>
            <SuccessIcon />
            <p>Payment initiated successfully!</p>
            <p>Please check your phone to complete the transaction.</p>
            <PaymentButton 
              onClick={() => navigate('/booking-confirmation', { 
                state: { 
                  passenger,
                  selectedSeats,
                  schedule,
                  totalPrice,
                  reservation: reservation || bookingData?.data
                } 
              })}
              style={{ marginTop: '20px', backgroundColor: '#28a745' }}
            >
              View Ticket
            </PaymentButton>
          </StatusMessage>
        )}
        
        {paymentStatus === 'error' && (
          <StatusMessage error>
            <p>Payment Error</p>
            <p>{errorMessage || 'There was an error processing your payment. Please try again.'}</p>
            <PaymentButton 
              onClick={() => setPaymentStatus('initial')}
              style={{ marginTop: '20px' }}
            >
              Try Again
            </PaymentButton>
          </StatusMessage>
        )}
      </Section>
    </Container>
  );
}

export default PaymentPage;