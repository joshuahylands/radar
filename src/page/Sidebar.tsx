import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@context/SettingsContext';

import style from './sidebar.module.scss';

export type SidebarProps = {
  title: string;
};

function Sidebar(props: PropsWithChildren<SidebarProps>) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div className={theme == 'dark' ? style.dark : style.light}>
      <header>
        <span>{ props.title }</span>
        <span className={`material-symbols-outlined ${style.close}`} onClick={() => navigate('/')}>close</span>
      </header>
      <main>{ props.children }</main>
    </div>
  );
}

export default Sidebar;
