import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import Home from './Components/Home';
import Fleet from './Components/Fleet';
import BusListPage from './Components/BusList';
import SeatSelectionPage from './Components/SeatSelection';
import PassengerDetailsPage from './Components/PassengerDetails';
import PaymentPage from './Components/Payment';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;