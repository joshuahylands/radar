import { useTheme } from '@hooks/settings';
import { CSSProperties, PropsWithChildren } from 'react';

import styles from './skeleton.module.scss';

type SkeletonProps = {
  dependencies: unknown[];
  style?: CSSProperties;
};

function Skeleton(props: PropsWithChildren<SkeletonProps>) {
  const theme = useTheme();

  // Check all dependencies aren't undefined or null) 
  if (props.dependencies.reduce((accumulator, current) => accumulator && Boolean(current), true)) {
    return <>{props.children}</>;
  } else {
    return <div className={styles[theme]} style={props.style}/>;
  }
}

export default Skeleton;
