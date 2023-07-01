import { useTheme } from '@context/SettingsContext';

import styles from './spinner.module.scss';

function Spinner() {
  const theme = useTheme();

  return <div className={styles[theme]}></div>;
}

export default Spinner;
