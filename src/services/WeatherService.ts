import { useEffect, useState } from 'react';

export function useMETAR(icao?: string): string | null {
  const [METAR, setMETAR] = useState<string | null>(null);

  useEffect(() => {
    if (icao == undefined) {
      return setMETAR(null);
    }

    const url = new URL('https://api.met.no/weatherapi/tafmetar/1.0/metar.txt');
    url.searchParams.set('icao', icao);

    fetch(url)
      .then(res => res.text())
      .then(text => {
        if (text.length > 0) {
          // Each line ends with an equals symbol. There is also empty lines at the bottom therefore we get the second to last element
          setMETAR(text.split('=\n').slice(-2)[0]);
        } else {
          setMETAR('Not Available');
        }
      })
      .catch(() => setMETAR(null));

    return () => setMETAR(null);
  }, [icao]);

  return METAR;
}
