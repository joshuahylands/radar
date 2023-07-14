import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SettingsContextProvider } from '@context/SettingsContext';
import Map from '@map/Map';
import NavBar from '@nav/NavBar';
import AircraftDataSidebar from '@page/AircraftDataSidebar';
import AirportSidebar from '@page/AirportSidebar';
import { ADSBServiceProvider } from '@services/ADSBService';

import '@styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <SettingsContextProvider>
        <ADSBServiceProvider>
          <Map/>
          <Routes>
            <Route path="/" element={null}/>
            <Route path="/aircraft/:icao24" element={<AircraftDataSidebar/>}/>
            <Route path="/airport/:icao" element={<AirportSidebar/>}/>
          </Routes>
        </ADSBServiceProvider>
        <NavBar/>
      </SettingsContextProvider>
    </BrowserRouter>
  );
}

export default App;
