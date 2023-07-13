import { useJetAPIAirports } from '@services/JetAPIService';
import { LatLngBounds, Map } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, Tooltip, useMapEvent } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

function AirportsLayer() {
  const navigate = useNavigate();
  const [bounds, setBounds] = useState<LatLngBounds>(new LatLngBounds([0, 0], [0, 0]));
  const map: Map = useMapEvent('moveend', () => setBounds(map.getBounds()));

  useEffect(() => setBounds(map.getBounds()), [map]);

  const airports = useJetAPIAirports(bounds);

  return (
    <>
      {
        airports.map((airport, i) => (
          <Marker
            key={`airport-${airport.icao || i}`}
            position={[ airport.lat || 0, airport.lon || 0 ]}
            eventHandlers={{ 'click': () => navigate(`/airport/${airport.icao}`) }}>
            <Tooltip>{ airport.name || '' }</Tooltip>
          </Marker>
        ))
      }
    </>
  );
}

export default AirportsLayer;
