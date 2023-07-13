import L from 'leaflet';
import { useContext } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { useMatch, useNavigate } from 'react-router-dom';

import { SettingsContext, useTheme } from '@context/SettingsContext';
import Aircraft from '@model/Aircraft';
import { useADSBServiceByArea } from '@services/ADSBService';
import { THEME_DARK_PRIMARY, THEME_LIGHT_PRIMARY } from '@styles/theme';
import MapTooltip from './MapTooltip';

// 'flight' SVG from Material Icons. This function returns an svg according to the parameters specified
function createPlaneSVG(rotate: number, color: string) {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29px"
      height="29px"
      viewBox="0 -960 960 960"
      style="transform: translate(-25%, -25%) rotate(${rotate}deg);">
      <path
        d="M350-80v-42l80-60v-251L80-330v-58l350-206v-236q0-21 14.5-35.5T480-880q21 0 35.5 14.5T530-830v236l350 206v58L530-433v251l80 60v42l-130-37-130 37Z"
        fill="${color}">
    </svg>
  `;
}

type AircraftMarkerProps = {
  aircraft: Aircraft;
};

function AircraftMarker(props: AircraftMarkerProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const match = useMatch('/aircraft/:icao24');
  const { aircraftTooltipsPermanent } = useContext(SettingsContext);

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
            theme == 'dark' ? THEME_LIGHT_PRIMARY : THEME_DARK_PRIMARY
          )
        })
      }
      eventHandlers={{
        click: () => props.aircraft.hex && navigate(`/aircraft/${props.aircraft.hex}`)
      }}>
      <MapTooltip
        updateDependencies={[theme, aircraftTooltipsPermanent]}
        selected={match?.params.icao24 == props.aircraft.hex}
        permanent={aircraftTooltipsPermanent}
        direction="top"
        offset={[ 0, -10 ]}>
        <span>{props.aircraft.flight || props.aircraft.r || props.aircraft.hex}</span>
      </MapTooltip>
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
