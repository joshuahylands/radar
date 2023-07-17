import { useTheme } from '@hooks/settings';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './sidebar.module.scss';

function Sidebar(props: PropsWithChildren) {
  const navigate = useNavigate();
  const theme = useTheme();

  const [enabled, setEnabled] = useState(true);
  const [content, setContent] = useState<ReactNode>(null);

  // This keeps the content within the sidebar for 1 second while the sidebar animates off the screen
  useEffect(() => {
    if (props.children == null) {
      setEnabled(false);
      setTimeout(() => setContent(null), 1000);
    } else {
      setContent(props.children);
      setEnabled(true);
    }
  }, [props.children]);

  return (
    <div className={`${styles[theme]} ${!enabled && styles.disabled}`}>
      <header>
        <span className="material-symbols-outlined" onClick={() => navigate('/')}>expand_more</span>
      </header>
      <main>{content}</main>
    </div>
  );
}

export default Sidebar;
