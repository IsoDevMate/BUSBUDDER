import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { FiPlus, FiRefreshCw, FiEdit2, FiTrash2, FiSearch, FiX, FiCheckCircle, FiAlertTriangle, FiPauseCircle } from 'react-icons/fi';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/buses?status=';

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

const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const AmenityTag = styled.span`
  background-color: #ebf8ff;
  color: #3182ce;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
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

const FormHelperText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #718096;
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

async function getBuses() {
  const response = await fetch(`${API_URL}`);
  return handleResponse(response);
}

async function createBus(busData) {
  const response = await fetch(`http://localhost:7000/api/v1/buses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(busData),
  });
  return handleResponse(response);
}

async function updateBus(id, busData) {
  const response = await fetch(`http://localhost:7000/api/v1/buses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(busData),
  });
  return handleResponse(response);
}

async function deleteBus(id) {
  const response = await fetch(`http://localhost:7000/api/v1/buses/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete bus');
  }
}

// Component
function BusManagement() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBusId, setCurrentBusId] = useState(null);
  const [formData, setFormData] = useState({
    busNumber: '',
    model: '',
    capacity: '',
    amenities: [],
    status: 'active',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const getSummaryData = () => {
    const totalBuses = buses.length;
    const activeBuses = buses.filter(bus => bus.status === 'active').length;
    const maintenanceBuses = buses.filter(bus => bus.status === 'maintenance').length;
    const inactiveBuses = buses.filter(bus => bus.status === 'inactive').length;

    return {
      total: totalBuses,
      active: activeBuses,
      maintenance: maintenanceBuses,
      inactive: inactiveBuses,
      activePercentage: totalBuses > 0 ? Math.round((activeBuses / totalBuses) * 100) : 0,
    };
  };

  const summaryData = getSummaryData();

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await getBuses();
      if (response.success && Array.isArray(response.data)) {
        setBuses(response.data);
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
        text: `Error fetching buses: ${error.message}`,
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

  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      amenities: value.split(',').map(amenity => amenity.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateBus(currentBusId, formData);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Bus updated successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createBus(formData);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Bus created successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      fetchBuses();
      setOpenModal(false);
      setEditMode(false);
      setCurrentBusId(null);
      setFormData({
        busNumber: '',
        model: '',
        capacity: '',
        amenities: [],
        status: 'active',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error ${editMode ? 'updating' : 'creating'} bus: ${error.message}`,
      });
    }
  };

  const handleEdit = (bus) => {
    setFormData({
      busNumber: bus.busNumber,
      model: bus.model,
      capacity: bus.capacity,
      amenities: bus.amenities,
      status: bus.status,
    });
    setCurrentBusId(bus._id);
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
        await deleteBus(id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Bus has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
        fetchBuses();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error deleting bus: ${error.message}`,
        });
      }
    }
  };
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBuses = buses.filter((bus) =>
    (bus.busNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (bus.model || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (bus.status || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (bus.amenities || []).some(amenity => amenity.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <ActiveStatus>{status}</ActiveStatus>;
      case 'maintenance':
        return <MaintenanceStatus>{status}</MaintenanceStatus>;
      case 'inactive':
        return <InactiveStatus>{status}</InactiveStatus>;
      default:
        return <StatusBadge>{status}</StatusBadge>;
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>Bus Management</Title>
          <Subtitle>Manage your fleet of buses efficiently</Subtitle>
        </div>
        <ButtonGroup>
          <PrimaryButton onClick={() => { setOpenModal(true); setEditMode(false); }}>
            <FiPlus /> Add Bus
          </PrimaryButton>
          <SecondaryButton onClick={fetchBuses}>
            <FiRefreshCw /> Refresh
          </SecondaryButton>
        </ButtonGroup>
      </Header>

      <SummaryContainer>
        <TotalSummaryCard>
          <SummaryTitle>
            <FiCheckCircle /> Total Buses
          </SummaryTitle>
          <SummaryValue>{summaryData.total}</SummaryValue>
          <SummaryChange>
            {summaryData.activePercentage}% operational
          </SummaryChange>
        </TotalSummaryCard>

        <ActiveSummaryCard>
          <SummaryTitle>
            <FiCheckCircle /> Active
          </SummaryTitle>
          <SummaryValue>{summaryData.active}</SummaryValue>
          <SummaryChange positive>
            {summaryData.total > 0 ? Math.round((summaryData.active / summaryData.total) * 100) : 0}% of fleet
          </SummaryChange>
        </ActiveSummaryCard>

        <MaintenanceSummaryCard>
          <SummaryTitle>
            <FiAlertTriangle /> Maintenance
          </SummaryTitle>
          <SummaryValue>{summaryData.maintenance}</SummaryValue>
          <SummaryChange>
            {summaryData.total > 0 ? Math.round((summaryData.maintenance / summaryData.total) * 100) : 0}% of fleet
          </SummaryChange>
        </MaintenanceSummaryCard>

        <InactiveSummaryCard>
          <SummaryTitle>
            <FiPauseCircle /> Inactive
          </SummaryTitle>
          <SummaryValue>{summaryData.inactive}</SummaryValue>
          <SummaryChange negative>
            {summaryData.total > 0 ? Math.round((summaryData.inactive / summaryData.total) * 100) : 0}% of fleet
          </SummaryChange>
        </InactiveSummaryCard>
      </SummaryContainer>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search buses by number, model, status or amenities..."
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
                <TableHeaderCell>Bus Number</TableHeaderCell>
                <TableHeaderCell>Model</TableHeaderCell>
                <TableHeaderCell>Capacity</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Amenities</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {Array.isArray(filteredBuses) && filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <TableRow key={bus._id}>
                    <TableCell>{bus.busNumber}</TableCell>
                    <TableCell>{bus.model}</TableCell>
                    <TableCell>{bus.capacity}</TableCell>
                    <TableCell>
                      {renderStatusBadge(bus.status)}
                    </TableCell>
                    <TableCell>
                      <AmenitiesContainer>
                        {bus.amenities && bus.amenities.length > 0 ? (
                          bus.amenities.map((amenity, index) => (
                            <AmenityTag key={index}>{amenity}</AmenityTag>
                          ))
                        ) : 'None'}
                      </AmenitiesContainer>
                    </TableCell>
                    <TableCell>
                      <ActionButtons>
                        <ActionButton onClick={() => handleEdit(bus)} title="Edit">
                          <FiEdit2 />
                        </ActionButton>
                        <DeleteButton onClick={() => handleDelete(bus._id)} title="Delete">
                          <FiTrash2 />
                        </DeleteButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6">
                    <EmptyState>
                      {buses.length === 0 ? 'No buses available. Add your first bus!' : 'No buses match your search criteria.'}
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
              <ModalTitle>{editMode ? 'Edit Bus' : 'Add New Bus'}</ModalTitle>
              <ModalCloseButton onClick={() => {
                setOpenModal(false);
                setEditMode(false);
                setCurrentBusId(null);
                setFormData({
                  busNumber: '',
                  model: '',
                  capacity: '',
                  amenities: [],
                  status: 'active',
                });
              }}>
                <FiX size={20} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="busNumber">Bus Number *</FormLabel>
                  <FormInput
                    type="text"
                    id="busNumber"
                    name="busNumber"
                    value={formData.busNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., BUS-001"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="model">Model *</FormLabel>
                  <FormInput
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Volvo B9R"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="capacity">Capacity *</FormLabel>
                  <FormInput
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 50"
                    min="1"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="amenities">Amenities</FormLabel>
                  <FormInput
                    type="text"
                    id="amenities"
                    name="amenities"
                    value={formData.amenities.join(', ')}
                    onChange={handleAmenitiesChange}
                    placeholder="e.g., WiFi, AC, TV"
                  />
                  <FormHelperText>Separate amenities with commas</FormHelperText>
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="status">Status *</FormLabel>
                  <FormSelect
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </FormSelect>
                </FormGroup>
                <ModalFooter>
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setOpenModal(false);
                      setEditMode(false);
                      setCurrentBusId(null);
                      setFormData({
                        busNumber: '',
                        model: '',
                        capacity: '',
                        amenities: [],
                        status: 'active',
                      });
                    }}
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit">
                    {editMode ? 'Update Bus' : 'Add Bus'}
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

export default BusManagement;