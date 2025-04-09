// // import React, { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import {
// //   FiCalendar,
// //   FiMap,
// //   FiBus,
// //   FiTrendingUp,
// //   FiTrendingDown,
// //   FiPieChart,
// //   FiBarChart2,
// //   FiRefreshCw,
// //   FiClock,
// //   FiUsers
// // } from 'react-icons/fi';
// // import Chart from 'react-apexcharts';
// // import { FaBus, FaRoute, FaCalendarAlt, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

// // // API URLs
// // const API_URLS = {
// //   buses: 'http://localhost:7000/api/v1/buses?status=',
// //   routes: 'http://localhost:7000/api/v1/routes?skip=0&limit=1000&sortBy=startLocation',
// //   schedules: 'http://localhost:7000/api/v1/schedules',
// // };

// // // Styled Components
// // const Container = styled.div`
// //   padding: 2rem;
// //   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   max-width: 1400px;
// //   margin: 0 auto;
// // `;

// // const Header = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   margin-bottom: 2rem;

// //   @media (min-width: 768px) {
// //     flex-direction: row;
// //     justify-content: space-between;
// //     align-items: center;
// //   }
// // `;

// // const Title = styled.h1`
// //   font-size: 1.8rem;
// //   font-weight: 600;
// //   color: #2d3748;
// //   margin-bottom: 0.5rem;
// // `;

// // const Subtitle = styled.p`
// //   color: #718096;
// //   font-size: 0.9rem;
// // `;

// // const Button = styled.button`
// //   display: flex;
// //   align-items: center;
// //   gap: 0.5rem;
// //   padding: 0.5rem 1rem;
// //   border-radius: 0.375rem;
// //   font-weight: 500;
// //   cursor: pointer;
// //   transition: all 0.2s ease;
// //   background-color: #4299e1;
// //   color: white;
// //   border: none;

// //   &:hover {
// //     background-color: #3182ce;
// //   }

// //   &:disabled {
// //     opacity: 0.7;
// //     cursor: not-allowed;
// //   }
// // `;

// // const SummaryContainer = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(1, 1fr);
// //   gap: 1rem;
// //   margin-bottom: 2rem;

// //   @media (min-width: 768px) {
// //     grid-template-columns: repeat(4, 1fr);
// //   }
// // `;

// // const SummaryCard = styled.div`
// //   background-color: white;
// //   border-radius: 0.5rem;
// //   padding: 1.5rem;
// //   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// //   display: flex;
// //   flex-direction: column;
// //   border-top: 4px solid ${props => props.color || '#4299e1'};
// // `;

// // const SummaryTitle = styled.h3`
// //   font-size: 0.875rem;
// //   font-weight: 500;
// //   color: #718096;
// //   margin-bottom: 0.5rem;
// //   display: flex;
// //   align-items: center;
// //   gap: 0.5rem;
// // `;

// // const SummaryValue = styled.span`
// //   font-size: 1.8rem;
// //   font-weight: 600;
// //   color: #2d3748;
// //   margin-bottom: 0.5rem;
// // `;

// // const SummaryChange = styled.span`
// //   font-size: 0.75rem;
// //   color: ${props => props.positive ? '#38a169' : props.negative ? '#e53e3e' : '#718096'};
// //   display: flex;
// //   align-items: center;
// //   gap: 0.25rem;
// // `;

// // const ChartsContainer = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(1, 1fr);
// //   gap: 1.5rem;
// //   margin-bottom: 2rem;

// //   @media (min-width: 1024px) {
// //     grid-template-columns: repeat(2, 1fr);
// //   }
// // `;

// // const ChartCard = styled.div`
// //   background-color: white;
// //   border-radius: 0.5rem;
// //   padding: 1.5rem;
// //   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// // `;

// // const ChartHeader = styled.div`
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   margin-bottom: 1rem;
// // `;

// // const ChartTitle = styled.h3`
// //   font-size: 1rem;
// //   font-weight: 600;
// //   color: #2d3748;
// //   display: flex;
// //   align-items: center;
// //   gap: 0.5rem;
// // `;

// // const LoadingSpinner = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   height: 300px;

// //   &::after {
// //     content: '';
// //     width: 3rem;
// //     height: 3rem;
// //     border: 3px solid #e2e8f0;
// //     border-top-color: #4299e1;
// //     border-radius: 50%;
// //     animation: spin 1s linear infinite;
// //   }

// //   @keyframes spin {
// //     to {
// //       transform: rotate(360deg);
// //     }
// //   }
// // `;

// // // Helper functions
// // async function fetchData(url) {
// //   const response = await fetch(url);
// //   if (!response.ok) {
// //     throw new Error('Failed to fetch data');
// //   }
// //   return response.json();
// // }

// // function calculatePercentageChange(current, previous) {
// //   if (previous === 0) return 0;
// //   return ((current - previous) / previous) * 100;
// // }

// // function formatDuration(minutes) {
// //   const hours = Math.floor(minutes / 60);
// //   const mins = minutes % 60;
// //   return `${hours}h ${mins}m`;
// // }

// // const Analytics = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [data, setData] = useState({
// //     buses: [],
// //     routes: [],
// //     schedules: [],
// //   });

// //   const fetchAllData = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const [buses, routes, schedules] = await Promise.all([
// //         fetchData(API_URLS.buses),
// //         fetchData(API_URLS.routes),
// //         fetchData(API_URLS.schedules),
// //       ]);

// //       setData({
// //         buses: buses.data || buses,
// //         routes: routes.data || routes,
// //         schedules: schedules.data || schedules,
// //       });
// //     } catch (err) {
// //       setError(err.message);
// //       console.error('Error fetching data:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAllData();
// //   }, []);

// //   // Calculate summary statistics
// //   const calculateSummaries = () => {
// //     const totalBuses = data.buses.length;
// //     const activeBuses = data.buses.filter(bus => bus.status === 'active').length;
// //     const totalRoutes = data.routes.length;
// //     const totalDistance = data.routes.reduce((sum, route) => sum + (parseFloat(route.distance) || 0), 0);
// //     const avgDistance = totalRoutes > 0 ? (totalDistance / totalRoutes).toFixed(1) : 0;
// //     const totalDuration = data.routes.reduce((sum, route) => sum + (parseFloat(route.estimatedDuration) || 0), 0);
// //     const avgDuration = totalRoutes > 0 ? (totalDuration / totalRoutes) : 0;
// //     const totalSchedules = data.schedules.length;
// //     const upcomingSchedules = data.schedules.filter(s =>
// //       s.status === 'scheduled' && new Date(s.departureTime) > new Date()
// //     ).length;

// //     return {
// //       totalBuses,
// //       activeBuses,
// //       totalRoutes,
// //       totalDistance,
// //       avgDistance,
// //       avgDuration,
// //       totalSchedules,
// //       upcomingSchedules,
// //     };
// //   };

// //   const summaries = calculateSummaries();

// //   // Prepare chart data
// //   const prepareBusStatusChart = () => {
// //     const statusCounts = {
// //       active: 0,
// //       maintenance: 0,
// //       inactive: 0
// //     };

// //     data.buses.forEach(bus => {
// //       if (bus.status && statusCounts.hasOwnProperty(bus.status)) {
// //         statusCounts[bus.status]++;
// //       }
// //     });

// //     return {
// //       options: {
// //         labels: ['Active', 'Maintenance', 'Inactive'],
// //         colors: ['#38a169', '#dd6b20', '#e53e3e'],
// //         legend: {
// //           position: 'bottom'
// //         }
// //       },
// //       series: Object.values(statusCounts)
// //     };
// //   };

// //   const prepareRouteDistanceChart = () => {
// //     const routesByDistance = [...data.routes]
// //       .sort((a, b) => b.distance - a.distance)
// //       .slice(0, 5);

// //     return {
// //       options: {
// //         chart: {
// //           type: 'bar',
// //           height: 350,
// //           toolbar: {
// //             show: false
// //           }
// //         },
// //         plotOptions: {
// //           bar: {
// //             horizontal: true,
// //           },
// //         },
// //         dataLabels: {
// //           enabled: false
// //         },
// //         xaxis: {
// //           categories: routesByDistance.map(route =>
// //             `${route.startLocation} - ${route.endLocation}`
// //           ),
// //           title: {
// //             text: 'Distance (km)'
// //           }
// //         },
// //         yaxis: {
// //           labels: {
// //             style: {
// //               fontSize: '12px'
// //             }
// //           }
// //         },
// //         colors: ['#4299e1']
// //       },
// //       series: [{
// //         name: 'Distance',
// //         data: routesByDistance.map(route => route.distance)
// //       }]
// //     };
// //   };

// //   const prepareScheduleStatusChart = () => {
// //     const statusCounts = {
// //       scheduled: 0,
// //       cancelled: 0,
// //       departed: 0,
// //       arrived: 0
// //     };

// //     data.schedules.forEach(schedule => {
// //       if (schedule.status && statusCounts.hasOwnProperty(schedule.status)) {
// //         statusCounts[schedule.status]++;
// //       }
// //     });

// //     return {
// //       options: {
// //         chart: {
// //           type: 'bar',
// //           height: 350,
// //           toolbar: {
// //             show: false
// //           }
// //         },
// //         plotOptions: {
// //           bar: {
// //             horizontal: false,
// //             columnWidth: '55%',
// //             endingShape: 'rounded'
// //           },
// //         },
// //         dataLabels: {
// //           enabled: false
// //         },
// //         stroke: {
// //           show: true,
// //           width: 2,
// //           colors: ['transparent']
// //         },
// //         xaxis: {
// //           categories: ['Scheduled', 'Cancelled', 'Departed', 'Arrived']
// //         },
// //         yaxis: {
// //           title: {
// //             text: 'Count'
// //           }
// //         },
// //         fill: {
// //           opacity: 1,
// //           colors: ['#4299e1', '#e53e3e', '#dd6b20', '#38a169']
// //         },
// //         colors: ['#4299e1', '#e53e3e', '#dd6b20', '#38a169']
// //       },
// //       series: [{
// //         name: 'Schedules',
// //         data: Object.values(statusCounts)
// //       }]
// //     };
// //   };

// //   return (
// //     <Container>
// //       <Header>
// //         <div>
// //           <Title>Transport Analytics Dashboard</Title>
// //           <Subtitle>Comprehensive overview of your transportation operations</Subtitle>
// //         </div>
// //         <Button onClick={fetchAllData}>
// //           <FiRefreshCw /> Refresh Data
// //         </Button>
// //       </Header>

// //       {error && (
// //         <div style={{
// //           padding: '1rem',
// //           backgroundColor: '#fff5f5',
// //           color: '#e53e3e',
// //           borderRadius: '0.375rem',
// //           marginBottom: '2rem'
// //         }}>
// //           Error: {error}
// //         </div>
// //       )}

// //       {loading ? (
// //         <LoadingSpinner />
// //       ) : (
// //         <>
// //           <SummaryContainer>
// //             <SummaryCard color="#4299e1">
// //               <SummaryTitle>
// //                 <FaBus /> Total Buses
// //               </SummaryTitle>
// //               <SummaryValue>{summaries.totalBuses}</SummaryValue>
// //               <SummaryChange>
// //                 <FiUsers /> {summaries.activeBuses} active
// //               </SummaryChange>
// //             </SummaryCard>

// //             <SummaryCard color="#38a169">
// //               <SummaryTitle>
// //                 <FiMap /> Total Routes
// //               </SummaryTitle>
// //               <SummaryValue>{summaries.totalRoutes}</SummaryValue>
// //               <SummaryChange>
// //                 <FiClock /> Avg. {summaries.avgDistance} km, {formatDuration(summaries.avgDuration)}
// //               </SummaryChange>
// //             </SummaryCard>

// //             <SummaryCard color="#dd6b20">
// //               <SummaryTitle>
// //                 <FiCalendar /> Schedules
// //               </SummaryTitle>
// //               <SummaryValue>{summaries.totalSchedules}</SummaryValue>
// //               <SummaryChange>
// //                 {summaries.upcomingSchedules} upcoming trips
// //               </SummaryChange>
// //             </SummaryCard>
// //           </SummaryContainer>

// //           <ChartsContainer>
// //             <ChartCard>
// //               <ChartHeader>
// //                 <ChartTitle>
// //                   <FiPieChart /> Bus Fleet Status
// //                 </ChartTitle>
// //               </ChartHeader>
// //               <Chart
// //                 options={prepareBusStatusChart().options}
// //                 series={prepareBusStatusChart().series}
// //                 type="donut"
// //                 height={350}
// //               />
// //             </ChartCard>

// //             <ChartCard>
// //               <ChartHeader>
// //                 <ChartTitle>
// //                   <FiBarChart2 /> Top 5 Longest Routes
// //                 </ChartTitle>
// //               </ChartHeader>
// //               <Chart
// //                 options={prepareRouteDistanceChart().options}
// //                 series={prepareRouteDistanceChart().series}
// //                 type="bar"
// //                 height={350}
// //               />
// //             </ChartCard>
// //           </ChartsContainer>

// //           <ChartsContainer>
// //             <ChartCard>
// //               <ChartHeader>
// //                 <ChartTitle>
// //                   <FiBarChart2 /> Schedule Status
// //                 </ChartTitle>
// //               </ChartHeader>
// //               <Chart
// //                 options={prepareScheduleStatusChart().options}
// //                 series={prepareScheduleStatusChart().series}
// //                 type="bar"
// //                 height={350}
// //               />
// //             </ChartCard>
// //           </ChartsContainer>
// //         </>
// //       )}
// //     </Container>
// //   );
// // };

// // export default Analytics;
// import React, { useState, useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import {
//   FiCalendar,
//   FiMap,
//   FiBus,
//   FiTrendingUp,
//   FiTrendingDown,
//   FiPieChart,
//   FiBarChart2,
//   FiRefreshCw,
//   FiClock,
//   FiUsers,
//   FiDownload
// } from 'react-icons/fi';
// import Chart from 'react-apexcharts';
// import { FaBus, FaRoute, FaCalendarAlt, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// // API URLs
// const API_URLS = {
//   buses: 'http://localhost:7000/api/v1/buses?status=',
//   routes: 'http://localhost:7000/api/v1/routes?skip=0&limit=1000&sortBy=startLocation',
//   schedules: 'http://localhost:7000/api/v1/schedules',
//   payments: 'http://localhost:7000/api/v1/payments/all-payments',
// };

// // Styled Components
// const Container = styled.div`
//   padding: 2rem;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   max-width: 1400px;
//   margin: 0 auto;
// `;

// const Header = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 2rem;

//   @media (min-width: 768px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   }
// `;

// const Title = styled.h1`
//   font-size: 1.8rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin-bottom: 0.5rem;
// `;

// const Subtitle = styled.p`
//   color: #718096;
//   font-size: 0.9rem;
// `;

// const Button = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   border-radius: 0.375rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   background-color: #4299e1;
//   color: white;
//   border: none;

//   &:hover {
//     background-color: #3182ce;
//   }

//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//   }
// `;

// const SummaryContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   gap: 1rem;
//   margin-bottom: 2rem;

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(4, 1fr);
//   }
// `;

// const SummaryCard = styled.div`
//   background-color: white;
//   border-radius: 0.5rem;
//   padding: 1.5rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   border-top: 4px solid ${props => props.color || '#4299e1'};
// `;

// const SummaryTitle = styled.h3`
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: #718096;
//   margin-bottom: 0.5rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const SummaryValue = styled.span`
//   font-size: 1.8rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin-bottom: 0.5rem;
// `;

// const SummaryChange = styled.span`
//   font-size: 0.75rem;
//   color: ${props => props.positive ? '#38a169' : props.negative ? '#e53e3e' : '#718096'};
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
// `;

// const ChartsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   gap: 1.5rem;
//   margin-bottom: 2rem;

//   @media (min-width: 1024px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const ChartCard = styled.div`
//   background-color: white;
//   border-radius: 0.5rem;
//   padding: 1.5rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

// const ChartHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const ChartTitle = styled.h3`
//   font-size: 1rem;
//   font-weight: 600;
//   color: #2d3748;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const LoadingSpinner = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 300px;

//   &::after {
//     content: '';
//     width: 3rem;
//     height: 3rem;
//     border: 3px solid #e2e8f0;
//     border-top-color: #4299e1;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;
//   }

//   @keyframes spin {
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `;

// // Helper functions
// async function fetchData(url) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return response.json();
// }

// function calculatePercentageChange(current, previous) {
//   if (previous === 0) return 0;
//   return ((current - previous) / previous) * 100;
// }

// function formatDuration(minutes) {
//   const hours = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return `${hours}h ${mins}m`;
// }

// const Analytics = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState({
//     buses: [],
//     routes: [],
//     schedules: [],
//     payments: [],
//   });
//   const dashboardRef = useRef(null);

//   const fetchAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [buses, routes, schedules] = await Promise.all([
//         fetchData(API_URLS.buses),
//         fetchData(API_URLS.routes),
//         fetchData(API_URLS.schedules),
//         fetchData(API_URLS.payments),
//       ]);

//       setData({
//         buses: buses.data || buses,
//         routes: routes.data || routes,
//         schedules: schedules.data || schedules,
//         payments: payments.data || payments,
//       });
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   // Calculate summary statistics
//   const calculateSummaries = () => {
//     const totalBuses = data.buses.length;
//     const activeBuses = data.buses.filter(bus => bus.status === 'active').length;
//     const totalRoutes = data.routes.length;
//     const totalDistance = data.routes.reduce((sum, route) => sum + (parseFloat(route.distance) || 0), 0);
//     const avgDistance = totalRoutes > 0 ? (totalDistance / totalRoutes).toFixed(1) : 0;
//     const totalDuration = data.routes.reduce((sum, route) => sum + (parseFloat(route.estimatedDuration) || 0), 0);
//     const avgDuration = totalRoutes > 0 ? (totalDuration / totalRoutes) : 0;
//     const totalSchedules = data.schedules.length;
//     const upcomingSchedules = data.schedules.filter(s =>
//       s.status === 'scheduled' && new Date(s.departureTime) > new Date()
//     ).length;

//     return {
//       totalBuses,
//       activeBuses,
//       totalRoutes,
//       totalDistance,
//       avgDistance,
//       avgDuration,
//       totalSchedules,
//       upcomingSchedules,
//     };
//   };

//   const summaries = calculateSummaries();

//   // Prepare chart data
//   const prepareBusStatusChart = () => {
//     const statusCounts = {
//       active: 0,
//       maintenance: 0,
//       inactive: 0
//     };

//     data.buses.forEach(bus => {
//       if (bus.status && statusCounts.hasOwnProperty(bus.status)) {
//         statusCounts[bus.status]++;
//       }
//     });

//     return {
//       options: {
//         labels: ['Active', 'Maintenance', 'Inactive'],
//         colors: ['#38a169', '#dd6b20', '#e53e3e'],
//         legend: {
//           position: 'bottom'
//         }
//       },
//       series: Object.values(statusCounts)
//     };
//   };

//   const prepareRouteDistanceChart = () => {
//     const routesByDistance = [...data.routes]
//       .sort((a, b) => b.distance - a.distance)
//       .slice(0, 5);

//     return {
//       options: {
//         chart: {
//           type: 'bar',
//           height: 350,
//           toolbar: {
//             show: false
//           }
//         },
//         plotOptions: {
//           bar: {
//             horizontal: true,
//           },
//         },
//         dataLabels: {
//           enabled: false
//         },
//         xaxis: {
//           categories: routesByDistance.map(route =>
//             `${route.startLocation} - ${route.endLocation}`
//           ),
//           title: {
//             text: 'Distance (km)'
//           }
//         },
//         yaxis: {
//           labels: {
//             style: {
//               fontSize: '12px'
//             }
//           }
//         },
//         colors: ['#4299e1']
//       },
//       series: [{
//         name: 'Distance',
//         data: routesByDistance.map(route => route.distance)
//       }]
//     };
//   };

//   const prepareScheduleStatusChart = () => {
//     const statusCounts = {
//       scheduled: 0,
//       cancelled: 0,
//       departed: 0,
//       arrived: 0
//     };

//     data.schedules.forEach(schedule => {
//       if (schedule.status && statusCounts.hasOwnProperty(schedule.status)) {
//         statusCounts[schedule.status]++;
//       }
//     });

//     return {
//       options: {
//         chart: {
//           type: 'bar',
//           height: 350,
//           toolbar: {
//             show: false
//           }
//         },
//         plotOptions: {
//           bar: {
//             horizontal: false,
//             columnWidth: '55%',
//             endingShape: 'rounded'
//           },
//         },
//         dataLabels: {
//           enabled: false
//         },
//         stroke: {
//           show: true,
//           width: 2,
//           colors: ['transparent']
//         },
//         xaxis: {
//           categories: ['Scheduled', 'Cancelled', 'Departed', 'Arrived']
//         },
//         yaxis: {
//           title: {
//             text: 'Count'
//           }
//         },
//         fill: {
//           opacity: 1,
//           colors: ['#4299e1', '#e53e3e', '#dd6b20', '#38a169']
//         },
//         colors: ['#4299e1', '#e53e3e', '#dd6b20', '#38a169']
//       },
//       series: [{
//         name: 'Schedules',
//         data: Object.values(statusCounts)
//       }]
//     };
//   };

//   const downloadPDF = async () => {
//     if (dashboardRef.current) {
//       const canvas = await html2canvas(dashboardRef.current);
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('l', 'mm', 'a4');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('transport_analytics_report.pdf');
//     }
//   };

//   return (
//     <Container ref={dashboardRef}>
//       <Header>
//         <div>
//           <Title>AMAAM TRAVELS Analytics</Title>
//           <Subtitle>Comprehensive overview of your transportation operations</Subtitle>
//         </div>
//         <div>
//           {/* <Button onClick={fetchAllData}>
//             <FiRefreshCw /> Refresh Data
//           </Button> */}
//           <Button onClick={downloadPDF} style={{ marginLeft: '1rem' }}>
//             <FiDownload /> Download PDF
//           </Button>
//         </div>
//       </Header>

//       {error && (
//         <div style={{
//           padding: '1rem',
//           backgroundColor: '#fff5f5',
//           color: '#e53e3e',
//           borderRadius: '0.375rem',
//           marginBottom: '2rem'
//         }}>
//           Error: {error}
//         </div>
//       )}

//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <SummaryContainer>
//             <SummaryCard color="#4299e1">
//               <SummaryTitle>
//                 <FaBus /> Total Buses
//               </SummaryTitle>
//               <SummaryValue>{summaries.totalBuses}</SummaryValue>
//               <SummaryChange>
//                 <FiUsers /> {summaries.activeBuses} active
//               </SummaryChange>
//             </SummaryCard>

//             <SummaryCard color="#38a169">
//               <SummaryTitle>
//                 <FiMap /> Total Routes
//               </SummaryTitle>
//               <SummaryValue>{summaries.totalRoutes}</SummaryValue>
//               <SummaryChange>
//                 <FiClock /> Avg. {summaries.avgDistance} km, {formatDuration(summaries.avgDuration)}
//               </SummaryChange>
//             </SummaryCard>

//             <SummaryCard color="#dd6b20">
//               <SummaryTitle>
//                 <FiCalendar /> Schedules
//               </SummaryTitle>
//               <SummaryValue>{summaries.totalSchedules}</SummaryValue>
//               <SummaryChange>
//                 {summaries.upcomingSchedules} upcoming trips
//               </SummaryChange>
//             </SummaryCard>
//           </SummaryContainer>

//           <ChartsContainer>
//             <ChartCard>
//               <ChartHeader>
//                 <ChartTitle>
//                   <FiPieChart /> Bus Fleet Status
//                 </ChartTitle>
//               </ChartHeader>
//               <Chart
//                 options={prepareBusStatusChart().options}
//                 series={prepareBusStatusChart().series}
//                 type="donut"
//                 height={350}
//               />
//             </ChartCard>

//             <ChartCard>
//               <ChartHeader>
//                 <ChartTitle>
//                   <FiBarChart2 /> Top 5 Longest Routes
//                 </ChartTitle>
//               </ChartHeader>
//               <Chart
//                 options={prepareRouteDistanceChart().options}
//                 series={prepareRouteDistanceChart().series}
//                 type="bar"
//                 height={350}
//               />
//             </ChartCard>
//           </ChartsContainer>

//           <ChartsContainer>
//             <ChartCard>
//               <ChartHeader>
//                 <ChartTitle>
//                   <FiBarChart2 /> Schedule Status
//                 </ChartTitle>
//               </ChartHeader>
//               <Chart
//                 options={prepareScheduleStatusChart().options}
//                 series={prepareScheduleStatusChart().series}
//                 type="bar"
//                 height={350}
//               />
//             </ChartCard>
//           </ChartsContainer>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Analytics;
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  FiCalendar,
  FiMap,
  FiBus,
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
  FiBarChart2,
  FiRefreshCw,
  FiClock,
  FiUsers,
  FiDownload,
  FiDollarSign
} from 'react-icons/fi';
import Chart from 'react-apexcharts';
import { FaBus, FaRoute, FaCalendarAlt, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// API URLs
const API_URLS = {
  buses: 'http://localhost:7000/api/v1/buses?status=',
  routes: 'http://localhost:7000/api/v1/routes?skip=0&limit=1000&sortBy=startLocation',
  schedules: 'http://localhost:7000/api/v1/schedules',
  payments: 'http://localhost:7000/api/v1/payments/all-payments',
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1400px;
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

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #4299e1;
  color: white;
  border: none;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SummaryCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-top: 4px solid ${props => props.color || '#4299e1'};
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
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const SummaryChange = styled.span`
  font-size: 0.75rem;
  color: ${props => props.positive ? '#38a169' : props.negative ? '#e53e3e' : '#718096'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

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

// Helper functions
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

function calculatePercentageChange(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    buses: [],
    routes: [],
    schedules: [],
    payments: [],
  });
  const dashboardRef = useRef(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [buses, routes, schedules, payments] = await Promise.all([
        fetchData(API_URLS.buses),
        fetchData(API_URLS.routes),
        fetchData(API_URLS.schedules),
        fetchData(API_URLS.payments),
      ]);

      setData({
        buses: buses.data || buses,
        routes: routes.data || routes,
        schedules: schedules.data || schedules,
        payments: payments.data || payments,
      });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Calculate summary statistics
  const calculateSummaries = () => {
    const totalBuses = data.buses.length;
    const activeBuses = data.buses.filter(bus => bus.status === 'active').length;
    const totalRoutes = data.routes.length;
    const totalDistance = data.routes.reduce((sum, route) => sum + (parseFloat(route.distance) || 0), 0);
    const avgDistance = totalRoutes > 0 ? (totalDistance / totalRoutes).toFixed(1) : 0;
    const totalDuration = data.routes.reduce((sum, route) => sum + (parseFloat(route.estimatedDuration) || 0), 0);
    const avgDuration = totalRoutes > 0 ? (totalDuration / totalRoutes) : 0;
    const totalSchedules = data.schedules.length;
    const upcomingSchedules = data.schedules.filter(s =>
      s.status === 'scheduled' && new Date(s.departureTime) > new Date()
    ).length;

    const totalPayments = data.payments.length;
    const totalAmount = data.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const avgPayment = totalPayments > 0 ? (totalAmount / totalPayments).toFixed(2) : 0;

    return {
      totalBuses,
      activeBuses,
      totalRoutes,
      totalDistance,
      avgDistance,
      avgDuration,
      totalSchedules,
      upcomingSchedules,
      totalPayments,
      totalAmount,
      avgPayment,
    };
  };

  const summaries = calculateSummaries();

  // Prepare chart data
  const prepareBusStatusChart = () => {
    const statusCounts = {
      active: 0,
      maintenance: 0,
      inactive: 0
    };

    data.buses.forEach(bus => {
      if (bus.status && statusCounts.hasOwnProperty(bus.status)) {
        statusCounts[bus.status]++;
      }
    });

    return {
      options: {
        labels: ['Active', 'Maintenance', 'Inactive'],
        colors: ['#38a169', '#dd6b20', '#e53e3e'],
        legend: {
          position: 'bottom'
        }
      },
      series: Object.values(statusCounts)
    };
  };

  const prepareRouteDistanceChart = () => {
    const routesByDistance = [...data.routes]
      .sort((a, b) => b.distance - a.distance)
      .slice(0, 5);

    return {
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: routesByDistance.map(route =>
            `${route.startLocation} - ${route.endLocation}`
          ),
          title: {
            text: 'Distance (km)'
          }
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        colors: ['#4299e1']
      },
      series: [{
        name: 'Distance',
        data: routesByDistance.map(route => route.distance)
      }]
    };
  };

  const prepareScheduleStatusChart = () => {
    const statusCounts = {
      scheduled: 0,
      cancelled: 0,
      departed: 0,
      arrived: 0
    };

    data.schedules.forEach(schedule => {
      if (schedule.status && statusCounts.hasOwnProperty(schedule.status)) {
        statusCounts[schedule.status]++;
      }
    });

    return {
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Scheduled', 'Cancelled', 'Departed', 'Arrived']
        },
        yaxis: {
          title: {
            text: 'Count'
          }
        },
        fill: {
          opacity: 1,
          colors: ['#4299e1', '#e53e3e', '#dd6b20', '#38a169']
        },
        colors: ['#4299e1', '#e53e3e', '#dd6b20', '#38a169']
      },
      series: [{
        name: 'Schedules',
        data: Object.values(statusCounts)
      }]
    };
  };

  const preparePaymentMethodsChart = () => {
    const methodCounts = {};

    data.payments.forEach(payment => {
      if (payment.paymentMethod) {
        methodCounts[payment.paymentMethod] = (methodCounts[payment.paymentMethod] || 0) + 1;
      }
    });

    return {
      options: {
        labels: Object.keys(methodCounts),
        colors: ['#4299e1', '#e53e3e', '#dd6b20', '#38a169'],
        legend: {
          position: 'bottom'
        }
      },
      series: Object.values(methodCounts)
    };
  };

  const preparePaymentTrendsChart = () => {
    const dailyPayments = {};

    data.payments.forEach(payment => {
      const date = new Date(payment.paymentDate).toISOString().split('T')[0];
      dailyPayments[date] = (dailyPayments[date] || 0) + payment.amount;
    });

    return {
      options: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: Object.keys(dailyPayments),
          title: {
            text: 'Date'
          }
        },
        yaxis: {
          title: {
            text: 'Amount (KSH)'
          }
        },
        colors: ['#4299e1']
      },
      series: [{
        name: 'Payments',
        data: Object.values(dailyPayments)
      }]
    };
  };

  const downloadPDF = async () => {
    if (dashboardRef.current) {
      const canvas = await html2canvas(dashboardRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('transport_analytics_report.pdf');
    }
  };

  return (
    <Container ref={dashboardRef}>
      <Header>
        <div>
          <Title>AMAAM TRAVELS Analytics</Title>
          <Subtitle>Comprehensive overview of your transportation operations</Subtitle>
        </div>
        <div>
          <Button onClick={fetchAllData}>
            <FiRefreshCw /> Refresh Data
          </Button>
          <Button onClick={downloadPDF} style={{ marginLeft: '1rem' }}>
            <FiDownload /> Download PDF
          </Button>
        </div>
      </Header>

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fff5f5',
          color: '#e53e3e',
          borderRadius: '0.375rem',
          marginBottom: '2rem'
        }}>
          Error: {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SummaryContainer>
            <SummaryCard color="#4299e1">
              <SummaryTitle>
                <FaBus /> Total Buses
              </SummaryTitle>
              <SummaryValue>{summaries.totalBuses}</SummaryValue>
              <SummaryChange>
                <FiUsers /> {summaries.activeBuses} active
              </SummaryChange>
            </SummaryCard>

            <SummaryCard color="#38a169">
              <SummaryTitle>
                <FiMap /> Total Routes
              </SummaryTitle>
              <SummaryValue>{summaries.totalRoutes}</SummaryValue>
              <SummaryChange>
                <FiClock /> Avg. {summaries.avgDistance} km, {formatDuration(summaries.avgDuration)}
              </SummaryChange>
            </SummaryCard>

            <SummaryCard color="#dd6b20">
              <SummaryTitle>
                <FiCalendar /> Schedules
              </SummaryTitle>
              <SummaryValue>{summaries.totalSchedules}</SummaryValue>
              <SummaryChange>
                {summaries.upcomingSchedules} upcoming trips
              </SummaryChange>
            </SummaryCard>

            <SummaryCard color="#e53e3e">
              <SummaryTitle>
                <FiDollarSign /> Payments
              </SummaryTitle>
              <SummaryValue>{summaries.totalPayments}</SummaryValue>
              <SummaryChange>
                Avg. KSH {summaries.avgPayment}, Total KSH {summaries.totalAmount}
              </SummaryChange>
            </SummaryCard>
          </SummaryContainer>

          <ChartsContainer>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FiPieChart /> Bus Fleet Status
                </ChartTitle>
              </ChartHeader>
              <Chart
                options={prepareBusStatusChart().options}
                series={prepareBusStatusChart().series}
                type="donut"
                height={350}
              />
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FiBarChart2 /> Top 5 Longest Routes
                </ChartTitle>
              </ChartHeader>
              <Chart
                options={prepareRouteDistanceChart().options}
                series={prepareRouteDistanceChart().series}
                type="bar"
                height={350}
              />
            </ChartCard>
          </ChartsContainer>

          <ChartsContainer>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FiBarChart2 /> Schedule Status
                </ChartTitle>
              </ChartHeader>
              <Chart
                options={prepareScheduleStatusChart().options}
                series={prepareScheduleStatusChart().series}
                type="bar"
                height={350}
              />
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FiPieChart /> Payment Methods
                </ChartTitle>
              </ChartHeader>
              <Chart
                options={preparePaymentMethodsChart().options}
                series={preparePaymentMethodsChart().series}
                type="donut"
                height={350}
              />
            </ChartCard>
          </ChartsContainer>

          <ChartsContainer>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FiTrendingUp /> Payment Trends
                </ChartTitle>
              </ChartHeader>
              <Chart
                options={preparePaymentTrendsChart().options}
                series={preparePaymentTrendsChart().series}
                type="line"
                height={350}
              />
            </ChartCard>
          </ChartsContainer>
        </>
      )}
    </Container>
  );
};

export default Analytics;
