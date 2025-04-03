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

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <Home/>
            <AboutUs/>
            <Fleet/>
          </>
        } />
        <Route path="/bus-list" element={<BusListPage />} />
        <Route path='/passenger-details' element={<PassengerDetailsPage />} />
        <Route path="/buses/:scheduleId/seats" element={<SeatSelectionPage />} />
        <Route path="/schedules/:scheduleId/seats" element={<SeatSelectionPage />} />
        <Route path='/payment' element={<PaymentPage/>} />
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/buses" element={<BusManagement />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/profile' element={<PassengerProfile />} />
        <Route path="/routes/:routeId" element={<RouteManagement />} />
        <Route path="/routes" element={<RouteManagement />} />
        <Route path="/schedules" element={<ScheduleManagement />} />
        <Route path="/pays" element={<PaymentManagement />} />
        <Route path="/admin" element={<DashboardLayout />} />
        {/* <Route path="/bookings" element={<BookingManagement />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;