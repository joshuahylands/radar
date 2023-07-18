import Toggle from '@components/Toggle';
import { FilterContext, FilterData, FilterReducer } from '@context/FilterContext';
import { Dispatch, ReducerAction, useContext } from 'react';

import styles from './filterSettings.module.scss';

type FilterProps = {
  keyName: string;
  name: string;
  data: FilterData;
  dispatch: Dispatch<ReducerAction<FilterReducer>>;
};

function Filter(props: FilterProps) {
  return (
    <>
      <header>
        <label>{ props.name }</label>
        <Toggle
          enabled={props.data.enabled}
          onChange={() => props.dispatch({ type: 'toggle' })}/>
        <span
          className="material-symbols-outlined"
          onClick={() => props.dispatch({ type: 'new' })}>
          add
        </span>
      </header>

      <ul>
        {
          props.data.filters.map((f, index) => (
            <li key={`${props.keyName}-${index}`}>
              <input
                type="text"
                placeholder={`${props.name}...`}
                value={f}
                onChange={e => props.dispatch({ type: 'modify', index, value: e.target.value })}/>
              <span
                className="material-symbols-outlined"
                onClick={() => props.dispatch({ type: 'delete', index })}>
                close
              </span>
            </li>
          ))
        }
      </ul>
    </>
  );
}

function FilterSettings() {
  const {
    typeFilter, dispatchTypeFilter,
    callsignFilter, dispatchCallsignFilter
  } = useContext(FilterContext);

  return (
    <div className={styles.filterSettings}>
      <Filter keyName="aircraft-type" name="Aircraft Type" data={typeFilter} dispatch={dispatchTypeFilter}/>
      <Filter keyName="callsign" name="Callsign" data={callsignFilter} dispatch={dispatchCallsignFilter}/>
    </div>
  );
}

export default FilterSettings;
