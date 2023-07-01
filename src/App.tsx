import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SettingsContextProvider } from '@context/SettingsContext';
import Map from '@map/Map';
import NavBar from '@page/NavBar';
import AircraftDataSidebar from '@page/AircraftDataSidebar';
import SettingsSidebar from '@page/SettingsSidebar';
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
            <Route path="/settings" element={<SettingsSidebar/>}/>
            <Route path="/:icao24" element={<AircraftDataSidebar/>}/>
          </Routes>
        </ADSBServiceProvider>
        <NavBar/>
      </SettingsContextProvider>
    </BrowserRouter>
  );
}

export default App;
