import L from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import { useMatch, useNavigate } from 'react-router-dom';

import { SettingsContext, useTheme } from '@context/SettingsContext';
import Aircraft from '@model/Aircraft';
import { useADSBServiceByArea } from '@services/ADSBService';

import styles from './adsbLayer.module.scss';

const THEME_LIGHT_PRIMARY = '#F4F5F4';
const THEME_DARK_PRIMARY = '#060606';

// Airplane SVG from https://iconoir.com/. This function returns an svg according to the parameters specified
function createPlaneSVG(rotate: number, selected: boolean, color: string) {
  return `
    <svg
      width="24px"
      height="24px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      style="transform: translate(-25%, -25%) scale(1.2) rotate(${rotate}deg);">
      <path
        d="M10.5 4.5v4.667a.6.6 0 01-.282.51l-7.436 4.647a.6.6 0 00-.282.508v.9a.6.6 0 00.746.582l6.508-1.628a.6.6 0 01.746.582v2.96a.6.6 0 01-.205.451l-2.16 1.89c-.458.402-.097 1.151.502 1.042l3.256-.591a.6.6 0 01.214 0l3.256.591c.599.11.96-.64.502-1.041l-2.16-1.89a.6.6 0 01-.205-.452v-2.96a.6.6 0 01.745-.582l6.51 1.628a.6.6 0 00.745-.582v-.9a.6.6 0 00-.282-.508l-7.436-4.648a.6.6 0 01-.282-.509V4.5a1.5 1.5 0 00-3 0z"
        stroke="${color}"
        fill="${ selected ? color : 'none' }"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
      </path>
    </svg>
  `;
}

type AircraftMarkerProps = {
  aircraft: Aircraft;
};

function AircraftMarker(props: AircraftMarkerProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const match = useMatch('/:icao24');
  const { aircraftTooltipsPermanent } = useContext(SettingsContext);

  // Workaround to allow the Tooltip to update. The Tooltip is not mutable, therefore we have to forcefully remove then re add the component
  const [showTooltips, setShowTooltips] = useState(true);
  useEffect(() => {
    setShowTooltips(false);
    setTimeout(() => setShowTooltips(true), 0);
  }, [theme, aircraftTooltipsPermanent]);

  return (
    <Marker
      position={[
        props.aircraft.lat || props.aircraft.rr_lat || 0,
        props.aircraft.lon || props.aircraft.rr_lon || 0
      ]}
      icon={
        L.divIcon({
          className: '',
          html: createPlaneSVG(
            props.aircraft.track || props.aircraft.true_heading || props.aircraft.mag_heading || 0,
            match?.params.icao24 == props.aircraft.hex,
            theme == 'dark' ? THEME_LIGHT_PRIMARY : THEME_DARK_PRIMARY
          )
        })
      }
      eventHandlers={{
        click: () => props.aircraft.hex && navigate(`/${props.aircraft.hex}`)
      }}>
      {
        showTooltips && (
          <Tooltip permanent={aircraftTooltipsPermanent} direction="top" offset={[ 0, -10 ]} className={styles[theme]}>
            <span>{props.aircraft.flight || props.aircraft.r || props.aircraft.hex}</span>
          </Tooltip>
        )
      }
    </Marker>
  );
}

function metersToNauticalMiles(meters: number) {
  return meters / 1852;
}

function ADSBLayer() {
  const map = useMap();

  const aircraft = useADSBServiceByArea(() => {
    const center = map.getCenter();
    const bounds = map.getBounds();
    const distanceBetweenCornersMeters = map.distance(bounds.getNorthWest(), bounds.getSouthEast());
    const distanceBetweenCornersNM = Math.ceil(Math.min(metersToNauticalMiles(distanceBetweenCornersMeters), 250));

    return {
      center,
      radius: distanceBetweenCornersNM
    };
  });

  return (
    <>
      {
        aircraft.map(a => <AircraftMarker key={`adsb-layer-marker-${a.hex || a.flight?.trimEnd() || a.r}`} aircraft={a}/>)
      }
    </>
  );
}

export default ADSBLayer;
