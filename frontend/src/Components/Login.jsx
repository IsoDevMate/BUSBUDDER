// // import React, { useState } from 'react';
// // import styled from 'styled-components';

// // const FormContainer = styled.div`
// //   max-width: 400px;
// //   margin: 50px auto;
// //   padding: 20px;
// //   border: 1px solid #ccc;
// //   border-radius: 8px;
// //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// //   background-color: #fff;
// // `;

// // const FormTitle = styled.h2`
// //   text-align: center;
// //   margin-bottom: 20px;
// //   color: #333;
// // `;

// // const FormGroup = styled.div`
// //   margin-bottom: 15px;
// // `;

// // const Label = styled.label`
// //   display: block;
// //   margin-bottom: 5px;
// //   font-weight: bold;
// //   color: #555;
// // `;

// // const Input = styled.input`
// //   width: 100%;
// //   padding: 8px;
// //   box-sizing: border-box;
// //   border: 1px solid #ccc;
// //   border-radius: 4px;
// // `;

// // const Button = styled.button`
// //   width: 100%;
// //   padding: 10px;
// //   background-color: #4c51bf;
// //   color: #fff;
// //   border: none;
// //   border-radius: 4px;
// //   font-size: 16px;
// //   cursor: pointer;
// //   transition: background-color 0.3s;

// //   &:hover {
// //     background-color: #4c51bf;
// //   }
// // `;

// // const LoginForm = () => {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const url = 'http://localhost:7000/api/v1/auth/login'; 

// //     try {
// //       const response = await fetch(url, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Network response was not ok');
// //       }

// //       const result = await response.json();
// //       console.log('Success:', result);
// //       alert('Login successful!');
// //     } catch (error) {
// //       console.error('Error:', error);
// //       alert('Login failed. Please try again.');
// //     }
// //   };

// //   return (
// //     <FormContainer>
// //       <FormTitle>Login</FormTitle>
// //       <form onSubmit={handleSubmit}>
// //         <FormGroup>
// //           <Label>Email:</Label>
// //           <Input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //         </FormGroup>
// //         <FormGroup>
// //           <Label>Password:</Label>
// //           <Input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //         </FormGroup>
// //         <Button type="submit">Login</Button>
// //       </form>
// //     </FormContainer>
// //   );
// // };

// // export default LoginForm;
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

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

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
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

//     const url = 'https://busbudder.onrender.com/api/v1/auth/login';

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Login failed');
//       }

//       // Store the token in localStorage for future authenticated requests
//       localStorage.setItem('token', result.token);
      
//       // Get user role from response
//       const userRole = result.user?.role || result.role;
      
//       console.log('Login successful:', result);
      
//       // Redirect based on user role
//       if (userRole === 'admin') {
//         navigate('/admindashboard');
//       } else {
//         navigate('/profile');
//       }
      
//     } catch (error) {
//       console.error('Error:', error);
//       setError(error.message || 'Login failed. Please check your credentials and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <FormContainer>
//       <FormTitle>Login</FormTitle>
//       <form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label>Email:</Label>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label>Password:</Label>
//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />
//         </FormGroup>
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         <Button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </Button>
//       </form>
//     </FormContainer>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    const url = 'https://busbudder.onrender.com/api/v1/auth/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Login failed');
      }

      // Extract user data and tokens from the response structure
      const { user, tokens } = result.data;
      
      // Store the access token in localStorage for future authenticated requests
      localStorage.setItem('accessToken', tokens.accessToken);
      
      // Optionally store other user details you might need across the app
      localStorage.setItem('userId', user._id);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', `${user.firstName} ${user.lastName}`);
      
      console.log('Login successful:', result.message);
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;