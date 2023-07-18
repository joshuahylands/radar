import Toggle from '@components/Toggle';
import { SettingsContext } from '@context/SettingsContext';
import { useContext } from 'react';

import styles from './settings.module.scss';

function SettingsTheme() {
  const { theme, setTheme } = useContext(SettingsContext);

  return (
    <section>
      <span>Theme</span>
      <ul>
        <li>
          <label htmlFor="system">
            <span className="material-symbols-outlined">settings_brightness</span>
            <span>System</span>
          </label>
          <input id="system" type="radio" checked={theme == 'system'} onChange={() => setTheme('system')}/>
        </li>
        <li>
          <label htmlFor="dark">
            <span className="material-symbols-outlined">dark_mode</span>
            <span>Dark</span>
          </label>
          <input id="dark" type="radio" checked={theme == 'dark'} onChange={() => setTheme('dark')}/>
        </li>
        <li>
          <label htmlFor="light">
            <span className="material-symbols-outlined">light_mode</span>
            <span>Light</span>
          </label>
          <input id="light" type="radio" checked={theme == 'light'} onChange={() => setTheme('light')}/>
        </li>
      </ul>
    </section>
  );
}

function SettingsWeather() {
  const { weatherLayer, setWeatherLayer } = useContext(SettingsContext);

  return (
    <>
      <section>
        <span>Weather</span>
        <ul>
          <li>
            <label htmlFor="none">
              <span className="material-symbols-outlined">clear_day</span>
              <span>None</span>
            </label>
            <input id="none" type="radio" checked={weatherLayer == undefined} onChange={() => setWeatherLayer(undefined)}/>
          </li>
          <li>
            <label htmlFor="clouds_new">
              <span className="material-symbols-outlined">cloudy</span>
              <span>Clouds</span>
            </label>
            <input id="clouds_new" type="radio" checked={weatherLayer == 'clouds_new'} onChange={() => setWeatherLayer('clouds_new')}/>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li>
            <label htmlFor="wind_new">
              <span className="material-symbols-outlined">air</span>
              <span>Wind</span>
            </label>
            <input id="wind_new" type="radio" checked={weatherLayer == 'wind_new'} onChange={() => setWeatherLayer('wind_new')}/>
          </li>
          <li>
            <label htmlFor="pressure_new">
              <span className="material-symbols-outlined">compare_arrows</span>
              <span>Pressure</span>
            </label>
            <input id="pressure_new" type="radio" checked={weatherLayer == 'pressure_new'} onChange={() => setWeatherLayer('pressure_new')}/>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li>
            <label htmlFor="precipitation_new">
              <span className="material-symbols-outlined">rainy</span>
              <span>Precipitation</span>
            </label>
            <input id="precipitation_new" type="radio" checked={weatherLayer == 'precipitation_new'} onChange={() => setWeatherLayer('precipitation_new')}/>
          </li>
          <li>
            <label htmlFor="temp_new">
              <span className="material-symbols-outlined">thermostat</span>
              <span>Temperature</span>
            </label>
            <input id="temp_new" type="radio" checked={weatherLayer == 'temp_new'} onChange={() => setWeatherLayer('temp_new')}/>
          </li>
        </ul>
      </section>
    </>
  );
}

function SettingsAicraftTooltips() {
  const { aircraftTooltipsPermanent, setAircraftTooltipsPermanent } = useContext(SettingsContext);

  return (
    <div className={styles.aircraftTooltips}>
      <span>Aircraft Labels</span>
      <Toggle enabled={aircraftTooltipsPermanent} onChange={value => setAircraftTooltipsPermanent(value)}/>
    </div>
  );
}

function Settings() {
  return (
    <div className={styles.settings}>
      <SettingsTheme/>
      <SettingsWeather/>
      <SettingsAicraftTooltips/>
    </div>
  );
}

export default Settings;
