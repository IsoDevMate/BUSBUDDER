// // // import React, { useState, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import { FiBarChart2, FiTrendingUp, FiDollarSign, FiClock } from 'react-icons/fi';

// // // const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1';

// // // // Styled Components
// // // const Container = styled.div`
// // //   padding: 2rem;
// // //   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// // //   max-width: 1200px;
// // //   margin: 0 auto;
// // // `;

// // // const Header = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   margin-bottom: 2rem;

// // //   @media (min-width: 768px) {
// // //     flex-direction: row;
// // //     justify-content: space-between;
// // //     align-items: center;
// // //   }
// // // `;

// // // const Title = styled.h1`
// // //   font-size: 1.8rem;
// // //   font-weight: 600;
// // //   color: #2d3748;
// // //   margin-bottom: 0.5rem;
// // // `;

// // // const Subtitle = styled.p`
// // //   color: #718096;
// // //   font-size: 0.9rem;
// // // `;

// // // const SummaryContainer = styled.div`
// // //   display: grid;
// // //   grid-template-columns: repeat(1, 1fr);
// // //   gap: 1rem;
// // //   margin-bottom: 1.5rem;

// // //   @media (min-width: 768px) {
// // //     grid-template-columns: repeat(4, 1fr);
// // //   }
// // // `;

// // // const SummaryCard = styled.div`
// // //   background-color: white;
// // //   border-radius: 0.5rem;
// // //   padding: 1.25rem;
// // //   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// // //   display: flex;
// // //   flex-direction: column;
// // // `;

// // // const SummaryTitle = styled.h3`
// // //   font-size: 0.875rem;
// // //   font-weight: 500;
// // //   color: #718096;
// // //   margin-bottom: 0.5rem;
// // //   display: flex;
// // //   align-items: center;
// // //   gap: 0.5rem;
// // // `;

// // // const SummaryValue = styled.span`
// // //   font-size: 1.5rem;
// // //   font-weight: 600;
// // //   color: #2d3748;
// // // `;

// // // const ChartContainer = styled.div`
// // //   background-color: white;
// // //   border-radius: 0.5rem;
// // //   padding: 1.5rem;
// // //   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// // //   margin-top: 2rem;
// // // `;

// // // const ChartTitle = styled.h2`
// // //   font-size: 1.25rem;
// // //   font-weight: 600;
// // //   color: #2d3748;
// // //   margin-bottom: 1rem;
// // // `;

// // // // API Functions
// // // async function handleResponse(response) {
// // //   if (!response.ok) {
// // //     const error = await response.json();
// // //     throw new Error(error.message || 'Something went wrong');
// // //   }
// // //   return response.json();
// // // }

// // // async function getBuses() {
// // //   const response = await fetch(`${API_URL}/buses`);
// // //   return handleResponse(response);
// // // }

// // // async function getRoutes() {
// // //   const response = await fetch(`${API_URL}/routes`);
// // //   return handleResponse(response);
// // // }

// // // async function getSchedules() {
// // //   const response = await fetch(`${API_URL}/schedules`);
// // //   return handleResponse(response);
// // // }

// // // async function getPayments() {
// // //   const response = await fetch(`${API_URL}/payments`);
// // //   return handleResponse(response);
// // // }

// // // // Component
// // // function Analytics() {
// // //   const [buses, setBuses] = useState([]);
// // //   const [routes, setRoutes] = useState([]);
// // //   const [schedules, setSchedules] = useState([]);
// // //   const [payments, setPayments] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetchAnalyticsData();
// // //   }, []);

// // //   const fetchAnalyticsData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const [busData, routeData, scheduleData, paymentData] = await Promise.all([
// // //         getBuses(),
// // //         getRoutes(),
// // //         getSchedules(),
// // //         getPayments(),
// // //       ]);

// // //       setBuses(busData.data || []);
// // //       setRoutes(routeData.data || []);
// // //       setSchedules(scheduleData.data || []);
// // //       setPayments(paymentData.data || []);
// // //     } catch (error) {
// // //       console.error('Error fetching analytics data:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const totalBuses = buses.length;
// // //   const totalRoutes = routes.length;
// // //   const totalSchedules = schedules.length;
// // //   const totalPayments = payments.length;
// // //   const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

// // //   return (
// // //     <Container>
// // //       <Header>
// // //         <div>
// // //           <Title>Analytics Dashboard</Title>
// // //           <Subtitle>Overview of your fleet and operations</Subtitle>
// // //         </div>
// // //       </Header>

// // //       <SummaryContainer>
// // //         <SummaryCard>
// // //           <SummaryTitle>
// // //             <FiBarChart2 /> Total Buses
// // //           </SummaryTitle>
// // //           <SummaryValue>{totalBuses}</SummaryValue>
// // //         </SummaryCard>

// // //         <SummaryCard>
// // //           <SummaryTitle>
// // //             <FiTrendingUp /> Total Routes
// // //           </SummaryTitle>
// // //           <SummaryValue>{totalRoutes}</SummaryValue>
// // //         </SummaryCard>

// // //         <SummaryCard>
// // //           <SummaryTitle>
// // //             <FiClock /> Total Schedules
// // //           </SummaryTitle>
// // //           <SummaryValue>{totalSchedules}</SummaryValue>
// // //         </SummaryCard>

// // //         <SummaryCard>
// // //           <SummaryTitle>
// // //             <FiDollarSign /> Total Revenue
// // //           </SummaryTitle>
// // //           <SummaryValue>Ksh {totalRevenue.toLocaleString()}</SummaryValue>
// // //         </SummaryCard>
// // //       </SummaryContainer>

// // //       <ChartContainer>
// // //         <ChartTitle>Revenue Over Time</ChartTitle>
// // //         {/* You can integrate a chart library like Chart.js or Recharts here */}
// // //         <div>Chart Placeholder</div>
// // //       </ChartContainer>

// // //       {loading && <div>Loading analytics data...</div>}
// // //     </Container>
// // //   );
// // // }

// // // export default Analytics;
// // import React, { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import { 
// //   FiDollarSign, 
// //   FiCalendar, 
// //   FiMap, 
// //   FiTrendingUp, 
// //   FiTrendingDown,
// //   FiPieChart,
// //   FiBarChart2,
// //   FiRefreshCw
// // } from 'react-icons/fi';
// // import Chart from 'react-apexcharts';
// // import { FaBus, FaRoute, FaCalendarAlt, FaMoneyBill, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

// // // API URLs - replace with your actual endpoints
// // const API_URLS = {
// //   buses: process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/buses?status=',
// //   routes: process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/routes',
// //   schedules: process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/schedules',
// // //   payments: process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/payments',
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

// // function formatCurrency(amount) {
// //   return new Intl.NumberFormat('en-US', {
// //     style: 'currency',
// //     currency: 'KSH',
// //     minimumFractionDigits: 0
// //   }).format(amount);
// // }

// // function getLastMonthData(currentData) {
// //   // In a real app, you would fetch historical data
// //   // For demo purposes, we'll just reduce the current data by a random factor
// //   return currentData.map(item => ({
// //     ...item,
// //     value: Math.floor(item.value * (0.7 + Math.random() * 0.3))
// //   }));
// // }

// // const Analytics = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [data, setData] = useState({
// //     buses: [],
// //     routes: [],
// //     schedules: [],
// //     payments: []
// //   });
// //   const [timeRange, setTimeRange] = useState('month');

// //   const fetchAllData = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const [buses, routes, schedules, payments] = await Promise.all([
// //         fetchData(API_URLS.buses),
// //         fetchData(API_URLS.routes),
// //         fetchData(API_URLS.schedules),
// //         fetchData(API_URLS.payments)
// //       ]);

// //       setData({
// //         buses: buses.data || buses,
// //         routes: routes.data || routes,
// //         schedules: schedules.data || schedules,
// //         payments: payments.data || payments
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
// //     const totalSchedules = data.schedules.length;
// //     const activeSchedules = data.schedules.filter(s => s.status === 'scheduled').length;
// //     const totalRevenue = data.payments.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0);
// //     const completedPayments = data.payments.filter(p => p.status === 'completed').length;

// //     // For demo purposes, we'll generate some comparison data
// //     const lastMonthData = {
// //       buses: Math.floor(totalBuses * 0.9),
// //       activeBuses: Math.floor(activeBuses * 0.85),
// //       routes: Math.floor(totalRoutes * 0.95),
// //       distance: Math.floor(totalDistance * 0.9),
// //       schedules: Math.floor(totalSchedules * 0.8),
// //       activeSchedules: Math.floor(activeSchedules * 0.75),
// //       revenue: Math.floor(totalRevenue * 0.88),
// //       completedPayments: Math.floor(completedPayments * 0.85)
// //     };

// //     return {
// //       current: {
// //         totalBuses,
// //         activeBuses,
// //         totalRoutes,
// //         totalDistance,
// //         totalSchedules,
// //         activeSchedules,
// //         totalRevenue,
// //         completedPayments
// //       },
// //       lastMonth: lastMonthData
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

// //   const prepareRevenueChart = () => {
// //     // Group payments by day for the last 30 days
// //     const daysInMonth = 30;
// //     const dailyRevenue = Array(daysInMonth).fill(0);
// //     const now = new Date();
    
// //     data.payments.forEach(payment => {
// //       if (payment.status === 'completed') {
// //         const paymentDate = new Date(payment.createdAt);
// //         const diffDays = Math.floor((now - paymentDate) / (1000 * 60 * 60 * 24));
        
// //         if (diffDays >= 0 && diffDays < daysInMonth) {
// //           dailyRevenue[daysInMonth - 1 - diffDays] += parseFloat(payment.amount) || 0;
// //         }
// //       }
// //     });

// //     const categories = Array.from({ length: daysInMonth }, (_, i) => {
// //       const date = new Date();
// //       date.setDate(date.getDate() - (daysInMonth - 1 - i));
// //       return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// //     });

// //     return {
// //       options: {
// //         chart: {
// //           type: 'area',
// //           height: 350,
// //           toolbar: {
// //             show: false
// //           }
// //         },
// //         dataLabels: {
// //           enabled: false
// //         },
// //         stroke: {
// //           curve: 'smooth'
// //         },
// //         xaxis: {
// //           type: 'category',
// //           categories,
// //           labels: {
// //             rotate: -45,
// //             rotateAlways: true
// //           }
// //         },
// //         yaxis: {
// //           title: {
// //             text: 'Revenue (KSH)'
// //           }
// //         },
// //         colors: ['#4299e1']
// //       },
// //       series: [{
// //         name: 'Revenue',
// //         data: dailyRevenue
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

// //   const preparePaymentMethodsChart = () => {
// //     const methodCounts = {
// //       mpesa: 0,
// //       card: 0,
// //       cash: 0,
// //       other: 0
// //     };

// //     data.payments.forEach(payment => {
// //       const method = payment.paymentMethod?.toLowerCase() || 'other';
// //       if (method.includes('mpesa')) {
// //         methodCounts.mpesa++;
// //       } else if (method.includes('card')) {
// //         methodCounts.card++;
// //       } else if (method.includes('cash')) {
// //         methodCounts.cash++;
// //       } else {
// //         methodCounts.other++;
// //       }
// //     });

// //     return {
// //       options: {
// //         labels: ['M-Pesa', 'Card', 'Cash', 'Other'],
// //         colors: ['#38a169', '#4299e1', '#dd6b20', '#718096'],
// //         legend: {
// //           position: 'bottom'
// //         }
// //       },
// //       series: Object.values(methodCounts)
// //     };
// //   };

// //   return (
// //     <Container>
// //       <Header>
// //         <div>
// //           <Title>Analytics Dashboard</Title>
// //           <Subtitle>Overview of your transportation management system</Subtitle>
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
// //               <SummaryValue>{summaries.current.totalBuses}</SummaryValue>
// //               <SummaryChange 
// //                 positive={summaries.current.totalBuses > summaries.lastMonth.buses}
// //                 negative={summaries.current.totalBuses < summaries.lastMonth.buses}
// //               >
// //                 {summaries.current.totalBuses > summaries.lastMonth.buses ? (
// //                   <FiTrendingUp />
// //                 ) : (
// //                   <FiTrendingDown />
// //                 )}
// //                 {Math.abs(calculatePercentageChange(
// //                   summaries.current.totalBuses, 
// //                   summaries.lastMonth.buses
// //                 )).toFixed(1)}% from last month
// //               </SummaryChange>
// //             </SummaryCard>

// //             <SummaryCard color="#38a169">
// //               <SummaryTitle>
// //                 <FiMap /> Total Routes
// //               </SummaryTitle>
// //               <SummaryValue>{summaries.current.totalRoutes}</SummaryValue>
// //               <SummaryChange 
// //                 positive={summaries.current.totalRoutes > summaries.lastMonth.routes}
// //                 negative={summaries.current.totalRoutes < summaries.lastMonth.routes}
// //               >
// //                 {summaries.current.totalRoutes > summaries.lastMonth.routes ? (
// //                   <FiTrendingUp />
// //                 ) : (
// //                   <FiTrendingDown />
// //                 )}
// //                 {Math.abs(calculatePercentageChange(
// //                   summaries.current.totalRoutes, 
// //                   summaries.lastMonth.routes
// //                 )).toFixed(1)}% from last month
// //               </SummaryChange>
// //             </SummaryCard>

// //             <SummaryCard color="#dd6b20">
// //               <SummaryTitle>
// //                 <FiCalendar /> Active Schedules
// //               </SummaryTitle>
// //               <SummaryValue>{summaries.current.activeSchedules}</SummaryValue>
// //               <SummaryChange 
// //                 positive={summaries.current.activeSchedules > summaries.lastMonth.activeSchedules}
// //                 negative={summaries.current.activeSchedules < summaries.lastMonth.activeSchedules}
// //               >
// //                 {summaries.current.activeSchedules > summaries.lastMonth.activeSchedules ? (
// //                   <FiTrendingUp />
// //                 ) : (
// //                   <FiTrendingDown />
// //                 )}
// //                 {Math.abs(calculatePercentageChange(
// //                   summaries.current.activeSchedules, 
// //                   summaries.lastMonth.activeSchedules
// //                 )).toFixed(1)}% from last month
// //               </SummaryChange>
// //             </SummaryCard>

// //             <SummaryCard color="#9f7aea">
// //               <SummaryTitle>
// //                 <FiDollarSign /> Total Revenue
// //               </SummaryTitle>
// //               <SummaryValue>{formatCurrency(summaries.current.totalRevenue)}</SummaryValue>
// //               <SummaryChange 
// //                 positive={summaries.current.totalRevenue > summaries.lastMonth.revenue}
// //                 negative={summaries.current.totalRevenue < summaries.lastMonth.revenue}
// //               >
// //                 {summaries.current.totalRevenue > summaries.lastMonth.revenue ? (
// //                   <FiTrendingUp />
// //                 ) : (
// //                   <FiTrendingDown />
// //                 )}
// //                 {Math.abs(calculatePercentageChange(
// //                   summaries.current.totalRevenue, 
// //                   summaries.lastMonth.revenue
// //                 )).toFixed(1)}% from last month
// //               </SummaryChange>
// //             </SummaryCard>
// //           </SummaryContainer>

// //           <ChartsContainer>
// //             <ChartCard>
// //               <ChartHeader>
// //                 <ChartTitle>
// //                   <FiPieChart /> Bus Status Distribution
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

// //           <ChartsContainer>
// //             <ChartCard>
// //               <ChartHeader>
// //                 <ChartTitle>
// //                   <FiDollarSign /> Daily Revenue (Last 30 Days)
// //                 </ChartTitle>
// //               </ChartHeader>
// //               <Chart
// //                 options={prepareRevenueChart().options}
// //                 series={prepareRevenueChart().series}
// //                 type="area"
// //                 height={350}
// //               />
// //             </ChartCard>

// //             <ChartCard>
// //               <ChartHeader>
// //                 <ChartTitle>
// //                   <FiPieChart /> Payment Methods
// //                 </ChartTitle>
// //               </ChartHeader>
// //               <Chart
// //                 options={preparePaymentMethodsChart().options}
// //                 series={preparePaymentMethodsChart().series}
// //                 type="pie"
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
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { 
//   FiDollarSign, 
//   FiCalendar, 
//   FiMap, 
//   FiBus, 
//   FiTrendingUp, 
//   FiTrendingDown,
//   FiPieChart,
//   FiBarChart2,
//   FiRefreshCw,
//   FiClock,
//   FiUsers
// } from 'react-icons/fi';
// import Chart from 'react-apexcharts';
// import { FaBus, FaRoute, FaCalendarAlt, FaMoneyBill, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

// // API URLs
// const API_URLS = {
//   buses: 'http://localhost:7000/api/v1/buses?status=',
//   routes: 'http://localhost:7000/api/v1/routes?skip=0&limit=1000&sortBy=startLocation',
//   schedules: 'http://localhost:7000/api/v1/schedules',
// };

// // Styled Components (same as before)
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

// function formatCurrency(amount) {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'KSH',
//     minimumFractionDigits: 0
//   }).format(amount);
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
//     // payments: []
//   });

//   const fetchAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [buses, routes, schedules] = await Promise.all([
//         fetchData(API_URLS.buses),
//         fetchData(API_URLS.routes),
//         fetchData(API_URLS.schedules),
//         // fetchData(API_URLS.payments)
//       ]);

//       setData({
//         buses: buses.data || buses,
//         routes: routes.data || routes,
//         schedules: schedules.data || schedules,
//         // payments: payments.data || payments
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
//     // const totalRevenue = data.payments.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0);
//     // const completedPayments = data.payments.filter(p => p.status === 'completed').length;

//     return {
//       totalBuses,
//       activeBuses,
//       totalRoutes,
//       totalDistance,
//       avgDistance,
//       avgDuration,
//       totalSchedules,
//       upcomingSchedules,
//     //   totalRevenue,
//     //   completedPayments
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

//     //   const prepareRevenueTrendChart = () => {
//     //     // Group payments by month for the last 6 months
//     //     const monthlyRevenue = Array(6).fill(0);
//     //     const now = new Date();
//     //     const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
//     //     data.payments.forEach(payment => {
//     //       if (payment.status === 'completed') {
//     //         const paymentDate = new Date(payment.createdAt);
//     //         const diffMonths = (now.getFullYear() - paymentDate.getFullYear()) * 12 + 
//     //                           (now.getMonth() - paymentDate.getMonth());
            
//     //         if (diffMonths >= 0 && diffMonths < 6) {
//     //           monthlyRevenue[5 - diffMonths] += parseFloat(payment.amount) || 0;
//     //         }
//     //       }
//     //     });

//     const categories = Array.from({ length: 6 }, (_, i) => {
//       const date = new Date();
//       date.setMonth(date.getMonth() - (5 - i));
//       return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
//     });

//     return {
//       options: {
//         chart: {
//           type: 'line',
//           height: 350,
//           toolbar: {
//             show: false
//           }
//         },
//         stroke: {
//           curve: 'smooth',
//           width: 3
//         },
//         markers: {
//           size: 5
//         },
//         xaxis: {
//           categories
//         },
//         yaxis: {
//           title: {
//             text: 'Revenue (KSH)'
//           }
//         },
//         colors: ['#9f7aea']
//       },
//       series: [{
//         name: 'Revenue',
//         data: monthlyRevenue
//       }]
//     };
//   };

//   return (
//     <Container>
//       <Header>
//         <div>
//           <Title>Transport Analytics Dashboard</Title>
//           <Subtitle>Comprehensive overview of your transportation operations</Subtitle>
//         </div>
//         <Button onClick={fetchAllData}>
//           <FiRefreshCw /> Refresh Data
//         </Button>
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

//             <SummaryCard color="#9f7aea">
//               <SummaryTitle>
//                 <FiDollarSign /> Total Revenue
//               </SummaryTitle>
//               <SummaryValue>{formatCurrency(summaries.totalRevenue)}</SummaryValue>
//               {/* <SummaryChange>
//                 {summaries.completedPayments} completed payments
//               </SummaryChange> */}
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

//             <ChartCard>
//               <ChartHeader>
//                 <ChartTitle>
//                   <FiTrendingUp /> Revenue Trend (Last 6 Months)
//                 </ChartTitle>
//               </ChartHeader>
//               <Chart
//                 options={prepareRevenueTrendChart().options}
//                 series={prepareRevenueTrendChart().series}
//                 type="line"
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
import React, { useState, useEffect } from 'react';
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
  FiUsers
} from 'react-icons/fi';
import Chart from 'react-apexcharts';
import { FaBus, FaRoute, FaCalendarAlt, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

// API URLs
const API_URLS = {
  buses: 'http://localhost:7000/api/v1/buses?status=',
  routes: 'http://localhost:7000/api/v1/routes?skip=0&limit=1000&sortBy=startLocation',
  schedules: 'http://localhost:7000/api/v1/schedules',
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
  });

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [buses, routes, schedules] = await Promise.all([
        fetchData(API_URLS.buses),
        fetchData(API_URLS.routes),
        fetchData(API_URLS.schedules),
      ]);

      setData({
        buses: buses.data || buses,
        routes: routes.data || routes,
        schedules: schedules.data || schedules,
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

    return {
      totalBuses,
      activeBuses,
      totalRoutes,
      totalDistance,
      avgDistance,
      avgDuration,
      totalSchedules,
      upcomingSchedules,
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

  return (
    <Container>
      <Header>
        <div>
          <Title>Transport Analytics Dashboard</Title>
          <Subtitle>Comprehensive overview of your transportation operations</Subtitle>
        </div>
        <Button onClick={fetchAllData}>
          <FiRefreshCw /> Refresh Data
        </Button>
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
          </ChartsContainer>
        </>
      )}
    </Container>
  );
};

export default Analytics;
