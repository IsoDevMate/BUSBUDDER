// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import styled, { keyframes } from 'styled-components';
// // import { FaBus, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

// // // Animation for subtle hover effects
// // const pulse = keyframes`
// //   0% { transform: scale(1); }
// //   50% { transform: scale(1.02); }
// //   100% { transform: scale(1); }
// // `;

// // const fadeIn = keyframes`
// //   from { opacity: 0; transform: translateY(20px); }
// //   to { opacity: 1; transform: translateY(0); }
// // `;

// // const PageContainer = styled.div`
// //   max-width: 1200px;
// //   margin: 0 auto;
// //   padding: 20px;
// //   min-height: 100vh;
// //   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// // `;

// // const HeroSection = styled.section`
// //   background: linear-gradient(135deg, rgba(41, 128, 185, 0.9) 0%, rgba(52, 152, 219, 0.9) 100%),
// //     url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
// //   background-size: cover;
// //   background-position: center;
// //   background-attachment: fixed;
// //   height: 500px;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: center;
// //   align-items: center;
// //   text-align: center;
// //   border-radius: 15px;
// //   margin-bottom: 2rem;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
// //   position: relative;
// //   overflow: hidden;
// //   animation: ${fadeIn} 0.8s ease-out;

// //   &::before {
// //     content: '';
// //     position: absolute;
// //     top: 0;
// //     left: 0;
// //     right: 0;
// //     bottom: 0;
// //     background: linear-gradient(
// //       to right,
// //       rgba(0, 0, 0, 0.3) 0%,
// //       rgba(0, 0, 0, 0) 50%,
// //       rgba(0, 0, 0, 0.3) 100%
// //     );
// //     pointer-events: none;
// //   }
// // `;

// // const HeroTitle = styled.h1`
// //   font-size: 3.5rem;
// //   color: white;
// //   margin-bottom: 1.5rem;
// //   text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
// //   font-weight: 800;
// //   letter-spacing: 1px;
// //   position: relative;
// //   z-index: 1;
// //   animation: ${fadeIn} 0.8s ease-out 0.2s both;

// //   @media (max-width: 768px) {
// //     font-size: 2.5rem;
// //   }
// // `;

// // const HeroSubtitle = styled.p`
// //   font-size: 1.5rem;
// //   color: rgba(255, 255, 255, 0.95);
// //   margin-bottom: 2.5rem;
// //   max-width: 800px;
// //   line-height: 1.6;
// //   position: relative;
// //   z-index: 1;
// //   animation: ${fadeIn} 0.8s ease-out 0.4s both;
// //   font-weight: 300;

// //   @media (max-width: 768px) {
// //     font-size: 1.2rem;
// //     padding: 0 20px;
// //   }
// // `;

// // const SearchCard = styled.div`
// //   background-color: white;
// //   border-radius: 16px;
// //   box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
// //   padding: 40px;
// //   max-width: 800px;
// //   margin: 0 auto;
// //   position: relative;
// //   z-index: 10;
// //   margin-top: -100px;
// //   border: 1px solid rgba(255, 255, 255, 0.3);
// //   backdrop-filter: blur(10px);
// //   animation: ${fadeIn} 0.8s ease-out 0.6s both;
// //   transition: transform 0.3s ease, box-shadow 0.3s ease;

// //   &:hover {
// //     transform: translateY(-5px);
// //     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
// //   }

// //   @media (max-width: 768px) {
// //     padding: 30px 20px;
// //     margin-top: -80px;
// //   }
// // `;

// // const Title = styled.h1`
// //   text-align: center;
// //   color: #2c3e50;
// //   margin-bottom: 40px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   font-size: 2.2rem;
// //   font-weight: 700;
// //   letter-spacing: -0.5px;
  
// //   svg {
// //     margin-right: 15px;
// //     color: #4c51bf;
// //     font-size: 1.8rem;
// //   }

// //   @media (max-width: 768px) {
// //     font-size: 1.8rem;
    
// //     svg {
// //       font-size: 1.5rem;
// //     }
// //   }
// // `;

// // const FormGrid = styled.form`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //   gap: 25px;
// //   animation: ${fadeIn} 0.8s ease-out 0.8s both;
// // `;

// // const InputWrapper = styled.div`
// //   position: relative;
// //   transition: all 0.3s ease;

// //   &:hover {
// //     transform: translateY(-2px);
// //   }
// // `;

// // const InputIcon = styled.div`
// //   position: absolute;
// //   left: 18px;
// //   top: 50%;
// //   transform: translateY(-50%);
// //   color: #7f8c8d;
// //   font-size: 1.1rem;
// //   transition: color 0.3s ease;
// // `;

// // const StyledInput = styled.input`
// //   width: 100%;
// //   padding: 18px 18px 18px 50px;
// //   border: 2px solid #e0e6ed;
// //   border-radius: 10px;
// //   font-size: 16px;
// //   transition: all 0.3s ease;
// //   background-color: #f8fafc;
// //   color: #2d3748;
// //   font-weight: 500;
// //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

// //   &:focus {
// //     outline: none;
// //     border-color: #3498db;
// //     box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
// //     background-color: white;
    
// //     ~ ${InputIcon} {
// //       color: #3498db;
// //     }
// //   }

// //   &::placeholder {
// //     color: #a0aec0;
// //     font-weight: normal;
// //   }
// // `;

// // const SearchButton = styled.button`
// //   grid-column: 1 / -1;
// //   padding: 18px;
// //   background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
// //   color: white;
// //   border: none;
// //   border-radius: 10px;
// //   font-size: 18px;
// //   font-weight: 600;
// //   cursor: pointer;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   transition: all 0.3s ease;
// //   box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
// //   letter-spacing: 0.5px;
// //   text-transform: uppercase;

// //   &:hover {
// //     background: linear-gradient(135deg, #2980b9 0%, #1a252f 100%);
// //     transform: translateY(-2px);
// //     box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
// //     animation: ${pulse} 1.5s infinite;
// //   }

// //   &:active {
// //     transform: translateY(0);
// //   }

// //   svg {
// //     margin-right: 12px;
// //     font-size: 1.2rem;
// //   }

// //   &:disabled {
// //     background: #bdc3c7;
// //     cursor: not-allowed;
// //     transform: none;
// //     box-shadow: none;
// //     animation: none;
// //   }

// //   @media (max-width: 768px) {
// //     padding: 16px;
// //     font-size: 16px;
// //   }
// // `;

// // const ErrorMessage = styled.div`
// //   color: #e74c3c;
// //   text-align: center;
// //   margin-bottom: 25px;
// //   padding: 15px;
// //   background-color: rgba(231, 76, 60, 0.1);
// //   border-radius: 8px;
// //   border-left: 4px solid #e74c3c;
// //   font-weight: 500;
// //   animation: ${fadeIn} 0.5s ease-out;
// // `;

// // const Home = () => {
// //   const navigate = useNavigate();
  
// //   const [cities, setCities] = useState([]);
// //   const [searchParams, setSearchParams] = useState({
// //     origin: '',
// //     destination: '',
// //     date: ''
// //   });
// //   const [error, setError] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchCities = async () => {
// //       try {
// //         const response = await fetch('http://localhost:3001/cities');
// //         if (!response.ok) throw new Error('Failed to fetch cities');
        
// //         const data = await response.json();
// //         setCities(data);
// //       } catch (err) {
// //         setError('Unable to load cities. Please check your connection.');
// //       }
// //     };

// //     fetchCities();
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setSearchParams(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setIsLoading(true);

// //     if (!searchParams.origin || !searchParams.destination) {
// //       setError('Please select both origin and destination');
// //       setIsLoading(false);
// //       return;
// //     }

// //     if (searchParams.origin === searchParams.destination) {
// //       setError('Origin and destination cannot be the same');
// //       setIsLoading(false);
// //       return;
// //     }

// //     try {
// //       // Updated API endpoint with query parameters
// //       const response = await fetch(
// //         `http://localhost:3001/api/v1/buses/search?departure=${encodeURIComponent(searchParams.origin)}&destination=${encodeURIComponent(searchParams.destination)}`
// //       );
      
// //       if (!response.ok) {
// //         throw new Error('No buses found for the selected route');
// //       }
      
// //       const filteredBuses = await response.json();

// //       if (filteredBuses.length === 0) {
// //         setError('No buses found for the selected route');
// //         setIsLoading(false);
// //         return;
// //       }

// //       navigate('/bus-list', { 
// //         state: { 
// //           buses: filteredBuses, 
// //           searchParams 
// //         } 
// //       });
// //     } catch (err) {
// //       setError(err.message || 'An error occurred while searching for buses');
// //       setIsLoading(false);
// //     }
// //   };

// //   const isSearchDisabled = !searchParams.origin || !searchParams.destination || isLoading;

// //   return (
// //     <>
// //       <HeroSection>
// //         <HeroTitle>Welcome to Amaam Travels</HeroTitle>
// //         <HeroSubtitle>
// //           Experience comfortable, safe, and reliable bus travel across the country. 
// //           Book your tickets in just a few clicks!
// //         </HeroSubtitle>
// //       </HeroSection>

// //       <PageContainer>
// //         <SearchCard>
// //           <Title>
// //             <FaBus /> Bus Ticket Booking
// //           </Title>

// //           {error && <ErrorMessage>{error}</ErrorMessage>}

// //           <FormGrid onSubmit={handleSubmit}>
// //             <InputWrapper>
// //               <InputIcon><FaMapMarkerAlt /></InputIcon>
// //               <StyledInput 
// //                 name="origin"
// //                 list="originCities"
// //                 placeholder="From (City or Station)"
// //                 value={searchParams.origin}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //               <datalist id="originCities">
// //                 {cities.map(city => (
// //                   <option key={city.id} value={city.name} />
// //                 ))}
// //               </datalist>
// //             </InputWrapper>

// //             <InputWrapper>
// //               <InputIcon><FaMapMarkerAlt /></InputIcon>
// //               <StyledInput 
// //                 name="destination"
// //                 list="destinationCities"
// //                 placeholder="To (City or Station)"
// //                 value={searchParams.destination}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //               <datalist id="destinationCities">
// //                 {cities.map(city => (
// //                   <option key={city.id} value={city.name} />
// //                 ))}
// //               </datalist>
// //             </InputWrapper>

// //             <InputWrapper>
// //               <InputIcon><FaCalendarAlt /></InputIcon>
// //               <StyledInput 
// //                 type="date"
// //                 name="date"
// //                 value={searchParams.date}
// //                 onChange={handleInputChange}
// //                 min={new Date().toISOString().split('T')[0]}
// //                 required
// //               />
// //             </InputWrapper>

// //             <SearchButton 
// //               type="submit" 
// //               disabled={isSearchDisabled}
// //             >
// //               {isLoading ? (
// //                 'Searching...'
// //               ) : (
// //                 <>
// //                   <FaSearch /> Search Buses
// //                 </>
// //               )}
// //             </SearchButton>
// //           </FormGrid>
// //         </SearchCard>
// //       </PageContainer>
// //     </>
// //   );
// // };

// // export default Home;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled, { keyframes } from 'styled-components';
// import { FaBus, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

// // Animation for subtle hover effects
// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.02); }
//   100% { transform: scale(1); }
// `;

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const PageContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   min-height: 100vh;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

// const HeroSection = styled.section`
//   background: linear-gradient(135deg, rgba(41, 128, 185, 0.9) 0%, rgba(52, 152, 219, 0.9) 100%),
//     url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
//   background-size: cover;
//   background-position: center;
//   background-attachment: fixed;
//   height: 500px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   border-radius: 15px;
//   margin-bottom: 2rem;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
//   position: relative;
//   overflow: hidden;
//   animation: ${fadeIn} 0.8s ease-out;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: linear-gradient(
//       to right,
//       rgba(0, 0, 0, 0.3) 0%,
//       rgba(0, 0, 0, 0) 50%,
//       rgba(0, 0, 0, 0.3) 100%
//     );
//     pointer-events: none;
//   }
// `;

// const HeroTitle = styled.h1`
//   font-size: 3.5rem;
//   color: white;
//   margin-bottom: 1.5rem;
//   text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
//   font-weight: 800;
//   letter-spacing: 1px;
//   position: relative;
//   z-index: 1;
//   animation: ${fadeIn} 0.8s ease-out 0.2s both;

//   @media (max-width: 768px) {
//     font-size: 2.5rem;
//   }
// `;

// const HeroSubtitle = styled.p`
//   font-size: 1.5rem;
//   color: rgba(255, 255, 255, 0.95);
//   margin-bottom: 2.5rem;
//   max-width: 800px;
//   line-height: 1.6;
//   position: relative;
//   z-index: 1;
//   animation: ${fadeIn} 0.8s ease-out 0.4s both;
//   font-weight: 300;

//   @media (max-width: 768px) {
//     font-size: 1.2rem;
//     padding: 0 20px;
//   }
// `;

// const SearchCard = styled.div`
//   background-color: white;
//   border-radius: 16px;
//   box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
//   padding: 40px;
//   max-width: 800px;
//   margin: 0 auto;
//   position: relative;
//   z-index: 10;
//   margin-top: -100px;
//   border: 1px solid rgba(255, 255, 255, 0.3);
//   backdrop-filter: blur(10px);
//   animation: ${fadeIn} 0.8s ease-out 0.6s both;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
//   }

//   @media (max-width: 768px) {
//     padding: 30px 20px;
//     margin-top: -80px;
//   }
// `;

// const Title = styled.h1`
//   text-align: center;
//   color: #2c3e50;
//   margin-bottom: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 2.2rem;
//   font-weight: 700;
//   letter-spacing: -0.5px;
  
//   svg {
//     margin-right: 15px;
//     color: #4c51bf;
//     font-size: 1.8rem;
//   }

//   @media (max-width: 768px) {
//     font-size: 1.8rem;
    
//     svg {
//       font-size: 1.5rem;
//     }
//   }
// `;

// const FormGrid = styled.form`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 25px;
//   animation: ${fadeIn} 0.8s ease-out 0.8s both;
// `;

// const InputWrapper = styled.div`
//   position: relative;
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//   }
// `;

// const InputIcon = styled.div`
//   position: absolute;
//   left: 18px;
//   top: 50%;
//   transform: translateY(-50%);
//   color: #7f8c8d;
//   font-size: 1.1rem;
//   transition: color 0.3s ease;
// `;

// const StyledInput = styled.input`
//   width: 100%;
//   padding: 18px 18px 18px 50px;
//   border: 2px solid #e0e6ed;
//   border-radius: 10px;
//   font-size: 16px;
//   transition: all 0.3s ease;
//   background-color: #f8fafc;
//   color: #2d3748;
//   font-weight: 500;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

//   &:focus {
//     outline: none;
//     border-color: #3498db;
//     box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
//     background-color: white;
    
//     ~ ${InputIcon} {
//       color: #3498db;
//     }
//   }

//   &::placeholder {
//     color: #a0aec0;
//     font-weight: normal;
//   }
// `;

// const SearchButton = styled.button`
//   grid-column: 1 / -1;
//   padding: 18px;
//   background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
//   color: white;
//   border: none;
//   border-radius: 10px;
//   font-size: 18px;
//   font-weight: 600;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.3s ease;
//   box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
//   letter-spacing: 0.5px;
//   text-transform: uppercase;

//   &:hover {
//     background: linear-gradient(135deg, #2980b9 0%, #1a252f 100%);
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
//     animation: ${pulse} 1.5s infinite;
//   }

//   &:active {
//     transform: translateY(0);
//   }

//   svg {
//     margin-right: 12px;
//     font-size: 1.2rem;
//   }

//   &:disabled {
//     background: #bdc3c7;
//     cursor: not-allowed;
//     transform: none;
//     box-shadow: none;
//     animation: none;
//   }

//   @media (max-width: 768px) {
//     padding: 16px;
//     font-size: 16px;
//   }
// `;

// const ErrorMessage = styled.div`
//   color: #e74c3c;
//   text-align: center;
//   margin-bottom: 25px;
//   padding: 15px;
//   background-color: rgba(231, 76, 60, 0.1);
//   border-radius: 8px;
//   border-left: 4px solid #e74c3c;
//   font-weight: 500;
//   animation: ${fadeIn} 0.5s ease-out;
// `;

// const Home = () => {
//   const navigate = useNavigate();
  
//   const [locations, setLocations] = useState([]);
//   const [searchParams, setSearchParams] = useState({
//     startLocation: '',
//     endLocation: '',
//     date: new Date().toISOString().split('T')[0]
//   });
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('http://localhost:7000/api/v1/routes?limit=1000');
//         if (!response.ok) throw new Error('Failed to fetch locations');
        
//         const data = await response.json();
        
//         // Extract unique locations from all routes
//         const allLocations = data.data.flatMap(route => [
//           route.startLocation, 
//           route.endLocation
//         ]);
        
//         const uniqueLocations = [...new Set(allLocations)];
//         setLocations(uniqueLocations);
//       } catch (err) {
//         console.error('Error fetching locations:', err);
//       }
//     };

//     fetchLocations();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSearchParams(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     if (!searchParams.startLocation || !searchParams.endLocation) {
//       setError('Please select both start and end locations');
//       setIsLoading(false);
//       return;
//     }

//     if (searchParams.startLocation === searchParams.endLocation) {
//       setError('Start and end locations cannot be the same');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Format the date to YYYY-MM-DD
//       const formattedDate = searchParams.date ? new Date(searchParams.date).toISOString().split('T')[0] : '';
      
//       const response = await fetch(
//         `http://localhost:7000/api/v1/schedules/search?startLocation=${encodeURIComponent(searchParams.startLocation)}&endLocation=${encodeURIComponent(searchParams.endLocation)}&date=${formattedDate}`
//       );
      
//       if (!response.ok) {
//         throw new Error('No schedules found for the selected criteria');
//       }
      
//       const result = await response.json();
//       const schedules = result.data || [];

//       if (schedules.length === 0) {
//         setError('No buses available for the selected route and date');
//         setIsLoading(false);
//         return;
//       }

//       navigate('/bus-list', { 
//         state: { 
//           schedules,
//           searchParams 
//         } 
//       });
//     } catch (err) {
//       setError(err.message || 'An error occurred while searching for buses');
//       setIsLoading(false);
//     }
//   };

//   const isSearchDisabled = !searchParams.startLocation || !searchParams.endLocation || isLoading;

//   return (
//     <>
//       <HeroSection>
//         <HeroTitle>Welcome to Amaam Travels</HeroTitle>
//         <HeroSubtitle>
//           Experience comfortable, safe, and reliable bus travel across the country. 
//           Book your tickets in just a few clicks!
//         </HeroSubtitle>
//       </HeroSection>

//       <PageContainer>
//         <SearchCard>
//           <Title>
//             <FaBus /> Bus Ticket Booking
//           </Title>

//           {error && <ErrorMessage>{error}</ErrorMessage>}

//           <FormGrid onSubmit={handleSubmit}>
//             <InputWrapper>
//               <InputIcon><FaMapMarkerAlt /></InputIcon>
//               <StyledInput 
//                 name="startLocation"
//                 list="startLocations"
//                 placeholder="From (City or Station)"
//                 value={searchParams.startLocation}
//                 onChange={handleInputChange}
//                 required
//               />
//               <datalist id="startLocations">
//                 {locations.map((location, index) => (
//                   <option key={`start-${index}`} value={location} />
//                 ))}
//               </datalist>
//             </InputWrapper>

//             <InputWrapper>
//               <InputIcon><FaMapMarkerAlt /></InputIcon>
//               <StyledInput 
//                 name="endLocation"
//                 list="endLocations"
//                 placeholder="To (City or Station)"
//                 value={searchParams.endLocation}
//                 onChange={handleInputChange}
//                 required
//               />
//               <datalist id="endLocations">
//                 {locations.map((location, index) => (
//                   <option key={`end-${index}`} value={location} />
//                 ))}
//               </datalist>
//             </InputWrapper>

//             <InputWrapper>
//               <InputIcon><FaCalendarAlt /></InputIcon>
//               <StyledInput 
//                 type="date"
//                 name="date"
//                 value={searchParams.date}
//                 onChange={handleInputChange}
//                 min={new Date().toISOString().split('T')[0]}
//                 required
//               />
//             </InputWrapper>

//             <SearchButton 
//               type="submit" 
//               disabled={isSearchDisabled}
//             >
//               {isLoading ? (
//                 'Searching...'
//               ) : (
//                 <>
//                   <FaSearch /> Search Buses
//                 </>
//               )}
//             </SearchButton>
//           </FormGrid>
//         </SearchCard>
//       </PageContainer>
//     </>
//   );
// };

// export default Home;

// // const Home = () => {
// //   const navigate = useNavigate();
  
// //   const [routes, setRoutes] = useState([]);
// //   const [searchParams, setSearchParams] = useState({
// //     startLocation: '',
// //     endLocation: '',
// //     date: ''
// //   });
// //   const [error, setError] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchRoutes = async () => {
// //       try {
// //         const response = await fetch('http://localhost:7000/api/v1/routes?skip=0&limit=10&sortBy=startLocation');
// //         if (!response.ok) throw new Error('Failed to fetch routes');
        
// //         const data = await response.json();
// //         setRoutes(data.data || []);
// //       } catch (err) {
// //         setError('Unable to load routes. Please check your connection.');
// //       }
// //     };

// //     fetchRoutes();
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setSearchParams(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setIsLoading(true);

// //     if (!searchParams.startLocation || !searchParams.endLocation) {
// //       setError('Please select both start and end locations');
// //       setIsLoading(false);
// //       return;
// //     }

// //     if (searchParams.startLocation === searchParams.endLocation) {
// //       setError('Start and end locations cannot be the same');
// //       setIsLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await fetch(
// //         `http://localhost:7000/api/v1/routes/search?startLocation=${encodeURIComponent(searchParams.startLocation)}&endLocation=${encodeURIComponent(searchParams.endLocation)}`
// //       );
      
// //       if (!response.ok) {
// //         throw new Error('No routes found for the selected locations');
// //       }
      
// //       const result = await response.json();
// //       const filteredRoutes = result.data || [];

// //       if (filteredRoutes.length === 0) {
// //         setError('No routes found for the selected locations');
// //         setIsLoading(false);
// //         return;
// //       }

// //       navigate('/bus-list', { 
// //         state: { 
// //           routes: filteredRoutes, 
// //           searchParams 
// //         } 
// //       });
// //     } catch (err) {
// //       setError(err.message || 'An error occurred while searching for routes');
// //       setIsLoading(false);
// //     }
// //   };

// //   const isSearchDisabled = !searchParams.startLocation || !searchParams.endLocation || isLoading;

// //   // Extract unique locations for datalist
// //   const uniqueLocations = [...new Set(
// //     routes.flatMap(route => [route.startLocation, route.endLocation])
// //   )].filter(Boolean).sort();

// //   return (
// //     <>
// //       <HeroSection>
// //         <HeroTitle>Welcome to Amaam Travels</HeroTitle>
// //         <HeroSubtitle>
// //           Experience comfortable, safe, and reliable bus travel across the country. 
// //           Book your tickets in just a few clicks!
// //         </HeroSubtitle>
// //       </HeroSection>

// //       <PageContainer>
// //         <SearchCard>
// //           <Title>
// //             <FaBus /> Bus Ticket Booking
// //           </Title>

// //           {error && <ErrorMessage>{error}</ErrorMessage>}

// //           <FormGrid onSubmit={handleSubmit}>
// //             <InputWrapper>
// //               <InputIcon><FaMapMarkerAlt /></InputIcon>
// //               <StyledInput 
// //                 name="startLocation"
// //                 list="startLocations"
// //                 placeholder="From (City or Station)"
// //                 value={searchParams.startLocation}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //               <datalist id="startLocations">
// //                 {uniqueLocations.map((location, index) => (
// //                   <option key={`start-${index}`} value={location} />
// //                 ))}
// //               </datalist>
// //             </InputWrapper>

// //             <InputWrapper>
// //               <InputIcon><FaMapMarkerAlt /></InputIcon>
// //               <StyledInput 
// //                 name="endLocation"
// //                 list="endLocations"
// //                 placeholder="To (City or Station)"
// //                 value={searchParams.endLocation}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //               <datalist id="endLocations">
// //                 {uniqueLocations.map((location, index) => (
// //                   <option key={`end-${index}`} value={location} />
// //                 ))}
// //               </datalist>
// //             </InputWrapper>

// //             <InputWrapper>
// //               <InputIcon><FaCalendarAlt /></InputIcon>
// //               <StyledInput 
// //                 type="date"
// //                 name="date"
// //                 value={searchParams.date}
// //                 onChange={handleInputChange}
// //                 min={new Date().toISOString().split('T')[0]}
// //                 required
// //               />
// //             </InputWrapper>

// //             <SearchButton 
// //               type="submit" 
// //               disabled={isSearchDisabled}
// //             >
// //               {isLoading ? (
// //                 'Searching...'
// //               ) : (
// //                 <>
// //                   <FaSearch /> Search Buses
// //                 </>
// //               )}
// //             </SearchButton>
// //           </FormGrid>
// //         </SearchCard>
// //       </PageContainer>
// //     </>
// //   );
// // };

// // export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaBus, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

// Animation for subtle hover effects
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(41, 128, 185, 0.9) 0%, rgba(52, 152, 219, 0.9) 100%),
    url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  font-weight: 800;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2.5rem;
  max-width: 800px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 20px;
  }
`;

const SearchCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  margin-top: -100px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.8s ease-out 0.6s both;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin-top: -80px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  
  svg {
    margin-right: 15px;
    color: #4c51bf;
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    
    svg {
      font-size: 1.5rem;
    }
  }
`;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  animation: ${fadeIn} 0.8s ease-out 0.8s both;
`;

const InputWrapper = styled.div`
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  font-size: 1.1rem;
  transition: color 0.3s ease;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 18px 18px 18px 50px;
  border: 2px solid #e0e6ed;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  color: #2d3748;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    background-color: white;
    
    ~ ${InputIcon} {
      color: #3498db;
    }
  }

  &::placeholder {
    color: #a0aec0;
    font-weight: normal;
  }
`;

const SearchButton = styled.button`
  grid-column: 1 / -1;
  padding: 18px;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  letter-spacing: 0.5px;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(135deg, #2980b9 0%, #1a252f 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    animation: ${pulse} 1.5s infinite;
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    margin-right: 12px;
    font-size: 1.2rem;
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    animation: none;
  }

  @media (max-width: 768px) {
    padding: 16px;
    font-size: 16px;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  margin-bottom: 25px;
  padding: 15px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
  font-weight: 500;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Home = () => {
  const navigate = useNavigate();
  
  const [locations, setLocations] = useState([]);
  const [searchParams, setSearchParams] = useState({
    startLocation: '',
    endLocation: '',
    date: new Date().toISOString().split('T')[0] // Default to today's date
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/v1/routes?skip=0&limit=100&sortBy=startLocation');
        if (!response.ok) throw new Error('Failed to fetch routes');
        
        const data = await response.json();
        const routes = data.data || [];
        
        // Extract unique locations from routes
        const uniqueLocations = [...new Set(
          routes.flatMap(route => [route.startLocation, route.endLocation])
        )].filter(Boolean).sort();
        
        setLocations(uniqueLocations);
      } catch (err) {
        setError('Unable to load locations. Please check your connection.');
      }
    };

    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user changes input
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!searchParams.startLocation || !searchParams.endLocation || !searchParams.date) {
      setError('Please provide all search details');
      setIsLoading(false);
      return;
    }

    if (searchParams.startLocation === searchParams.endLocation) {
      setError('Start and end locations cannot be the same');
      setIsLoading(false);
      return;
    }

    try {
      // Updated to use the correct schedules search endpoint
      const response = await fetch(
        `http://localhost:7000/api/v1/schedules/search?startLocation=${encodeURIComponent(searchParams.startLocation)}&endLocation=${encodeURIComponent(searchParams.endLocation)}}`
      );
      
      if (!response.ok) {
        throw new Error('No schedules found for the selected criteria');
      }
      
      const result = await response.json();
      const schedules = result.data || [];

      if (schedules.length === 0) {
        setError('No buses available for the selected route and date');
        setIsLoading(false);
        return;
      }

      navigate('/bus-list', { 
        state: { 
          schedules: schedules, 
          searchParams 
        } 
      });
    } catch (err) {
      setError(err.message || 'An error occurred while searching for buses');
      setIsLoading(false);
    }
  };

  const isSearchDisabled = !searchParams.startLocation || !searchParams.endLocation || !searchParams.date || isLoading;

  return (
    <>
      <HeroSection>
        <HeroTitle>Welcome to Amaam Travels</HeroTitle>
        <HeroSubtitle>
          Experience comfortable, safe, and reliable bus travel across the country. 
          Book your tickets in just a few clicks!
        </HeroSubtitle>
      </HeroSection>

      <PageContainer>
        <SearchCard>
          <Title>
            <FaBus /> Bus Ticket Booking
          </Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGrid onSubmit={handleSubmit}>
            <InputWrapper>
              <InputIcon><FaMapMarkerAlt /></InputIcon>
              <StyledInput 
                name="startLocation"
                list="startLocations"
                placeholder="From (City or Station)"
                value={searchParams.startLocation}
                onChange={handleInputChange}
                required
              />
              <datalist id="startLocations">
                {locations.map((location, index) => (
                  <option key={`start-${index}`} value={location} />
                ))}
              </datalist>
            </InputWrapper>

            <InputWrapper>
              <InputIcon><FaMapMarkerAlt /></InputIcon>
              <StyledInput 
                name="endLocation"
                list="endLocations"
                placeholder="To (City or Station)"
                value={searchParams.endLocation}
                onChange={handleInputChange}
                required
              />
              <datalist id="endLocations">
                {locations.map((location, index) => (
                  <option key={`end-${index}`} value={location} />
                ))}
              </datalist>
            </InputWrapper>

            <InputWrapper>
              <InputIcon><FaCalendarAlt /></InputIcon>
              <StyledInput 
                type="date"
                name="date"
                value={searchParams.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </InputWrapper>

            <SearchButton 
              type="submit" 
              disabled={isSearchDisabled}
            >
              {isLoading ? (
                'Searching...'
              ) : (
                <>
                  <FaSearch /> Search Buses
                </>
              )}
            </SearchButton>
          </FormGrid>
        </SearchCard>
      </PageContainer>
    </>
  );
};

export default Home;