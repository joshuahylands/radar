import { useContext } from 'react';

import RadioButtons from '@components/RadioButtons';
import { SettingsContext, Theme, WeatherLayer } from '@context/SettingsContext';
import Sidebar from './Sidebar';

import styles from './settingsSidebar.module.scss';

function SettingsSidebar() {
  const {
    theme, setTheme,
    weatherLayer, setWeatherLayer,
    aircraftTooltipsPermanent, setAircraftTooltipsPermanent
  } = useContext(SettingsContext);

  return (
    <Sidebar title="Settings">
      <div className={styles.settings}>
        <section>
          <p>Theme</p>
          <span>Sets the theme of the app. Select <q>System</q> to match the devices theme</span>
          <RadioButtons
            name="theme"
            value={theme}
            onValueChange={value => setTheme(value as Theme)}
            buttons={[
              { value: 'system', label: 'System' },
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' }
            ]}/>
        </section>
        <section>
          <p>Weather Radar</p>
          <span>Overlays a weather radar on the map</span>
          <RadioButtons
            name="weather-layer"
            value={weatherLayer == undefined ? 'none' : weatherLayer}
            onValueChange={value => value == 'none' ? setWeatherLayer(undefined) : setWeatherLayer(value as WeatherLayer)}
            buttons={[
              { value: 'none', label: 'None' },
              { value: 'clouds_new', label: 'Clouds' },
              { value: 'precipitation_new', label: 'Precipitation' },
              { value: 'pressure_new', label: 'Pressure' },
              { value: 'wind_new', label: 'Wind' },
              { value: 'temp_new', label: 'Temperature' }
            ]}/>
        </section>
        <section>
          <p>Aircraft Tooltips</p>
          <span>Displays the Callsign, Registration or Icao 24 Code of the Aircraft</span>
          <RadioButtons
            name="aircraft-tooltips"
            value={aircraftTooltipsPermanent.toString()}
            onValueChange={value => setAircraftTooltipsPermanent(value == 'true')}
            buttons={[
              { value: 'true', label: 'Enabled' },
              { value: 'false', label: 'Disabled' }
            ]}/>
        </section>
      </div>
    </Sidebar>
  );
}

export default SettingsSidebar;
