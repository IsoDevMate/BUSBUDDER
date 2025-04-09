// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import AboutUs from './Components/AboutUs';
// import Home from './Components/Home';
// import Fleet from './Components/Fleet';
// import BusListPage from './Components/BusList';
// import SeatSelectionPage from './Components/SeatSelection';
// import PassengerDetailsPage from './Components/PassengerDetails';
// import PaymentPage from './Components/Payment';
// import BusManagement from './Components/BusManagement';
// import RouteManagement from './Components/RouteManagement';
// import ScheduleManagement from './Components/ScheduleManagement';
// import PaymentManagement from './Components/PaymentManagement';
// import DashboardLayout from './Components/AdminDashboard';
// import RegistrationForm from './Components/Registration';
// import LoginForm from './Components/Login';
// import PassengerProfile from './Components/Profile';
// import ResetPassword from './Components/ResetPassword';
// import ForgotPassword from './Components/ForgotPassword';

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={
//           <>
//             <Home/>
//             <AboutUs/>
//             <Fleet/>
//           </>
//         } />
//         <Route path="/bus-list" element={<BusListPage />} />
//         <Route path='/passenger-details' element={<PassengerDetailsPage />} />
//         <Route path="/buses/:scheduleId/seats" element={<SeatSelectionPage />} />
//         <Route path="/schedules/:scheduleId/seats" element={<SeatSelectionPage />} />
//         <Route path='/payment' element={<PaymentPage/>} />
//         <Route path="/buses" element={<BusManagement />} />
//         <Route path='/register' element={<RegistrationForm />} />
//         <Route path='/login' element={<LoginForm />} />
//         <Route path='/profile' element={<PassengerProfile />} />
//         <Route path="/routes/:routeId" element={<RouteManagement />} />
//         <Route path="/routes" element={<RouteManagement />} />
//         <Route path="/schedules" element={<ScheduleManagement />} />
//         <Route path="/pays" element={<PaymentManagement />} />
//         <Route path="/admin" element={<DashboardLayout />} />
//         <Route path='/reset' element={<ResetPassword />} />
//         <Route path='/forgot' element={<ForgotPassword />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import Home from './Components/Home';
import Fleet from './Components/Fleet';
import BusListPage from './Components/BusList';
import SeatSelectionPage from './Components/SeatSelection';
import PassengerDetailsPage from './Components/PassengerDetails';
import PaymentPage from './Components/Payment';
import BusManagement from './Components/BusManagement';
import RouteManagement from './Components/RouteManagement';
import ScheduleManagement from './Components/ScheduleManagement';
import PaymentManagement from './Components/PaymentManagement';
import DashboardLayout from './Components/AdminDashboard';
import RegistrationForm from './Components/Registration';
import LoginForm from './Components/Login';
import PassengerProfile from './Components/Profile';
import ResetPassword from './Components/ResetPassword';
import ForgotPassword from './Components/ForgotPassword';
import Analytics from './Components/Analytics';
import UserManagement from './Components/UserManagement';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <AboutUs />
            <Fleet />
          </>
        } />
        <Route path="/bus-list" element={<BusListPage />} />
        <Route path='/passenger-details' element={<PassengerDetailsPage />} />
        <Route path="/buses/:scheduleId/seats" element={<SeatSelectionPage />} />
        <Route path="/schedules/:scheduleId/seats" element={<SeatSelectionPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/profile' element={<PassengerProfile />} />
        <Route path='/reset' element={<ResetPassword />} />
        <Route path='/forgot' element={<ForgotPassword />} />

        {/* Nested routes for the dashboard */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="buses" element={<BusManagement />} />
          <Route path="routes" element={<RouteManagement />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='users' element={<UserManagement />} />
          <Route path="schedules" element={<ScheduleManagement />} />
          <Route path="pays" element={<PaymentManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
