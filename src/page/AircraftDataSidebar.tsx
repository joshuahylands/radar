import { InfoEmpty } from 'iconoir-react';
import { useParams } from 'react-router-dom';

import Spinner from '@components/Spinner';
import Tooltip from '@components/Tooltip';
import { useADSBServiceByIcao24 } from '@services/ADSBService';
import { useAircraftImage, useCallsignRoute } from '@services/HexDBService';
import { useJetAPIAircraft, useJetAPIAirport } from '@services/JetAPIService';
import Sidebar from './Sidebar';
import SidebarData from './SidebarData';

import styles from './aircraftDataSidebar.module.scss';
import sidebarStyles from './sidebar.module.scss';

function AircraftDataSidebar() {
  const { icao24 } = useParams();
  const aircraftADSBData = useADSBServiceByIcao24(icao24);
  const aircraftData = useJetAPIAircraft(icao24);
  const image = useAircraftImage(icao24);
  const [departure, arrival] = useCallsignRoute(aircraftADSBData?.flight?.trimEnd());
  const departureAirport = useJetAPIAirport(departure);
  const arrivalAirport = useJetAPIAirport(arrival);

  return (
    <Sidebar title={aircraftADSBData ? `${aircraftADSBData?.flight || aircraftADSBData?.r || aircraftADSBData?.hex || ''} ${aircraftData ? `- ${aircraftData.owners}` : ''}` : ''}>
      {
        aircraftADSBData ? (
          <div className={sidebarStyles.data}>
            <img className={styles.image} src={image}/>
            <section>
              <SidebarData label="Departure" data={departure ? `${departureAirport?.name} - ${departure}` : 'N/A'}/>
              <SidebarData label="Arrival" data={arrival ? `${arrivalAirport?.name} - ${arrival}` : 'N/A'}/>
            </section>
            <section>
              <SidebarData label="Aicraft Type" data={aircraftData ? `${aircraftData.manufaturer} ${aircraftData.type?.split('/')[0]} (${aircraftADSBData.t})` : aircraftADSBData.t}/>
              <SidebarData label="Registration" data={aircraftADSBData.r}/>
            </section>
            <section>
              <SidebarData label="Barometric Altitude" data={aircraftADSBData.alt_baro} units="ft"/>
              <SidebarData label="Geometric Altitude" data={aircraftADSBData.alt_geom} units="ft"/>
            </section>
            <section>
              <SidebarData label="GS" data={aircraftADSBData.gs} units="knts" tooltip="Groundspeed"/>
              <SidebarData label="TAS" data={aircraftADSBData.tas} units="knts" tooltip="True Airspeed"/>
              <SidebarData label="IAS" data={aircraftADSBData.ias} units="knts" tooltip="Indicated Airspeed"/>
              <SidebarData label="Mach" data={aircraftADSBData.mach}/>
            </section>
            <section>
              <SidebarData label="Track" data={aircraftADSBData.track} units="&deg;"/>
              <SidebarData label="Mag Heading" data={aircraftADSBData.mag_heading} units="&deg;"/>
              <SidebarData label="True Heading" data={aircraftADSBData.true_heading} units="&deg;"/>
            </section>
            <section>
              <SidebarData label="Barometric Vertical Rate" data={aircraftADSBData.baro_rate} units="ft/m"/>
              <SidebarData label="Geometric Vertical Rate" data={aircraftADSBData.geom_rate} units="ft/m"/>
            </section>
            <section>
              <SidebarData label="Icao 24" data={aircraftADSBData.hex?.toUpperCase()}/>
              <SidebarData label="Squawk" data={aircraftADSBData.squawk}/>
            </section>
            <section>
              <SidebarData label="Latitude" data={aircraftADSBData.lat} units="&deg;"/>
              <SidebarData label="Longitude" data={aircraftADSBData.lon} units="&deg;"/>
            </section>
            <section>
              <SidebarData label="MCP Alt" data={aircraftADSBData.nav_altitude_mcp} units="ft" tooltip="Mode Control Panel Altitude"/>
              <SidebarData label="FMS Alt" data={aircraftADSBData.nav_altitude_fms} units="ft" tooltip="Flight Management System Altitude"/>
              <SidebarData label="Nav Heading" data={aircraftADSBData.nav_heading} units="&deg;"/>
            </section>
            <section>
              <div>
                <label>
                  <span>Nav Modes</span>
                  <Tooltip text="Shows the current autopilot modes activated" position="top"><InfoEmpty/></Tooltip>
                </label>
                <div className={styles.navModes}>
                  <span className={aircraftADSBData.nav_modes?.includes('autopilot') ? styles.enabled : styles.disabled}>AP</span>
                  <span className={aircraftADSBData.nav_modes?.includes('vnav') ? styles.enabled : styles.disabled}>VNAV</span>
                  <span className={aircraftADSBData.nav_modes?.includes('lnav') ? styles.enabled : styles.disabled}>LNAV</span>
                  <span className={aircraftADSBData.nav_modes?.includes('althold') ? styles.enabled : styles.disabled}>ALTHOLD</span>
                  <span className={aircraftADSBData.nav_modes?.includes('approach') ? styles.enabled : styles.disabled}>APP</span>
                  <span className={aircraftADSBData.nav_modes?.includes('tcas') ? styles.enabled : styles.disabled}>TCAS</span>
                </div>
              </div>
            </section>
            <section>
              <SidebarData label="OAT" data={aircraftADSBData.oat} units="&deg;C" tooltip="Outside Air Temperature"/>
              <SidebarData label="TAT" data={aircraftADSBData.tat} units="&deg;C" tooltip="Total Air Temperature"/>
            </section>
          </div>
        ) : (
          <Spinner/>
        )
      }
    </Sidebar>
  );
}

export default AircraftDataSidebar;
