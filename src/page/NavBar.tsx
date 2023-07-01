import { Cloud, CloudError, Computer, HalfMoon, Message, MessageText, Parking, Rain, Settings, SunLight, TemperatureHigh, Wind } from 'iconoir-react';
import { useContext, useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import Tooltip from '@components/Tooltip';
import { SettingsContext } from '@context/SettingsContext';

import styles from './navbar.module.scss';

function NavBarTheme() {
  const { theme, setTheme } = useContext(SettingsContext);

  const icon = useMemo<React.JSX.Element>(() => {
    if (theme == 'system') {
      return <Computer onClick={() => setTheme('dark')}/>;
    } else if (theme == 'dark') {
      return <HalfMoon onClick={() => setTheme('light')}/>;
    } else {
      return <SunLight onClick={() => setTheme('system')}/>;
    }
  }, [theme]);

  return (
    <Tooltip position="top" text={`Theme: ${theme[0].toUpperCase()}${theme.slice(1)}`} style={{ marginBottom: '0.5rem' }}>
      {icon}
    </Tooltip>
  );
}

function NavBarWeather() {
  const { weatherLayer, setWeatherLayer } = useContext(SettingsContext);

  const { icon, tooltipText } = useMemo<{ icon: React.JSX.Element, tooltipText: string }>(() => {
    if (weatherLayer == 'clouds_new') {
      return {
        icon: <Cloud onClick={() => setWeatherLayer('precipitation_new')}/>,
        tooltipText: 'Clouds'
      };
    } else if (weatherLayer == 'precipitation_new') {
      return {
        icon: <Rain onClick={() => setWeatherLayer('pressure_new')}/>,
        tooltipText: 'Precipitation'
      };
    } else if (weatherLayer == 'pressure_new') {
      return {
        icon: <Parking onClick={() => setWeatherLayer('wind_new')}/>,
        tooltipText: 'Pressure'
      };
    } else if (weatherLayer == 'wind_new') {
      return {
        icon: <Wind onClick={() => setWeatherLayer('temp_new')}/>,
        tooltipText: 'Wind'
      };
    } else if (weatherLayer == 'temp_new') {
      return {
        icon: <TemperatureHigh onClick={() => setWeatherLayer(undefined)}/>,
        tooltipText: 'Temperature'
      };
    } else {
      return {
        icon: <CloudError onClick={() => setWeatherLayer('clouds_new')}/>,
        tooltipText: 'None'
      };
    }
  }, [weatherLayer]);

  return (
    <Tooltip position="top" text={`Weather: ${tooltipText}`} style={{ marginBottom: '0.5rem' }}>
      {icon}
    </Tooltip>
  );
}

function NavBarAircraftTooltips() {
  const { aircraftTooltipsPermanent, setAircraftTooltipsPermanent } = useContext(SettingsContext);

  return (
    <Tooltip position="top" text={`Aircraft Tooltips: ${aircraftTooltipsPermanent ? 'Enabled' : 'Disabled'}`} style={{ marginBottom: '0.5rem' }}>
      {
        aircraftTooltipsPermanent ? (
          <MessageText onClick={() => setAircraftTooltipsPermanent(false)}/>
        ) : (
          <Message onClick={() => setAircraftTooltipsPermanent(true)}/>
        )
      }
    </Tooltip>
  );
}

function NavBar() {
  const match = useMatch('/settings');
  const navigate = useNavigate();

  return (
    <div className={styles.nav}>
      <Tooltip position="top" text="Settings" style={{ marginBottom: '0.5rem' }}>
        <Settings onClick={() => match ? navigate('/') : navigate('/settings')}/>
      </Tooltip>
      <NavBarTheme/>
      <NavBarWeather/>
      <NavBarAircraftTooltips/>
    </div>
  );
}

export default NavBar;
