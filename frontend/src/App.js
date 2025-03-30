import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import Home from './Components/Home';
import Fleet from './Components/Fleet';
import BusListPage from './Components/BusList';
import SeatSelectionPage from './Components/SeatSelection';
import PassengerDetailsPage from './Components/PassengerDetails';

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
        <Route path='/payment' element={<PassengerDetailsPage />} />
        <Route path="/buses/:busId/seats" element={<SeatSelectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;