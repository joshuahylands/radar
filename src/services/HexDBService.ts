import { useEffect, useState } from 'react';

// The URL to the HexDB API. The docs are hosted at https://hexdb.io/
const HEXDB_URL = new URL('https://hexdb.io/');

export function useAircraftImage(icao24?: string): string | null {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setImage(null);
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

type Route = [ string?, string? ];

export function useCallsignRoute(callsign?: string): Route {
  const [route, setRoute] = useState<Route>([ undefined, undefined ]);

  useEffect(() => {
    if (!callsign) return;

    const url = new URL('/callsign-route', HEXDB_URL);
    url.searchParams.set('callsign', callsign);

    fetch(url)
      .then(async res => {
        const routeRaw = await res.text();

        if (routeRaw == 'n/a') {
          setRoute([ undefined, undefined ]);
        } else {
          const routeParts = routeRaw.split('-');
          setRoute([routeParts[0], routeParts[1]]);
        }
      })
      .catch(() => setRoute([ undefined, undefined ]));

    return () => setRoute([ undefined, undefined ]);
  }, [callsign]);

  return route;
}
