import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type MapType = 'theme' | 'dark' | 'light' | 'satellite';
export type WeatherLayer = 'clouds_new' | 'precipitation_new' | 'pressure_new' | 'wind_new' | 'temp_new';

export type SettingsContextData = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;

  mapType: MapType;
  setMapType: Dispatch<SetStateAction<MapType>>;

  weatherLayer: WeatherLayer | undefined;
  setWeatherLayer: Dispatch<SetStateAction<WeatherLayer | undefined>>;

  aircraftTooltipsPermanent: boolean;
  setAircraftTooltipsPermanent: Dispatch<SetStateAction<boolean>>;
};

export const SettingsContext = createContext<SettingsContextData>({
  theme: 'system',
  setTheme: () => { return; },
  mapType: 'theme',
  setMapType: () => { return; },
  weatherLayer: undefined,
  setWeatherLayer: () => { return; },
  aircraftTooltipsPermanent: true,
  setAircraftTooltipsPermanent: () => { return; }
});

export function SettingsContextProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mapType, setMapType] = useState<MapType>('theme');
  const [weatherLayer, setWeatherLayer] = useState<WeatherLayer | undefined>(undefined);
  const [aircraftTooltipsPermanent, setAircraftTooltipsPermanent] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        theme, setTheme,
        mapType, setMapType,
        weatherLayer, setWeatherLayer,
        aircraftTooltipsPermanent, setAircraftTooltipsPermanent
      }}>
      { props.children }
    </SettingsContext.Provider>
  );
}
