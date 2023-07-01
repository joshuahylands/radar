import { LatLng } from 'leaflet';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

import Aircraft from '@model/Aircraft';

// The URL to the API hosted by https://adsb.one/. Documentation at https://github.com/ADSB-One/api
const ADSB_ONE_URL = new URL('https://api.adsb.one/');

export type Area = {
  center: LatLng,
  radius: number;
};

type ADSBServiceContextData = {
  aircraft: Aircraft[];
  setGetAreaCallback: Dispatch<SetStateAction<() => Area>>;
  selectedAircraft?: Aircraft;
  setSelectedAircraftIcao24: Dispatch<SetStateAction<string | undefined>>;
};

const ADSBServiceContext = createContext<ADSBServiceContextData>({
  aircraft: [],
  setGetAreaCallback: () => () => { return; },
  setSelectedAircraftIcao24: () => { return; }
});

export function ADSBServiceProvider(props: PropsWithChildren) {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [getAreaCallback, setGetAreaCallback] = useState<() => Area>(() => () => {
    return {
      center: new LatLng(0, 0),
      radius: 0
    };
  });
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | undefined>();
  const [selectedAircraftIcao24, setSelectedAircraftIcao24] = useState<string | undefined>();

  useEffect(() => {
    let fetchingSelectedAircraft = true;

    const interval = setInterval(async () => {
      if (fetchingSelectedAircraft && selectedAircraftIcao24) {
        const url = new URL(`/v2/hex/${selectedAircraftIcao24}`, ADSB_ONE_URL);
        const res = await fetch(url);
        const json = await res.json();

        if (json['ac'].length > 0) {
          setSelectedAircraft(json['ac'][0]);
        }

        fetchingSelectedAircraft = false;
      } else {
        const area = getAreaCallback();
        const url = new URL(`/v2/point/${area.center.lat}/${area.center.lng}/${area.radius}`, ADSB_ONE_URL);
  
        const res = await fetch(url);
        const json = await res.json();
  
        setAircraft(json['ac']);

        fetchingSelectedAircraft = true;
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [getAreaCallback, selectedAircraftIcao24]);

  return (
    <ADSBServiceContext.Provider value={{
      aircraft,
      setGetAreaCallback,
      selectedAircraft,
      setSelectedAircraftIcao24: (value) => {
        setSelectedAircraft(undefined);
        setSelectedAircraftIcao24(value);
      }
    }}>
      { props.children }
    </ADSBServiceContext.Provider>
  );
}

export function useADSBServiceByArea(getArea: () => Area): Aircraft[] {
  const { aircraft, setGetAreaCallback } = useContext(ADSBServiceContext);

  useEffect(() => {
    setGetAreaCallback(() => getArea);
  }, []);

  return aircraft;
}

export function useADSBServiceByIcao24(icao24?: string): Aircraft | undefined {
  const { selectedAircraft, setSelectedAircraftIcao24 } = useContext(ADSBServiceContext);

  useEffect(() => {
    setSelectedAircraftIcao24(icao24);

    return () => setSelectedAircraftIcao24(undefined);
  }, [icao24]);

  return selectedAircraft;
}
