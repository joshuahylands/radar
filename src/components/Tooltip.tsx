import { CSSProperties, PropsWithChildren } from 'react';

import styles from './tooltip.module.scss';

type TooltipProps = {
  text: string;
  position: 'top' | 'bottom' | 'left' | 'right',
  style?: CSSProperties
};

function Tooltip(props: PropsWithChildren<TooltipProps>) {
  return (
    <div className={styles.tooltip}>
      { props.children }
      <div style={props.style} className={styles[props.position]}>{ props.text }</div>
    </div>
  );
}

export default Tooltip;
