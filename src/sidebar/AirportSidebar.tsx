import Skeleton from '@components/Skeleton';
import { useTheme } from '@context/SettingsContext';
import { useJetAPIAirport } from '@services/JetAPIService';
import { useParams } from 'react-router-dom';

import styles from './airportSidebar.module.scss';

function AirportSidebar() {
  const theme = useTheme();
  const { icao } = useParams();
  const airport = useJetAPIAirport(icao);

  return (
    <div className={styles[theme]}>
      <header>
        <h3><Skeleton dependencies={[airport]}>{ airport?.name || 'N/A' }</Skeleton></h3>
        <h2><Skeleton dependencies={[airport]}>{ airport?.icao || 'N/A' } / { airport?.iata_code || 'N/A' }</Skeleton></h2>
      </header>
      <section>
        <div>
          <label>Latitude</label>
          <span><Skeleton dependencies={[airport]}>{ airport?.lat?.toFixed(4) || 'N/A' }</Skeleton></span>
        </div>
        <div>
          <label>Longitude</label>
          <span><Skeleton dependencies={[airport]}>{ airport?.lon?.toFixed(4) || 'N/A' }</Skeleton></span>
        </div>
        <div>
          <label>Elevation</label>
          <span><Skeleton dependencies={[airport]}>{ airport?.elevation || 'N/A' }</Skeleton></span>
        </div>
      </section>
      <section>
        <div>
          <label>Country</label>
          <span><Skeleton dependencies={[airport]}>{ airport?.iso_country || 'N/A' }</Skeleton></span>
        </div>
        <div>
          <label>Continent</label>
          <span><Skeleton dependencies={[airport]}>{ airport?.continent || 'N/A' }</Skeleton></span>
        </div>
      </section>
    </div>
  );
}

export default AirportSidebar;
