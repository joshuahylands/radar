import { MapType, SettingsContext } from '@context/SettingsContext';
import { getMapData, useTheme } from '@hooks/settings';
import { LatLngExpression } from 'leaflet';
import { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import styles from './mapSettings.module.scss';

const center: LatLngExpression = [51.1518, -0.1853];

type MapSettingsSelectorProps = {
  mapType: MapType;
  icon: string;
};

function MapSettingsSelector(props: MapSettingsSelectorProps) {
  const theme = useTheme();
  const { mapType, setMapType } = useContext(SettingsContext);
  const { url } = getMapData(props.mapType, theme);

  return (
    <section
      className={mapType == props.mapType ? styles.selected : ''}
      onClick={() => setMapType(props.mapType)}>
      <MapContainer
        center={center}
        zoom={12}
        attributionControl={false}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}>
        <TileLayer url={url}/>
      </MapContainer>
      <label>
        <span>{ props.mapType[0].toUpperCase() + props.mapType.slice(1) }</span>
        <span className="material-symbols-outlined">{ props.icon }</span>
      </label>
    </section>
  );
}

function MapSettings() {
  return (
    <div className={styles.mapSettings}>
      <MapSettingsSelector mapType="theme" icon="settings_brightness"/>
      <MapSettingsSelector mapType="dark" icon="dark_mode"/>
      <MapSettingsSelector mapType="light" icon="light_mode"/>
      <MapSettingsSelector mapType="satellite" icon="satellite"/>
    </div>
  );
}

export default MapSettings;
