import { InfoEmpty } from 'iconoir-react';
import { useParams } from 'react-router-dom';

import Spinner from '@components/Spinner';
import Tooltip from '@components/Tooltip';
import { useADSBServiceByIcao24 } from '@services/ADSBService';
import { useAircraftImage, useCallsignRoute } from '@services/HexDBService';
import Sidebar from './Sidebar';

import styles from './aircraftDataSidebar.module.scss';

type AircraftDataSidebarInfoProps = {
  label: string;
  data?: string | number;
  units?: string;
  tooltip?: string;
};

function AircraftDataSidebarInfo(props: AircraftDataSidebarInfoProps) {
  return (
    <div>
      <label>
        <span>{ props.label }</span>
        { props.tooltip ? <Tooltip text={props.tooltip} position="top"><InfoEmpty/></Tooltip> : null}
      </label>
      <span>{ props.data || 'N/A' }{ props.data ? props.units : '' }</span>
    </div>
  );
}

function AircraftDataSidebar() {
  const { icao24 } = useParams();
  const aircraft = useADSBServiceByIcao24(icao24);
  const image = useAircraftImage(icao24);
  const [departure, arrival] = useCallsignRoute(aircraft?.flight?.trimEnd());

  return (
    <Sidebar title={aircraft?.flight || aircraft?.r || aircraft?.hex || ''}>
      {
        aircraft ? (
          <div className={styles.aircraftData}>
            <img src={image}/>
            <section>
              <AircraftDataSidebarInfo label="Departure" data={departure}/>
              <AircraftDataSidebarInfo label="Arrival" data={arrival}/>
            </section>
            <section>
              <AircraftDataSidebarInfo label="Aicraft Type" data={aircraft.t}/>
              <AircraftDataSidebarInfo label="Registration" data={aircraft.r}/>
            </section>
            <section>
              <AircraftDataSidebarInfo label="Barometric Altitude" data={aircraft.alt_baro} units="ft"/>
              <AircraftDataSidebarInfo label="Geometric Altitude" data={aircraft.alt_geom} units="ft"/>
            </section>
            <section>
              <AircraftDataSidebarInfo label="GS" data={aircraft.gs} units="knts" tooltip="Groundspeed"/>
              <AircraftDataSidebarInfo label="TAS" data={aircraft.tas} units="knts" tooltip="True Airspeed"/>
              <AircraftDataSidebarInfo label="IAS" data={aircraft.ias} units="knts" tooltip="Indicated Airspeed"/>
              <AircraftDataSidebarInfo label="Mach" data={aircraft.mach}/>
            </section>
            <section>
              <AircraftDataSidebarInfo label="Track" data={aircraft.track} units="&deg;"/>
              <AircraftDataSidebarInfo label="Mag Heading" data={aircraft.mag_heading} units="&deg;"/>
              <AircraftDataSidebarInfo label="True Heading" data={aircraft.true_heading} units="&deg;"/>
            </section>
            <section>
              <AircraftDataSidebarInfo label="Barometric Vertical Rate" data={aircraft.baro_rate} units="ft/m"/>
              <AircraftDataSidebarInfo label="Geometric Vertical Rate" data={aircraft.geom_rate} units="ft/m"/>
            </section>
            <section>
              <AircraftDataSidebarInfo label="Icao 24" data={aircraft.hex?.toUpperCase()}/>
              <AircraftDataSidebarInfo label="Squawk" data={aircraft.squawk}/>
            </section>
            <section>
              <AircraftDataSidebarInfo label="Latitude" data={aircraft.lat} units="&deg;"/>
              <AircraftDataSidebarInfo label="Longitude" data={aircraft.lon} units="&deg;"/>
            </section>
            <section>
              <AircraftDataSidebarInfo label="MCP Alt" data={aircraft.nav_altitude_mcp} units="ft" tooltip="Mode Control Panel Altitude"/>
              <AircraftDataSidebarInfo label="FMS Alt" data={aircraft.nav_altitude_fms} units="ft" tooltip="Flight Management System Altitude"/>
              <AircraftDataSidebarInfo label="Nav Heading" data={aircraft.nav_heading} units="&deg;"/>
            </section>
            <section>
              <div>
                <label>
                  <span>Nav Modes</span>
                  <Tooltip text="Shows the current autopilot modes activated" position="top"><InfoEmpty/></Tooltip>
                </label>
                <div className={styles.navModes}>
                  <span className={aircraft.nav_modes?.includes('autopilot') ? styles.enabled : styles.disabled}>AP</span>
                  <span className={aircraft.nav_modes?.includes('vnav') ? styles.enabled : styles.disabled}>VNAV</span>
                  <span className={aircraft.nav_modes?.includes('lnav') ? styles.enabled : styles.disabled}>LNAV</span>
                  <span className={aircraft.nav_modes?.includes('althold') ? styles.enabled : styles.disabled}>ALTHOLD</span>
                  <span className={aircraft.nav_modes?.includes('approach') ? styles.enabled : styles.disabled}>APP</span>
                  <span className={aircraft.nav_modes?.includes('tcas') ? styles.enabled : styles.disabled}>TCAS</span>
                </div>
              </div>
            </section>
            <section>
              <AircraftDataSidebarInfo label="OAT" data={aircraft.oat} units="&deg;C" tooltip="Outside Air Temperature"/>
              <AircraftDataSidebarInfo label="TAT" data={aircraft.tat} units="&deg;C" tooltip="Total Air Temperature"/>
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
