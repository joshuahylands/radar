import { useState } from 'react';

import MapSettings from './MapSettings';
import Settings from './Settings';

import styles from './navBar.module.scss';

function useContent(): [boolean, React.JSX.Element | null, (value: React.JSX.Element | null) => void] {
  const [enabled, setEnabled] = useState(false);
  const [content, setContent] = useState<React.JSX.Element | null>(null);

  return [
    enabled,
    content,
    (value: React.JSX.Element | null) => {
      if (value == null) {
        setEnabled(false);
      } else {
        setEnabled(true);
        setContent(value);
      }
    }
  ];
}

function NavBar() {
  const [enabled, content, setContent] = useContent();

  return (
    <div className={styles.navbar}>
      <nav>
        <span className="material-symbols-outlined" onClick={() => setContent(<Settings/>)}>settings</span>
        <span className="material-symbols-outlined" onClick={() => setContent(<MapSettings/>)}>map</span>
      </nav>
      <main style={{ maxHeight: enabled ? '1000px' : '' }}>
        <header>
          <span className="material-symbols-outlined" onClick={() => setContent(null)}>expand_more</span>
        </header>
        <section>{content}</section>
      </main>
    </div>
  );
}

export default NavBar;
