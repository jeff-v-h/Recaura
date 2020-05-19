import React from 'react';
import NavMenu from './NavMenu';
import style from './layout.scss';

export default (props: { children?: React.ReactNode }) => (
  <>
    <NavMenu />
    <div className={style.body}>
      <div className={style.mainContainer}>{props.children}</div>
    </div>
  </>
);
