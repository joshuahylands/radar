import Skeleton from '@components/Skeleton';
import { useTheme } from '@hooks/settings';
import { useADSBServiceByIcao24 } from '@services/ADSBService';
import { useJetAPIAircraft, useJetAPIAirline, useJetAPIAirport } from '@services/JetAPIService';
import { useAircraftImage, useCallsignRoute } from '@services/HexDBService';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './aircraftSidebar.module.scss';

function AircraftSidebar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { icao24 } = useParams();

  const img = useAircraftImage(icao24);
  const adsb = useADSBServiceByIcao24(icao24);
  const airline = useJetAPIAirline(adsb?.flight && adsb?.flight.trimEnd() != adsb?.r?.replace('-', '') && adsb?.flight?.length > 3 ? adsb?.flight?.slice(0, 3) : undefined);
  const [departureICAO, arrivalICAO] = useCallsignRoute(adsb?.flight?.trimEnd());
  const departure = useJetAPIAirport(departureICAO);
  const arrival = useJetAPIAirport(arrivalICAO);
  const aircraft = useJetAPIAircraft(icao24, adsb?.t);

  return (
    <div className={styles[theme]}>
      <Skeleton style={{ width: '100%', height: 250, borderRadius: 0 }} dependencies={[adsb]}><img src={img || ''}/></Skeleton>
      <header>
        <Skeleton dependencies={[adsb]}>
          { adsb?.flight || adsb?.r || adsb?.hex || adsb?.t || 'N/A' }
          { (airline && ` - ${airline.name}`) || (aircraft && aircraft.owners && ` - ${aircraft.owners}`) }
        </Skeleton>
      </header>
      <section>
        <div>
          <h3
            className={departureICAO ? styles.airportLink : ''}
            onClick={() => departureICAO && navigate(`/airport/${departureICAO}`)}>
            <Skeleton dependencies={[adsb]}>{ departureICAO || 'N/A' }</Skeleton>
          </h3>
          <span><Skeleton dependencies={[adsb]}>{ departure?.iata_code || 'N/A' }</Skeleton></span>
          <div><Skeleton dependencies={[adsb]}>{ departure?.name || 'N/A' }</Skeleton></div>
        </div>
        <div>
          <h3
            className={arrivalICAO ? styles.airportLink : ''}
            onClick={() => arrivalICAO && navigate(`/airport/${arrivalICAO}`)}>
            <Skeleton dependencies={[adsb]}>{ arrivalICAO || 'N/A' }</Skeleton>
          </h3>
          <span><Skeleton dependencies={[adsb]}>{ arrival?.iata_code || 'N/A' }</Skeleton></span>
          <div><Skeleton dependencies={[adsb]}>{ arrival?.name || 'N/A' }</Skeleton></div>
        </div>
      </section>
      <main>
        <section>
          <div>
            <label>Type</label>
            <span>
              <Skeleton dependencies={[adsb]}>
                {
                  (
                    aircraft &&
                    aircraft.type
                  ) ? `${aircraft.type.manufacturer} ${aircraft.type.name} (${aircraft.type.icao})` : adsb?.t
                }
              </Skeleton>
            </span>
          </div>
          <div>
            <label>Registration</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.r || aircraft?.registration || 'N/A' }</Skeleton></span>
          </div>
        </section>
        <section>
          <div>
            <label>Barometric Altitude</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.alt_baro ? `${adsb.alt_baro}ft` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>Geometric Altitude</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.alt_geom ? `${adsb.alt_geom}ft` : 'N/A' }</Skeleton></span>
          </div>
        </section>
        <section>
          <div>
            <label>GS</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.ias ? `${adsb.gs?.toFixed()}kts` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>TAS</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.ias ? `${adsb.tas}kts` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>IAS</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.ias ? `${adsb.ias}kts` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>Mach</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.mach || 'N/A' }</Skeleton></span>
          </div>
        </section>
        <section>
          <div>
            <label>Barometric Vertical Rate</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.baro_rate ? `${adsb.baro_rate}ft/m` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>Geometric Vertical Rate</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.geom_rate ? `${adsb.geom_rate}ft/m` : 'N/A' }</Skeleton></span>
          </div>
        </section>
        <section>
          <div>
            <label>ICAO 24</label>
            <span><Skeleton dependencies={[adsb]}>{ icao24 }</Skeleton></span>
          </div>
          <div>
            <label>Squawk</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.squawk || 'N/A' }</Skeleton></span>
          </div>
        </section>
        <section>
          <div>
            <label>Latitude</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.lat ? `${adsb.lat}\xB0` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>Longitude</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.lon ? `${adsb.lon}\xB0` : 'N/A' }</Skeleton></span>
          </div>
        </section>
        <section>
          <div>
            <label>MCP Altitude</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.nav_altitude_mcp ? `${adsb.nav_altitude_mcp}ft` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>FMS Altitude</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.nav_altitude_fms ? `${adsb.nav_altitude_fms}ft` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>Nav Heading</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.nav_heading ? `${adsb.nav_heading}\xB0` : 'N/A' }</Skeleton></span>
          </div>
        </section>
        <div className={styles.apModes}>
          <label>Nav Modes</label>
          <div>
            <Skeleton dependencies={[adsb]}>
              <span style={{ color: adsb?.nav_modes?.includes('autopilot') ? 'green' : '' }}>AP</span>
              <span style={{ color: adsb?.nav_modes?.includes('vnav') ? 'green' : '' }}>VNAV</span>
              <span style={{ color: adsb?.nav_modes?.includes('lnav') ? 'green' : '' }}>LNAV</span>
              <span style={{ color: adsb?.nav_modes?.includes('althold') ? 'green' : '' }}>ALTHOLD</span>
              <span style={{ color: adsb?.nav_modes?.includes('approach') ? 'green' : '' }}>APP</span>
              <span style={{ color: adsb?.nav_modes?.includes('tcas') ? 'green' : '' }}>TCAS</span>
            </Skeleton>
          </div>
        </div>
        <section>
          <div>
            <label>OAT</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.oat ? `${adsb.oat}\xB0C` : 'N/A' }</Skeleton></span>
          </div>
          <div>
            <label>TAT</label>
            <span><Skeleton dependencies={[adsb]}>{ adsb?.tat ? `${adsb.tat}\xB0C` : 'N/A' }</Skeleton></span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AircraftSidebar;
