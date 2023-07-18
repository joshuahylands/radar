import { FilterContext } from '@context/FilterContext';
import Aircraft from '@model/Aircraft';
import { useContext, useMemo } from 'react';

// Applys the selected filters to a collection of aircraft and returns them
export function useFilter(aircraft: Aircraft[]): Aircraft[] {
  const filter = useContext(FilterContext);
  
  const filteredAircraft = useMemo(() => {
    return aircraft.filter(a => {
      let match = true;

      // Apply Aircraft Type filter
      if (filter.typeFilter.enabled) {
        match &&= filter.typeFilter.filters.includes(a.t || '');
      }

      // Apply Callsign filter
      if (filter.callsignFilter.enabled) {
        let callsignMatch = false;
        for (const callsign of filter.callsignFilter.filters) {
          callsignMatch ||= a.flight && callsign != '' ? a.flight.startsWith(callsign) : false;
        }

        match &&= callsignMatch;
      }

      return match;
    });
  }, [aircraft, filter]);

  return filteredAircraft;
}
