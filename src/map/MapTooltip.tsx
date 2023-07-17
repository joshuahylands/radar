/*
  This React Component allows the react-leaflet Tooltip Component to be updated
  The component takes the same props plus 2 extra:
  - The first is the updateDependencies prop which is used in the useEffect hook within the component to detect a change to state and trigger a re-render
  - The second is the selected prop which sets the color of the tooltip if selected and trigger a re-render of color when it is deselected
*/

import { useTheme } from '@hooks/settings';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipProps } from 'react-leaflet';

import styles from './mapTooltip.module.scss';

interface MapTooltipProps extends TooltipProps {
  updateDependencies: React.DependencyList;
  selected?: boolean;
}

function MapTooltip(props: MapTooltipProps) {
  const theme = useTheme();
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    setShowTooltip(false);
    setTimeout(() => setShowTooltip(true), 0);
  }, [...props.updateDependencies, props.selected]);

  return showTooltip ? (
    <Tooltip
      {...props}
      className={`${props.className} ${props.selected ? styles[theme == 'dark' ? 'light' : 'dark'] : styles[theme]}`}>
      {props.children}
    </Tooltip>
  ) : null;
}

export default MapTooltip;
