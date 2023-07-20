import { LatLngBounds } from 'leaflet';
import { useEffect, useState } from 'react';

const JET_API_URL = new URL('https://jet.hylands.dev/');

type JetAPIResponse<T> = {
  success: boolean;
  data: T
};

type JetAPIAircraft = {
  icao24?: string;
  country?: string;
  country_code?: string;
  registration?: string;
  manufaturer?: string;
  type_code?: string;
  type?: string;
  owners?: string;
};

type JetAPIAirline = {
  name: string;
  alias: string;
  iata: string;
  icao: string;
  callsign: string;
  country: string;
  active: string;
};

type JetAPIAirport = {
  icao?: string;
  type?: string;
  name?: string;
  lat?: number;
  lon?: number;
  elevation?: number;
  continent?: string;
  iso_country?: string;
  iso_region?: string;
  municipality?: string;
  scheduled_service?: string;
  gps_code?: string;
  iata_code?: string;
  local_code?: string;
  home_link?: string;
  wikipedia_link?: string;
  keywords?: string;
};

export function useJetAPIAircraft(icao24?: string): JetAPIAircraft | null {
  const [aircraft, setAircraft] = useState<JetAPIAircraft | null>(null);

  useEffect(() => {
    if (icao24 == undefined) {
      return;
    }

    const url = new URL('/api/v1/aircraft', JET_API_URL);
    url.searchParams.set('icao24', icao24);

    fetch(url)
      .then(res => res.json())
      .then((json: JetAPIResponse<JetAPIAircraft>) => {
        if (json.success) {
          setAircraft(json.data);
        }
      });

    return () => setAircraft(null);
  }, [icao24]);

  return aircraft;
}

export function useJetAPIAirline(icao?: string): JetAPIAirline | null {
  const [airline, setAirline] = useState<JetAPIAirline | null>(null);

  useEffect(() => {
    if (icao == undefined) {
      return;
    }

    const url = new URL('/api/v1/airline', JET_API_URL);
    url.searchParams.set('icao', icao);

    fetch(url)
      .then(res => res.json())
      .then((json: JetAPIResponse<JetAPIAirline>) => {
        if (json.success) {
          setAirline(json.data);
        }
      });

    return () => setAirline(null);
  }, [icao]);

  return airline;
}

export function useJetAPIAirports(bounds: LatLngBounds): JetAPIAirport[] {
  const [airports, setAirports] = useState<JetAPIAirport[]>([]);

  useEffect(() => {
    const url = new URL('/api/v1/airports', JET_API_URL);
    url.searchParams.set('lat_min', bounds.getSouth().toString());
    url.searchParams.set('lat_max', bounds.getNorth().toString());
    url.searchParams.set('lon_min', bounds.getWest().toString());
    url.searchParams.set('lon_max', bounds.getEast().toString());
    url.searchParams.set('type', 'large_airport,medium_airport');

    fetch(url)
      .then(res => res.json())
      .then((json: JetAPIResponse<JetAPIAirport[]>) => {
        if (json.success) {
          setAirports(json.data);
        }
      });

    return () => setAirports([]);
  }, [bounds]);

  return airports;
}

export function useJetAPIAirport(icao?: string): JetAPIAirport | null {
  const [airport, setAirport] = useState<JetAPIAirport | null>(null);

  useEffect(() => {
    if (icao == undefined) {
      return;
    }

    const url = new URL('/api/v1/airport', JET_API_URL);
    url.searchParams.set('icao', icao);

    fetch(url)
      .then(res => res.json())
      .then((json: JetAPIResponse<JetAPIAirport>) => {
        if (json.success) {
          setAirport(json.data);
        }
      });

    return () => setAirport(null);
  }, [icao]);

  return airport;
}
