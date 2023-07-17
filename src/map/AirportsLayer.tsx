import { useMarkerColor, useTheme } from '@hooks/settings';
import { useJetAPIAirports } from '@services/JetAPIService';
import L, { LatLngBounds, Map } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, useMapEvent } from 'react-leaflet';
import { useMatch, useNavigate } from 'react-router-dom';

import MapTooltip from './MapTooltip';

// 'Location On' svg from Material Icons
function createAirportIconSVG(color: string) {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="32"
      viewBox="0 -960 960 960"
      style="transform: translate(-25%, -100%);">
      <path
        d="M480.089-490Q509-490 529.5-510.589q20.5-20.588 20.5-49.5Q550-589 529.411-609.5q-20.588-20.5-49.5-20.5Q451-630 430.5-609.411q-20.5 20.588-20.5 49.5Q410-531 430.589-510.5q20.588 20.5 49.5 20.5ZM480-159q133-121 196.5-219.5T740-552q0-117.79-75.292-192.895Q589.417-820 480-820t-184.708 75.105Q220-669.79 220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
        fill="${color}"/>
    </svg>
  `;
}

function AirportsLayer() {
  const navigate = useNavigate();
  const match = useMatch('/airport/:icao');
  const theme = useTheme();
  const [bounds, setBounds] = useState<LatLngBounds>(new LatLngBounds([0, 0], [0, 0]));
  const map: Map = useMapEvent('moveend', () => setBounds(map.getBounds()));
  const markerColor = useMarkerColor();

  useEffect(() => setBounds(map.getBounds()), [map]);

  const airports = useJetAPIAirports(bounds);

  return (
    <>
      {
        airports.map((airport, i) => (
          <Marker
            key={`airport-${airport.icao || i}`}
            position={[ airport.lat || 0, airport.lon || 0 ]}
            eventHandlers={{ 'click': () => navigate(`/airport/${airport.icao}`) }}
            icon={(
              L.divIcon({
                className: '',
                html: createAirportIconSVG(markerColor)
              })
            )}>
            <MapTooltip
              updateDependencies={[ theme ]}
              selected={match?.params.icao == airport.icao}
              permanent={match?.params.icao == airport.icao}
              offset={[ 10, -22 ]}>
              { airport.name || '' }
            </MapTooltip>
          </Marker>
        ))
      }
    </>
  );
}

export default AirportsLayer;
