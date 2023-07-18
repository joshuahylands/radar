import { Reducer, useReducer } from 'react';
import { Dispatch, PropsWithChildren, ReducerAction, createContext } from 'react';

export type FilterData = {
  enabled: boolean;
  filters: string[];
};

export type FilterReducerAction =
  | { type: 'toggle' }
  | { type: 'new' }
  | { type: 'delete', index: number }
  | { type: 'modify', index: number, value: string };

function filterReducer(state: FilterData, action: FilterReducerAction): FilterData {
  switch (action.type) {
  case 'toggle':
    return {
      ...state,
      enabled: !state.enabled
    };
  case 'new':
    return {
      ...state,
      filters: [...state.filters, '']
    };
  case 'delete':
  {
    const filters = [...state.filters];
    filters.splice(action.index, 1);

    return {
      ...state,
      filters
    };
  }
  case 'modify':
  {
    const filters = [...state.filters];
    filters[action.index] = action.value;

    return {
      ...state,
      filters
    };
  }
  }
}

export type FilterReducer = Reducer<FilterData, FilterReducerAction>;

export type FilterContextData = {
  typeFilter: FilterData;
  dispatchTypeFilter: Dispatch<ReducerAction<FilterReducer>>;

  callsignFilter: FilterData;
  dispatchCallsignFilter: Dispatch<ReducerAction<FilterReducer>>;
};

export const FilterContext = createContext<FilterContextData>({
  typeFilter: {
    enabled: false,
    filters: []
  },
  dispatchTypeFilter: () => { return; },

  callsignFilter: {
    enabled: false,
    filters: []
  },
  dispatchCallsignFilter: () => { return; }
});

export function FilterContextProvider(props: PropsWithChildren) {
  const [typeFilter, dispatchTypeFilter] = useReducer(filterReducer, {
    enabled: false,
    filters: []
  });
  const [callsignFilter, dispatchCallsignFilter] = useReducer(filterReducer, {
    enabled: false,
    filters: []
  });

  return (
    <FilterContext.Provider
      value={{
        typeFilter, dispatchTypeFilter,
        callsignFilter, dispatchCallsignFilter
      }}>
      { props.children }
    </FilterContext.Provider>
  );
}
