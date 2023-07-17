// This file exports hooks related to the SettingsContext

import { MapType, SettingsContext, Theme } from '@context/SettingsContext';
import { THEME_DARK_PRIMARY, THEME_LIGHT_PRIMARY } from '@styles/theme';
import { useContext, useMemo } from 'react';

// Returns the theme selected. If 'system' is selected it will get the theme selected by the system
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

export type MapTypeData = {
  url: string;
  attribution: string;
};

const cartoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Returns the url and attribution data for each map type
export function getMapData(mapType: MapType, theme: Theme): MapTypeData {
  if (mapType == 'dark' || mapType == 'theme' && theme == 'dark') {
    return {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: cartoAttribution
    };
  } else if (mapType == 'light' || mapType == 'theme' && theme == 'light') {
    return {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: cartoAttribution
    };
  } else {
    return {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    };
  }
}

// Returns the color the map markers should used based on the theme and mapType selected
export function useMarkerColor(): string {
  const theme = useTheme();
  const { mapType } = useContext(SettingsContext);

  const color = useMemo(() => {
    if (mapType == 'dark' || mapType != 'light' && theme =='dark') {
      return THEME_LIGHT_PRIMARY;
    } else {
      return THEME_DARK_PRIMARY;
    }
  }, [theme, mapType]);

  return color;
}
