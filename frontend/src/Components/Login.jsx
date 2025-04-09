// // import React, { useState } from 'react';
// // import styled from 'styled-components';
// // import { useNavigate } from 'react-router-dom';

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
// //     background-color: #3c40a0;
// //   }
// // `;

// // const ErrorMessage = styled.p`
// //   color: #e53e3e;
// //   margin-top: 10px;
// //   text-align: center;
// // `;

// // const LoginForm = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     const url = 'http://localhost:7000/api/v1/auth/login';

// //     try {
// //       const response = await fetch(url, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const result = await response.json();

// //       if (!response.ok || !result.success) {
// //         throw new Error(result.message || 'Login failed');
// //       }

// //       // Extract user data and tokens from the response structure
// //       const { user, tokens } = result.data;
      
// //       // Store the access token in localStorage for future authenticated requests
// //       localStorage.setItem('accessToken', tokens.accessToken);
      
// //       // Optionally store other user details you might need across the app
// //       localStorage.setItem('userId', user._id);
// //       localStorage.setItem('userRole', user.role);
// //       localStorage.setItem('userName', `${user.firstName} ${user.lastName}`);
      
// //       console.log('Login successful:', result.message);
      
// //       // Redirect based on user role
// //       if (user.role === 'admin') {
// //         navigate('/admin');
// //       } else {
// //         navigate('/profile');
// //       }
      
// //     } catch (error) {
// //       console.error('Error:', error);
// //       setError(error.message || 'Login failed. Please check your credentials and try again.');
// //     } finally {
// //       setLoading(false);
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
// //             disabled={loading}
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
// //             disabled={loading}
// //           />
// //         </FormGroup>
// //         {error && <ErrorMessage>{error}</ErrorMessage>}
// //         <Button type="submit" disabled={loading}>
// //           {loading ? 'Logging in...' : 'Login'}
// //         </Button>
// //       </form>
// //     </FormContainer>
// //   );
// // };

// // export default LoginForm;
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate, Link } from 'react-router-dom';

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

// const ForgotPasswordLink = styled(Link)`
//   display: block;
//   text-align: right;
//   margin-top: -10px;
//   margin-bottom: 10px;
//   color: #4c51bf;
//   text-decoration: none;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const SignupLink = styled(Link)`
//   display: block;
//   text-align: center;
//   margin-top: 20px;
//   color: #4c51bf;
//   text-decoration: none;

//   &:hover {
//     text-decoration: underline;
//   }
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

//     const url = 'http://localhost:7000/api/v1/auth/login';

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
//         throw new Error(result.message || 'Login failed');
//       }

//       const { user, tokens } = result.data;

//       localStorage.setItem('accessToken', tokens.accessToken);
//       localStorage.setItem('userId', user._id);
//       localStorage.setItem('userRole', user.role);
//       localStorage.setItem('userName', `${user.firstName} ${user.lastName}`);

//       console.log('Login successful:', result.message);

//       if (user.role === 'admin') {
//         navigate('/admin');
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
//         <ForgotPasswordLink to="/forgot">Forgot Password?</ForgotPasswordLink>
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         <Button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </Button>
//         <SignupLink to="/register">Don't have an account? Go to Signup</SignupLink>
//       </form>
//     </FormContainer>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

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

const ForgotPasswordLink = styled(Link)`
  display: block;
  text-align: right;
  margin-top: -10px;
  margin-bottom: 10px;
  color: #4c51bf;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #4c51bf;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HomeLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #4c51bf;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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

    const url = 'http://localhost:7000/api/v1/auth/login';

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

      const { user, tokens } = result.data;

      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('userId', user._id);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', `${user.firstName} ${user.lastName}`);

      console.log('Login successful:', result.message);

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
        <ForgotPasswordLink to="/forgot">Forgot Password?</ForgotPasswordLink>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <SignupLink to="/register">Don't have an account? Go to Signup</SignupLink>
        <HomeLink to="/">Go to Home</HomeLink>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
