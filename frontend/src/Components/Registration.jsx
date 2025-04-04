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

// const Select = styled.select`
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
//     background-color: #4c51bf;
//   }
// `;

// const RegistrationForm = () => {
//     const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     role: 'passenger',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = 'https://busbudder.onrender.com/api/v1/auth/register'; 

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       console.log('Success:', result);
//       alert('Registration successful!');
//       navigate ('/login');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <FormContainer>
//       <FormTitle>Register</FormTitle>
//       <form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label>First Name:</Label>
//           <Input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label>Last Name:</Label>
//           <Input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label>Email:</Label>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </FormGroup>
        
//         <FormGroup>
//           <Label>Phone Number:</Label>
//           <Input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label>Role:</Label>
//           <Select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//           >
//             <option value="passenger">Passenger</option>
//             <option value="admin">Admin</option>
//           </Select>
//         </FormGroup>
//         <FormGroup>
//           <Label>Password:</Label>
//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </FormGroup>
//         <Button type="submit" onClick={handleSubmit}>Register</Button>
//       </form>
//     </FormContainer>
//   );
// };

// export default RegistrationForm;
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

const Select = styled.select`
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
    background-color: #3b40a8;
  }
`;

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #4c51bf;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'passenger',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.email.match(emailPattern)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const url = 'https://busbudder.onrender.com/api/v1/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Register</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First Name:</Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Last Name:</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Phone Number:</Label>
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Role:</Label>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="passenger">Passenger</option>
            <option value="admin">Admin</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>
        <Button type="submit">Register</Button>
      </form>
      <LoginLink to="/login">Already have an account? Go to Login</LoginLink>
    </FormContainer>
  );
};

export default RegistrationForm;
