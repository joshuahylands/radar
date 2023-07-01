import { useEffect, useState } from 'react';

// The URL to the HexDB API. The docs are hosted at https://hexdb.io/
const HEXDB_URL = new URL('https://hexdb.io/');

export function useAircraftImage(icao24?: string): string {
  const [image, setImage] = useState<string>('/plane.jpg');

  useEffect(() => {
    if (!icao24) return;

    const url = new URL('/hex-image', HEXDB_URL);
    url.searchParams.set('hex', icao24);

    fetch(url)
      .then(async res => {
        const imageURL = await res.text();

        setImage(imageURL);
      })
      .catch(() => setImage('/plane.jpg'));
  }, [icao24]);

  return image;
}

export function useCallsignRoute(callsign?: string): [string, string] {
  const [route, setRoute] = useState<[string, string]>(['N/A', 'N/A']);

  useEffect(() => {
    if (!callsign) return;

    const url = new URL('/callsign-route', HEXDB_URL);
    url.searchParams.set('callsign', callsign);

    fetch(url)
      .then(async res => {
        const routeRaw = await res.text();
        const routeParts = routeRaw.split('-');

        setRoute([routeParts[0], routeParts[1]]);
      })
      .catch(() => setRoute(['N/A', 'N/A']));

    return () => setRoute(['N/A', 'N/A']);
  }, [callsign]);

  return route;
}
