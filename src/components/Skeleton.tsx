import { useTheme } from '@context/SettingsContext';
import { CSSProperties, PropsWithChildren } from 'react';

import styles from './skeleton.module.scss';

type SkeletonProps = {
  dependencies: unknown[];
  style?: CSSProperties;
};

function Skeleton(props: PropsWithChildren<SkeletonProps>) {
  const theme = useTheme();

  if (
    props.children &&
    props.dependencies.reduce((accumulator, current) => accumulator && Boolean(current), true) // Check all dependencies aren't undefined or null
  ) {
    return <>{props.children}</>;
  } else {
    return <div className={styles[theme]} style={props.style}/>;
  }
}

export default Skeleton;
