import { SettingsContext } from '@context/SettingsContext';
import { MapTypeData, getMapData, useTheme } from '@hooks/settings';
import { useContext, useMemo } from 'react';
import { AttributionControl, MapContainer, TileLayer } from 'react-leaflet';

import ADSBLayer from './ADSBLayer';
import AirportsLayer from './AirportsLayer';

import styles from './map.module.scss';

function Map() {
  const theme = useTheme();
  const { mapType, weatherLayer } = useContext(SettingsContext);

  const { url, attribution } = useMemo<MapTypeData>(() => getMapData(mapType, theme), [mapType, theme]);

  return (
    <div className={styles.map}>
      <MapContainer center={[51.5, 0]} zoom={9} attributionControl={false}>
        <AttributionControl position="bottomleft"/>
        <TileLayer
          attribution={attribution}
          url={url}
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
