import { useContext, useMemo } from 'react';
import { AttributionControl, MapContainer, TileLayer } from 'react-leaflet';

import { useTheme, SettingsContext } from '@context/SettingsContext';
import ADSBLayer from './ADSBLayer';
import AirportsLayer from './AirportsLayer';

import styles from './map.module.scss';

function Map() {
  const theme = useTheme();
  const { weatherLayer } = useContext(SettingsContext);

  const tileLayer = useMemo<string>(() => {
    if (theme == 'dark') {
      return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    } else {
      return 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    }
  }, [theme]);

  return (
    <div className={styles.map}>
      <MapContainer center={[51.5, 0]} zoom={9} attributionControl={false}>
        <AttributionControl position="bottomleft"/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileLayer}
          subdomains="abcd"/>
        {
          weatherLayer != undefined && <TileLayer url={`https://tile.openweathermap.org/map/${weatherLayer}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`}/>
        }
        <ADSBLayer/>
        <AirportsLayer/>
      </MapContainer>
    </div>
  );
}

export default Map;
