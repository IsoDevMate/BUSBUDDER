import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaBus, FaClock, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa';
import { format } from 'date-fns';

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
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;

  svg {
    margin-right: 10px;
  }

  &:hover {
    color: #3498db;
    background-color: #ebf5fb;
  }
`;

const SearchSummary = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;

  strong {
    color: #2c3e50;
  }
`;

const ScheduleCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 25px;
  margin-bottom: 25px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(0,0,0,0.15);
  }
`;

const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const BusInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const BusIcon = styled.div`
  background-color: #4c51bf;
  color: white;
  padding: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BusName = styled.h2`
  margin: 0;
  color: #2c3e50;
  font-size: 1.4rem;
`;

const BusPrice = styled.div`
  font-weight: bold;
  color: #4c51bf;
  font-size: 1.5rem;
  text-align: right;
`;

const ScheduleDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DetailValue = styled.span`
  font-weight: 500;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const AmenitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const AmenityBadge = styled.span`
  background-color: #ebf5fb;
  color: #2980b9;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BookButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
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

const NoResultsMessage = styled.div`
  text-align: center;
  color: #7f8c8d;
  padding: 50px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  font-size: 1.2rem;
`;
function BusListPage() {
  const location = useLocation();
  const navigate = useNavigate();


  // Extract schedules and search parameters from location state
  const { schedules, searchParams } = location.state || {
    schedules: [],
    searchParams: {}
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleBookNow = (scheduleId) => {
    // Find the selected schedule from the schedules array
    const selectedSchedule = schedules.find(s => s._id === scheduleId);

    if (!selectedSchedule) {
      console.error('Schedule not found');
      return;
    }

    navigate(`/schedules/${scheduleId}/seats`, {
      state: {
        schedule: selectedSchedule,
        searchParams,
        scheduleId,
      }
    });
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';

    try {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      console.error('Error formatting time:', e);
      return 'Invalid time';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    try {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return 'N/A';

    try {
      const dep = new Date(departureTime);
      const arr = new Date(arrivalTime);
      const diffMs = arr - dep;
      const diffMins = Math.round(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m`;
    } catch (e) {
      console.error('Error calculating duration:', e);
      return 'N/A';
    }
  };

  if (!schedules || schedules.length === 0) {
    return (
      <Container>
        <BackButton onClick={handleGoBack}>
          <FaArrowLeft /> Back to Search
        </BackButton>
        <NoResultsMessage>
          No schedules found for the selected route and date.
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
        <div>
          <strong>Route:</strong> {searchParams.startLocation || 'N/A'} to {searchParams.endLocation || 'N/A'}
        </div>
        {searchParams.date && (
          <div>
            <strong>Date:</strong> {formatDate(searchParams.date)}
          </div>
        )}
      </SearchSummary>

      {schedules.map(schedule => (
        <ScheduleCard key={schedule._id}>
          <ScheduleHeader>
            <BusInfo>
              <BusIcon>
                <FaBus />
              </BusIcon>
              <div>
                <BusName>{schedule?.busNumber || 'Unknown Bus'}</BusName>
                <DetailLabel>
                  <span>Capacity: {schedule.busId?.capacity || 0} seats</span>
                </DetailLabel>
              </div>
            </BusInfo>
            <BusPrice>KSh {schedule.fare?.toLocaleString() || '0'}</BusPrice>
          </ScheduleHeader>

          <ScheduleDetails>
            <DetailItem>
              <DetailLabel>
                <FaMapMarkerAlt /> From
              </DetailLabel>
              <DetailValue>{searchParams.startLocation || 'N/A'}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>
                <FaMapMarkerAlt /> To
              </DetailLabel>
              <DetailValue>{searchParams.endLocation || 'N/A'}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>
                <FaClock /> Departure
              </DetailLabel>
              <DetailValue>{formatTime(schedule.departureTime)}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>
                <FaClock /> Arrival
              </DetailLabel>
              <DetailValue>{formatTime(schedule.arrivalTime)}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>
                <FaClock /> Duration
              </DetailLabel>
              <DetailValue>
                {calculateDuration(schedule.departureTime, schedule.arrivalTime)}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>
                <FaChair /> Available Seats
              </DetailLabel>
              <DetailValue>{schedule.availableSeats || 0}</DetailValue>
            </DetailItem>
          </ScheduleDetails>

          {schedule.busId?.amenities?.length > 0 && (
            <div>
              <DetailLabel>Amenities:</DetailLabel>
              <AmenitiesList>
                {schedule.busId.amenities.map((amenity, index) => (
                  <AmenityBadge key={index}>{amenity}</AmenityBadge>
                ))}
              </AmenitiesList>
            </div>
          )}

        <BookButton
              onClick={() => handleBookNow(schedule._id)}
              disabled={schedule.availableSeats === 0}
            >
              {schedule.availableSeats > 0 ? 'Select Seats' : 'Sold Out'}
            </BookButton>
        </ScheduleCard>
      ))}
    </Container>
  );
}

export default BusListPage;

