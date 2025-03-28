import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import Home from './Components/Home';
import Fleet from './Components/Fleet';
import BusListPage from './Components/BusList';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;