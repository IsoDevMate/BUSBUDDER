import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UserManagementContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: left;
`;

const StyledTd = styled.td`
  padding: 1rem;
  border: 1px solid #ddd;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => (props.danger ? '#f44336' : '#007bff')};
  color: white;
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:7000/api/v1/auth/all-users`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Log the data to check its structure
      console.log('Fetched data:', data);

      // Ensure data is an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await fetch(`/users/${userId}`, { method: 'DELETE' });
      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully');
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <UserManagementContainer>
      <Header>
        <h1>User Management</h1>
        <StyledButton
          onClick={() => navigate('/users/add')}
        >
          Add New User
        </StyledButton>
      </Header>

      <StyledTable>
        <thead>
          <tr>
            <StyledTh>User</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Role</StyledTh>
            <StyledTh>Created</StyledTh>
            <StyledTh>Actions</StyledTh>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <StyledTd>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={user.profileImage}
                    alt={`${user.firstName} ${user.lastName}`}
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                  <span>{user.firstName} {user.lastName}</span>
                </div>
              </StyledTd>
              <StyledTd>{user.email}</StyledTd>
              <StyledTd>{user.role}</StyledTd>
              <StyledTd>{new Date(user.createdAt).toLocaleDateString()}</StyledTd>
              <StyledTd>
                <StyledButton
                  onClick={() => navigate(`/users/edit/${user._id}`)}
                >
                  Edit
                </StyledButton>
                <StyledButton
                  danger
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </StyledButton>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </UserManagementContainer>
  );
};

export default UserManagement;
