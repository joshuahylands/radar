import { useParams } from 'react-router-dom';

import { useJetAPIAirport } from '@services/JetAPIService';
import Sidebar from './Sidebar';

import styles from './sidebar.module.scss';
import SidebarData from './SidebarData';

function AirportSidebar() {
  const { icao } = useParams();
  const airport = useJetAPIAirport(icao);

  return (
    <Sidebar title={airport?.name || ''}>
      <div className={styles.data}>
        <section>
          <SidebarData label="ICAO" data={ airport?.icao }/>
          <SidebarData label="IATA" data={ airport?.iata_code }/>
        </section>
        <section>
          <SidebarData label="Latitude" data={ airport?.lat?.toFixed(4) }/>
          <SidebarData label="Longitude" data={ airport?.lon?.toFixed(4) }/>
          <SidebarData label="Elevation" data={ airport?.elevation }/>
        </section>
        <section>
          <SidebarData label="Country" data={ airport?.iso_country }/>
          <SidebarData label="Continent" data={ airport?.continent }/>
        </section>
      </div>
    </Sidebar>
  );
}

export default AirportSidebar;
