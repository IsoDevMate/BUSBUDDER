import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { FiPlus, FiRefreshCw, FiEdit2, FiTrash2, FiSearch, FiX, FiMapPin } from 'react-icons/fi';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000';
const SEARCH_API_URL = `${BASE_URL}/api/v1/routes/search`;

// Function to get the access token from local storage
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

// Styled Components (unchanged)
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
  background-color: #4c51bf;
  color: white;
  border: none;

  &:hover {
    background-color: #434190;
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

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4c51bf;
    box-shadow: 0 0 0 2px rgba(76, 81, 191, 0.2);
  }
`;

const SearchButton = styled(Button)`
  background-color: #4c51bf;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;

  &:hover {
    background-color: #434190;
  }
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
  border-top: 4px solid #4c51bf;
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
    color: #4c51bf;
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
    border-color: #4c51bf;
    box-shadow: 0 0 0 2px rgba(76, 81, 191, 0.2);
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
    border-top-color: #4c51bf;
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

// API Functions with Access Token
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function searchRoutes(params) {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${SEARCH_API_URL}?${queryString}`, {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  });
  return handleResponse(response);
}

async function createRoute(routeData) {
  const response = await fetch(`${BASE_URL}/api/v1/routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
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
      'Authorization': `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(routeData),
  });
  return handleResponse(response);
}

async function deleteRoute(id) {
  const response = await fetch(`${BASE_URL}/api/v1/routes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete route');
  }
}

// Component
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
    if (getAccessToken()) {
      fetchRoutes();
    } else {
      console.error('Access token not found');
    }
  }, []);

  const fetchRoutes = async () => {
    setLoading(true);
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
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createRoute(formData);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Route created successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      fetchRoutes();
      setOpenModal(false);
      setEditMode(false);
      setEditId(null);
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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4c51bf',
      cancelButtonColor: '#e53e3e',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteRoute(id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Route has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
        fetchRoutes();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error deleting route: ${error.message}`,
        });
      }
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

  // Calculate summary statistics
  const totalRoutes = routes.length;
  const totalDistance = routes.reduce((sum, route) => sum + (parseFloat(route.distance) || 0), 0);

  const avgDistance = totalRoutes > 0 ? (totalDistance / totalRoutes).toFixed(2) : 0;
  const avgDuration = totalRoutes > 0
    ? routes.reduce((sum, route) => sum + (parseFloat(route.estimatedDuration) || 0), 0) / totalRoutes
    : 0;

  return (
    <Container>
      <Header>
        <div>
          <Title>Route Management</Title>
          <Subtitle>Manage transportation routes efficiently</Subtitle>
        </div>
        <ButtonGroup>
          <PrimaryButton onClick={() => setOpenModal(true)}>
            <FiPlus /> Add Route
          </PrimaryButton>
          <SecondaryButton onClick={fetchRoutes}>
            <FiRefreshCw /> Refresh
          </SecondaryButton>
        </ButtonGroup>
      </Header>

      {/* Summary Cards */}
      <SummaryContainer>
        <SummaryCard>
          <SummaryTitle>
            <FiMapPin /> Total Routes
          </SummaryTitle>
          <SummaryValue>{totalRoutes}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryTitle>
            <FiMapPin /> Total Distance
          </SummaryTitle>
          <SummaryValue>{totalDistance} km</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryTitle>
            <FiMapPin /> Avg. Distance
          </SummaryTitle>
          <SummaryValue>{avgDistance} km</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryTitle>
            <FiMapPin /> Avg. Duration
          </SummaryTitle>
          <SummaryValue>{avgDuration.toFixed(0)} mins</SummaryValue>
        </SummaryCard>
      </SummaryContainer>

      {/* Search Form */}
      <SearchForm onSubmit={handleSearchSubmit}>
        <div style={{ flex: 1 }}>
          <FormLabel>Start Location</FormLabel>
          <SearchInput
            type="text"
            name="startLocation"
            placeholder="Enter start location"
            value={searchParams.startLocation}
            onChange={handleSearchChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <FormLabel>End Location</FormLabel>
          <SearchInput
            type="text"
            name="endLocation"
            placeholder="Enter end location"
            value={searchParams.endLocation}
            onChange={handleSearchChange}
          />
        </div>
        <SearchButton type="submit">
          <FiSearch /> Search
        </SearchButton>
      </SearchForm>

      {/* Routes Table */}
      <TableContainer>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Start Point</TableHeaderCell>
                <TableHeaderCell>End Point</TableHeaderCell>
                <TableHeaderCell>Duration (mins)</TableHeaderCell>
                <TableHeaderCell>Distance (km)</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {Array.isArray(routes) && routes.length > 0 ? (
                routes.map((route) => (
                  <TableRow key={route._id}>
                    <TableCell>{route.startLocation}</TableCell>
                    <TableCell>{route.endLocation}</TableCell>
                    <TableCell>{route.estimatedDuration}</TableCell>
                    <TableCell>{route.distance}</TableCell>
                    <TableCell>
                      <ActionButtons>
                        <ActionButton onClick={() => handleEdit(route)} title="Edit">
                          <FiEdit2 />
                        </ActionButton>
                        <DeleteButton onClick={() => handleDelete(route._id)} title="Delete">
                          <FiTrash2 />
                        </DeleteButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5">
                    <EmptyState>
                      {routes.length === 0 ? 'No routes available. Add your first route!' : 'No routes match your search criteria.'}
                    </EmptyState>
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        )}
      </TableContainer>

      {/* Add/Edit Modal */}
      {openModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{editMode ? 'Edit Route' : 'Add New Route'}</ModalTitle>
              <ModalCloseButton onClick={() => {
                setOpenModal(false);
                setEditMode(false);
                setEditId(null);
                setFormData({
                  startLocation: '',
                  endLocation: '',
                  distance: '',
                  estimatedDuration: '',
                });
              }}>
                <FiX size={20} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="startLocation">Start Location *</FormLabel>
                  <FormInput
                    type="text"
                    id="startLocation"
                    name="startLocation"
                    value={formData.startLocation}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., New York"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="endLocation">End Location *</FormLabel>
                  <FormInput
                    type="text"
                    id="endLocation"
                    name="endLocation"
                    value={formData.endLocation}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Boston"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="distance">Distance (km) *</FormLabel>
                  <FormInput
                    type="number"
                    id="distance"
                    name="distance"
                    value={formData.distance}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 350"
                    min="0"
                    step="0.1"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="estimatedDuration">Estimated Duration (mins) *</FormLabel>
                  <FormInput
                    type="number"
                    id="estimatedDuration"
                    name="estimatedDuration"
                    value={formData.estimatedDuration}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 240"
                    min="0"
                  />
                </FormGroup>
                <ModalFooter>
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setOpenModal(false);
                      setEditMode(false);
                      setEditId(null);
                      setFormData({
                        startLocation: '',
                        endLocation: '',
                        distance: '',
                        estimatedDuration: '',
                      });
                    }}
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit">
                    {editMode ? 'Update Route' : 'Add Route'}
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

export default RouteManagement;
