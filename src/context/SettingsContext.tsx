import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type WeatherLayer = 'clouds_new' | 'precipitation_new' | 'pressure_new' | 'wind_new' | 'temp_new';

export type SettingsContextData = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  weatherLayer: WeatherLayer | undefined;
  setWeatherLayer: Dispatch<SetStateAction<WeatherLayer | undefined>>;
  aircraftTooltipsPermanent: boolean;
  setAircraftTooltipsPermanent: Dispatch<SetStateAction<boolean>>;
};

export const SettingsContext = createContext<SettingsContextData>({
  theme: 'system',
  setTheme: () => { return; },
  weatherLayer: undefined,
  setWeatherLayer: () => { return; },
  aircraftTooltipsPermanent: true,
  setAircraftTooltipsPermanent: () => { return; }
});

export function SettingsContextProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>('system');
  const [weatherLayer, setWeatherLayer] = useState<WeatherLayer | undefined>(undefined);
  const [aircraftTooltipsPermanent, setAircraftTooltipsPermanent] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        theme, setTheme,
        weatherLayer, setWeatherLayer,
        aircraftTooltipsPermanent, setAircraftTooltipsPermanent
      }}>
      { props.children }
    </SettingsContext.Provider>
  );
}

export function useTheme(): Theme {
  const { theme } = useContext(SettingsContext);

  const computedTheme = useMemo(() => {
    if (theme == 'system') {
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    } else {
      return theme;
    }
  }, [theme]);

  return computedTheme;
}
