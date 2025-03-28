import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f7f6;
  min-height: 100vh;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;

  svg {
    margin-right: 10px;
  }

  &:hover {
    color: #3498db;
  }
`;

const SearchSummary = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const BusCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const BusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const BusName = styled.h2`
  margin: 0;
  color: #2c3e50;
`;

const BusPrice = styled.div`
  font-weight: bold;
  color: #3498db;
  font-size: 1.2em;
`;

const BusDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.9em;
  color: #7f8c8d;
  margin-bottom: 5px;
`;

const DetailValue = styled.span`
  font-weight: 500;
  color: #2c3e50;
`;

const BookButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  color: #7f8c8d;
  padding: 50px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

function BusListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract buses and search parameters from location state
  const { buses, searchParams } = location.state || { buses: [], searchParams: {} };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleBookBus = (busId) => {
    // Implement booking logic
    console.log(`Booking bus ${busId}`);
  };

  if (!buses || buses.length === 0) {
    return (
      <Container>
        <BackButton onClick={handleGoBack}>
          <FaArrowLeft /> Back to Search
        </BackButton>
        <NoResultsMessage>
          No buses found for the selected route.
        </NoResultsMessage>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={handleGoBack}>
        <FaArrowLeft /> Back to Search
      </BackButton>

      <SearchSummary>
        <strong>Route:</strong> {searchParams.origin} to {searchParams.destination}
        {searchParams.date && <> | <strong>Date:</strong> {searchParams.date}</>}
      </SearchSummary>

      {buses.map(bus => (
        <BusCard key={bus.id}>
          <BusHeader>
            <BusName>{bus.name}</BusName>
            <BusPrice>KSh {bus.price.toLocaleString()}</BusPrice>
          </BusHeader>

          <BusDetails>
            <DetailItem>
              <DetailLabel>Origin</DetailLabel>
              <DetailValue>{bus.origin}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Destination</DetailLabel>
              <DetailValue>{bus.destination}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Departure</DetailLabel>
              <DetailValue>{bus.departureTime}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Arrival</DetailLabel>
              <DetailValue>{bus.arrivalTime}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Available Seats</DetailLabel>
              <DetailValue>{bus.availableSeats}</DetailValue>
            </DetailItem>
          </BusDetails>

          {bus.amenities && bus.amenities.length > 0 && (
            <DetailItem style={{ marginTop: '15px' }}>
              <DetailLabel>Amenities</DetailLabel>
              <DetailValue>{bus.amenities.join(', ')}</DetailValue>
            </DetailItem>
          )}

          <BookButton 
            onClick={() => handleBookBus(bus.id)}
            disabled={bus.availableSeats === 0}
          >
            {bus.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
          </BookButton>
        </BusCard>
      ))}
    </Container>
  );
}

export default BusListPage;