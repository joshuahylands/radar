import { FilterContextProvider } from '@context/FilterContext';
import { SettingsContextProvider } from '@context/SettingsContext';
import Map from '@map/Map';
import NavBar from '@nav/NavBar';
import AircraftSidebar from '@sidebar/AircraftSidebar';
import AirportSidebar from '@sidebar/AirportSidebar';
import Sidebar from '@sidebar/Sidebar';
import { ADSBServiceProvider } from '@services/ADSBService';
import { useRoutes } from 'react-router-dom';

import '@styles/global.scss';

function App() {
  const element = useRoutes([
    { path: '/aircraft/:icao24', element: <AircraftSidebar/> },
    { path: '/airport/:icao', element: <AirportSidebar/> },
  ]);

  return (
    <SettingsContextProvider>
      <FilterContextProvider>
        <ADSBServiceProvider>
          <Map/>
          <Sidebar>{element}</Sidebar>
        </ADSBServiceProvider>
        <NavBar/>
      </FilterContextProvider>
    </SettingsContextProvider>
  );
}

export default App;
