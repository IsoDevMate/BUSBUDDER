// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate, useLocation } from 'react-router-dom';

// const FormContainer = styled.div`
//   max-width: 400px;
//   margin: 50px auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   background-color: #fff;
// `;

// const FormTitle = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
//   color: #555;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 8px;
//   box-sizing: border-box;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #4c51bf;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #3c40a0;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: #e53e3e;
//   margin-top: 10px;
//   text-align: center;
// `;

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     token: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       setLoading(false);
//       return;
//     }

//     const url = 'http://localhost:7000/api/v1/auth/reset-password';

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || 'Password reset failed');
//       }

//       console.log('Password reset successful:', result.message);
//       navigate('/login');

//     } catch (error) {
//       console.error('Error:', error);
//       setError(error.message || 'Password reset failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Extract token from the URL
//   React.useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const token = params.get('token');
//     if (token) {
//       setFormData((prev) => ({ ...prev, token }));
//     }
//   }, [location.search]);

//   return (
//     <FormContainer>
//       <FormTitle>Reset Password</FormTitle>
//       <form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label>New Password:</Label>
//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label>Confirm Password:</Label>
//           <Input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />
//         </FormGroup>
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         <Button type="submit" disabled={loading}>
//           {loading ? 'Resetting...' : 'Reset Password'}
//         </Button>
//       </form>
//     </FormContainer>
//   );
// };

// export default ResetPassword;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4c51bf;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3c40a0;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  margin-top: 10px;
  text-align: center;
`;

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    token: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const url = 'http://localhost:7000/api/v1/auth/reset-password';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: formData.token,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Password reset failed');
      }

      console.log('Password reset successful:', result.message);
      navigate('/login');

    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Password reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Extract token from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      setFormData((prev) => ({ ...prev, token }));
    }
  }, [location.search]);

  return (
    <FormContainer>
      <FormTitle>Reset Password</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>New Password:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default ResetPassword;
