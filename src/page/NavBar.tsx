import { useContext, useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import Tooltip from '@components/Tooltip';
import { SettingsContext } from '@context/SettingsContext';

import styles from './navbar.module.scss';

function NavBarTheme() {
  const { theme, setTheme } = useContext(SettingsContext);

  const icon = useMemo<React.JSX.Element>(() => {
    if (theme == 'system') {
      return <span className="material-symbols-outlined" onClick={() => setTheme('dark')}>settings_brightness</span>;
    } else if (theme == 'dark') {
      return <span className="material-symbols-outlined" onClick={() => setTheme('light')}>dark_mode</span>;
    } else {
      return <span className="material-symbols-outlined" onClick={() => setTheme('system')}>light_mode</span>;
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
        icon: <span className="material-symbols-outlined" onClick={() => setWeatherLayer('precipitation_new')}>cloudy</span>,
        tooltipText: 'Clouds'
      };
    } else if (weatherLayer == 'precipitation_new') {
      return {
        icon: <span className="material-symbols-outlined" onClick={() => setWeatherLayer('pressure_new')}>rainy</span>,
        tooltipText: 'Precipitation'
      };
    } else if (weatherLayer == 'pressure_new') {
      return {
        icon: <span className="material-symbols-outlined" onClick={() => setWeatherLayer('wind_new')}>compare_arrows</span>,
        tooltipText: 'Pressure'
      };
    } else if (weatherLayer == 'wind_new') {
      return {
        icon: <span className="material-symbols-outlined" onClick={() => setWeatherLayer('temp_new')}>air</span>,
        tooltipText: 'Wind'
      };
    } else if (weatherLayer == 'temp_new') {
      return {
        icon: <span className="material-symbols-outlined" onClick={() => setWeatherLayer(undefined)}>thermostat</span>,
        tooltipText: 'Temperature'
      };
    } else {
      return {
        icon: <span className="material-symbols-outlined" onClick={() => setWeatherLayer('clouds_new')}>clear_day</span>,
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
          <span className="material-symbols-outlined" onClick={() => setAircraftTooltipsPermanent(false)}>chat</span>
        ) : (
          <span className="material-symbols-outlined" onClick={() => setAircraftTooltipsPermanent(true)}>chat_bubble</span>
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
        <span className="material-symbols-outlined" onClick={() => match ? navigate('/') : navigate('/settings')}>settings</span>
      </Tooltip>
      <NavBarTheme/>
      <NavBarWeather/>
      <NavBarAircraftTooltips/>
    </div>
  );
}

export default NavBar;
