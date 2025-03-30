// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaArrowLeft, FaUser } from 'react-icons/fa';

// // Styled Components
// const Container = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
//   font-family: Arial, sans-serif;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const BackButton = styled.button`
//   display: flex;
//   align-items: center;
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 16px;
//   color: #333;
//   margin-right: 20px;
//   padding: 5px 10px;
//   border-radius: 4px;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #f0f0f0;
//   }

//   svg {
//     margin-right: 5px;
//   }
// `;

// const PageTitle = styled.h1`
//   color: #333;
//   margin: 0;
//   font-size: 24px;
// `;

// const Section = styled.div`
//   margin-bottom: 30px;
// `;

// const SectionTitle = styled.h2`
//   font-size: 18px;
//   color: #333;
//   margin-bottom: 15px;
//   padding-bottom: 5px;
//   border-bottom: 1px solid #eee;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-size: 14px;
//   color: #666;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 16px;
//   box-sizing: border-box;

//   &:focus {
//     outline: none;
//     border-color: #4c51bf;
//   }
// `;

// const RadioGroup = styled.div`
//   display: flex;
//   gap: 15px;
//   margin-top: 5px;
// `;

// const RadioLabel = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   font-size: 14px;
//   cursor: pointer;
// `;

// const RadioInput = styled.input`
//   margin: 0;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 15px;

//   th, td {
//     padding: 10px;
//     text-align: left;
//     border-bottom: 1px solid #eee;
//   }

//   th {
//     font-weight: normal;
//     color: #666;
//     font-size: 14px;
//   }
// `;

// const AddPassengerButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   background: none;
//   border: 1px dashed #4c51bf;
//   color: #4c51bf;
//   padding: 8px 15px;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 14px;
//   margin-top: 10px;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #f0f0ff;
//   }
// `;

// const TotalSection = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 30px;
//   padding-top: 20px;
//   border-top: 1px solid #eee;
// `;

// const TotalAmount = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   color: #333;
// `;

// const ProceedButton = styled.button`
//   padding: 12px 30px;
//   background-color: #4c51bf;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #3a3f99;
//   }
// `;

// function PassengerDetailsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedSeats, busDetails, totalPrice } = location.state || {};
  
//   const [primaryPassenger, setPrimaryPassenger] = useState({
//     name: '',
//     gender: 'male',
//     age: '',
//     countryCode: '+254',
//     mobileNumber: '',
//     nationality: '',
//     identityNumber: ''
//   });

//   const [coPassengers, setCoPassengers] = useState([]);
//   const [showCoPassengerForm, setShowCoPassengerForm] = useState(false);
//   const [newCoPassenger, setNewCoPassenger] = useState({
//     name: '',
//     gender: 'male',
//     age: '',
//     countryCode: '+254',
//     mobileNumber: '',
//     nationality: '',
//     identityNumber: ''
//   });

//   const handlePrimaryPassengerChange = (e) => {
//     const { name, value } = e.target;
//     setPrimaryPassenger(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCoPassengerChange = (e) => {
//     const { name, value } = e.target;
//     setNewCoPassenger(prev => ({ ...prev, [name]: value }));
//   };

//   const addCoPassenger = () => {
//     if (newCoPassenger.name.trim() === '') return;
//     setCoPassengers(prev => [...prev, newCoPassenger]);
//     setNewCoPassenger({
//       name: '',
//       gender: 'male',
//       age: '',
//       countryCode: '+254',
//       mobileNumber: '',
//       nationality: '',
//       identityNumber: ''
//     });
//     setShowCoPassengerForm(false);
//   };

//   const removeCoPassenger = (index) => {
//     setCoPassengers(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleProceedToPayment = () => {
//     // Validate required fields
//     if (
//       !primaryPassenger.name ||
//       !primaryPassenger.age ||
//       !primaryPassenger.mobileNumber ||
//       !primaryPassenger.nationality ||
//       !primaryPassenger.identityNumber
//     ) {
//       alert('Please fill in all required fields for the primary passenger');
//       return;
//     }

//     // Here you would typically send the data to your backend
//     // Then navigate to payment page
//     navigate('/payment', {
//       state: {
//         primaryPassenger,
//         coPassengers,
//         selectedSeats,
//         busDetails,
//         totalPrice
//       }
//     });
//   };

//   return (
//     <Container>
//       <Header>
//         <BackButton onClick={() => navigate(-1)}>
//           <FaArrowLeft /> Back
//         </BackButton>
//         <PageTitle>Passenger Detail</PageTitle>
//       </Header>

//       <Section>
//         <SectionTitle>Contact Detail</SectionTitle>
        
//         <FormGroup>
//           <Label>Email Id</Label>
//           <Input 
//             type="email" 
//             name="email"
//             value={primaryPassenger.email || ''}
//             onChange={handlePrimaryPassengerChange}
//           />
//         </FormGroup>

//         <SectionTitle>Primary Passenger</SectionTitle>
        
//         <FormGroup>
//           <Label>Name</Label>
//           <Input 
//             type="text" 
//             name="name"
//             value={primaryPassenger.name}
//             onChange={handlePrimaryPassengerChange}
//             required
//           />
//         </FormGroup>

//         <RadioGroup>
//           <RadioLabel>
//             <RadioInput 
//               type="radio" 
//               name="gender"
//               value="male"
//               checked={primaryPassenger.gender === 'male'}
//               onChange={handlePrimaryPassengerChange}
//             />
//             Male
//           </RadioLabel>
//           <RadioLabel>
//             <RadioInput 
//               type="radio" 
//               name="gender"
//               value="female"
//               checked={primaryPassenger.gender === 'female'}
//               onChange={handlePrimaryPassengerChange}
//             />
//             Female
//           </RadioLabel>
//         </RadioGroup>

//         <Table>
//           <thead>
//             <tr>
//               <th>Age</th>
//               <th>Country Code</th>
//               <th>Mobile Number</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <Input 
//                   type="number" 
//                   name="age"
//                   value={primaryPassenger.age}
//                   onChange={handlePrimaryPassengerChange}
//                   required
//                 />
//               </td>
//               <td>
//                 <Input 
//                   type="text" 
//                   name="countryCode"
//                   value={primaryPassenger.countryCode}
//                   onChange={handlePrimaryPassengerChange}
//                 />
//               </td>
//               <td>
//                 <Input 
//                   type="tel" 
//                   name="mobileNumber"
//                   value={primaryPassenger.mobileNumber}
//                   onChange={handlePrimaryPassengerChange}
//                   required
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </Table>

//         <Table>
//           <thead>
//             <tr>
//               <th>Nationality</th>
//               <th>Identity Number</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <Input 
//                   type="text" 
//                   name="nationality"
//                   value={primaryPassenger.nationality}
//                   onChange={handlePrimaryPassengerChange}
//                   required
//                 />
//               </td>
//               <td>
//                 <Input 
//                   type="text" 
//                   name="identityNumber"
//                   value={primaryPassenger.identityNumber}
//                   onChange={handlePrimaryPassengerChange}
//                   required
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//       </Section>

//       <Section>
//         <SectionTitle>Co-Passenger</SectionTitle>
        
//         {coPassengers.map((passenger, index) => (
//           <div key={index} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '4px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <h3 style={{ margin: '0 0 10px 0' }}>{passenger.name}</h3>
//               <button 
//                 onClick={() => removeCoPassenger(index)}
//                 style={{ 
//                   background: 'none', 
//                   border: 'none', 
//                   color: '#e74c3c', 
//                   cursor: 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 Remove
//               </button>
//             </div>
//             <p style={{ margin: '5px 0', color: '#666' }}>
//               {passenger.gender === 'male' ? 'Male' : 'Female'}, {passenger.age} years
//             </p>
//             <p style={{ margin: '5px 0', color: '#666' }}>
//               {passenger.countryCode} {passenger.mobileNumber}
//             </p>
//           </div>
//         ))}

//         {showCoPassengerForm ? (
//           <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
//             <FormGroup>
//               <Label>Name</Label>
//               <Input 
//                 type="text" 
//                 name="name"
//                 value={newCoPassenger.name}
//                 onChange={handleCoPassengerChange}
//               />
//             </FormGroup>

//             <RadioGroup>
//               <RadioLabel>
//                 <RadioInput 
//                   type="radio" 
//                   name="gender"
//                   value="male"
//                   checked={newCoPassenger.gender === 'male'}
//                   onChange={handleCoPassengerChange}
//                 />
//                 Male
//               </RadioLabel>
//               <RadioLabel>
//                 <RadioInput 
//                   type="radio" 
//                   name="gender"
//                   value="female"
//                   checked={newCoPassenger.gender === 'female'}
//                   onChange={handleCoPassengerChange}
//                 />
//                 Female
//               </RadioLabel>
//             </RadioGroup>

//             <Table>
//               <thead>
//                 <tr>
//                   <th>Age</th>
//                   <th>Country Code</th>
//                   <th>Mobile Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <Input 
//                       type="number" 
//                       name="age"
//                       value={newCoPassenger.age}
//                       onChange={handleCoPassengerChange}
//                     />
//                   </td>
//                   <td>
//                     <Input 
//                       type="text" 
//                       name="countryCode"
//                       value={newCoPassenger.countryCode}
//                       onChange={handleCoPassengerChange}
//                     />
//                   </td>
//                   <td>
//                     <Input 
//                       type="tel" 
//                       name="mobileNumber"
//                       value={newCoPassenger.mobileNumber}
//                       onChange={handleCoPassengerChange}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>

//             <Table>
//               <thead>
//                 <tr>
//                   <th>Nationality</th>
//                   <th>Identity Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <Input 
//                       type="text" 
//                       name="nationality"
//                       value={newCoPassenger.nationality}
//                       onChange={handleCoPassengerChange}
//                     />
//                   </td>
//                   <td>
//                     <Input 
//                       type="text" 
//                       name="identityNumber"
//                       value={newCoPassenger.identityNumber}
//                       onChange={handleCoPassengerChange}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </Table>

//             <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
//               <button 
//                 onClick={() => setShowCoPassengerForm(false)}
//                 style={{
//                   padding: '8px 15px',
//                   background: '#f5f5f5',
//                   border: '1px solid #ddd',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={addCoPassenger}
//                 style={{
//                   padding: '8px 15px',
//                   background: '#4c51bf',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Add Passenger
//               </button>
//             </div>
//           </div>
//         ) : (
//           <AddPassengerButton onClick={() => setShowCoPassengerForm(true)}>
//             <FaUser /> Add Co-Passenger
//           </AddPassengerButton>
//         )}
//       </Section>

//       <TotalSection>
//         <TotalAmount>KES {totalPrice?.toLocaleString() || '0'}</TotalAmount>
//         <ProceedButton onClick={handleProceedToPayment}>
//           PROCEED TO PAY
//         </ProceedButton>
//       </TotalSection>
//     </Container>
//   );
// }

// export default PassengerDetailsPage;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

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
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
`;

const PassengerCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: ${({ isPrimary }) => (isPrimary ? '#f9f9ff' : 'white')};
`;

const PassengerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PassengerTitle = styled.h3`
  margin: 0;
  color: #4c51bf;
  font-size: 16px;
`;

const SeatNumber = styled.span`
  background-color: #4c51bf;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
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

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    font-weight: normal;
    color: #666;
    font-size: 14px;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ProceedButton = styled.button`
  padding: 12px 30px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a3f99;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

function PassengerDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats = [], busDetails, totalPrice } = location.state || {};
  
  // Initialize passengers array with one passenger per selected seat
  const initialPassengers = selectedSeats.map((seat, index) => ({
    id: index,
    seatNumber: seat.seatNumber,
    isPrimary: index === 0,
    name: '',
    gender: 'male',
    age: '',
    countryCode: '+254',
    mobileNumber: index === 0 ? '' : '', // Only require mobile for primary
    nationality: '',
    identityNumber: '',
    email: index === 0 ? '' : undefined // Only require email for primary
  }));

  const [passengers, setPassengers] = useState(initialPassengers);
  const [errors, setErrors] = useState({});

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
    
    // Clear error for this field if it exists
    if (errors[`passenger-${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`passenger-${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    passengers.forEach((passenger, index) => {
      if (!passenger.name) {
        newErrors[`passenger-${index}-name`] = 'Name is required';
        isValid = false;
      }
      if (!passenger.age) {
        newErrors[`passenger-${index}-age`] = 'Age is required';
        isValid = false;
      }
      if (passenger.isPrimary) {
        if (!passenger.email) {
          newErrors[`passenger-${index}-email`] = 'Email is required';
          isValid = false;
        }
        if (!passenger.mobileNumber) {
          newErrors[`passenger-${index}-mobileNumber`] = 'Mobile number is required';
          isValid = false;
        }
      }
      if (!passenger.nationality) {
        newErrors[`passenger-${index}-nationality`] = 'Nationality is required';
        isValid = false;
      }
      if (!passenger.identityNumber) {
        newErrors[`passenger-${index}-identityNumber`] = 'Identity number is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      const primaryPassenger = passengers.find(p => p.isPrimary);
      const coPassengers = passengers.filter(p => !p.isPrimary);
      
      navigate('/payment', {
        state: {
          primaryPassenger,
          coPassengers,
          selectedSeats,
          busDetails,
          totalPrice
        }
      });
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </BackButton>
        <PageTitle>Passenger Details</PageTitle>
      </Header>

      <Section>
        <SectionTitle>
          {selectedSeats.length > 1 
            ? `Passengers (${selectedSeats.length})` 
            : 'Passenger'}
        </SectionTitle>

        {passengers.map((passenger, index) => (
          <PassengerCard key={index} isPrimary={passenger.isPrimary}>
            <PassengerHeader>
              <PassengerTitle>
                {passenger.isPrimary ? 'Primary Passenger' : `Passenger ${index + 1}`}
              </PassengerTitle>
              <SeatNumber>Seat: {passenger.seatNumber}</SeatNumber>
            </PassengerHeader>

            {passenger.isPrimary && (
              <FormGroup>
                <Label>Email Id</Label>
                <Input 
                  type="email" 
                  value={passenger.email || ''}
                  onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                  required
                />
                {errors[`passenger-${index}-email`] && (
                  <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                    {errors[`passenger-${index}-email`]}
                  </div>
                )}
              </FormGroup>
            )}

            <FormGroup>
              <Label>Name</Label>
              <Input 
                type="text" 
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                required
              />
              {errors[`passenger-${index}-name`] && (
                <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                  {errors[`passenger-${index}-name`]}
                </div>
              )}
            </FormGroup>

            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name={`gender-${index}`}
                  value="male"
                  checked={passenger.gender === 'male'}
                  onChange={() => handlePassengerChange(index, 'gender', 'male')}
                />
                Male
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name={`gender-${index}`}
                  value="female"
                  checked={passenger.gender === 'female'}
                  onChange={() => handlePassengerChange(index, 'gender', 'female')}
                />
                Female
              </RadioLabel>
            </RadioGroup>

            <Table>
              <thead>
                <tr>
                  <th>Age</th>
                  {passenger.isPrimary && (
                    <>
                      <th>Country Code</th>
                      <th>Mobile Number</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input 
                      type="number" 
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      required
                    />
                    {errors[`passenger-${index}-age`] && (
                      <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                        {errors[`passenger-${index}-age`]}
                      </div>
                    )}
                  </td>
                  {passenger.isPrimary && (
                    <>
                      <td>
                        <Input 
                          type="text" 
                          value={passenger.countryCode}
                          onChange={(e) => handlePassengerChange(index, 'countryCode', e.target.value)}
                        />
                      </td>
                      <td>
                        <Input 
                          type="tel" 
                          value={passenger.mobileNumber}
                          onChange={(e) => handlePassengerChange(index, 'mobileNumber', e.target.value)}
                          required={passenger.isPrimary}
                        />
                        {errors[`passenger-${index}-mobileNumber`] && (
                          <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                            {errors[`passenger-${index}-mobileNumber`]}
                          </div>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </Table>

            <Table>
              <thead>
                <tr>
                  <th>Nationality</th>
                  <th>Identity Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input 
                      type="text" 
                      value={passenger.nationality}
                      onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                      required
                    />
                    {errors[`passenger-${index}-nationality`] && (
                      <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                        {errors[`passenger-${index}-nationality`]}
                      </div>
                    )}
                  </td>
                  <td>
                    <Input 
                      type="text" 
                      value={passenger.identityNumber}
                      onChange={(e) => handlePassengerChange(index, 'identityNumber', e.target.value)}
                      required
                    />
                    {errors[`passenger-${index}-identityNumber`] && (
                      <div style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                        {errors[`passenger-${index}-identityNumber`]}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </PassengerCard>
        ))}
      </Section>

      <TotalSection>
        <TotalAmount>KES {totalPrice?.toLocaleString() || '0'}</TotalAmount>
        <ProceedButton onClick={handleProceedToPayment}>
          PROCEED TO PAY
        </ProceedButton>
      </TotalSection>
    </Container>
  );
}

export default PassengerDetailsPage;