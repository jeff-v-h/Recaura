import React from 'react';
import style from './hookForm.scss';

interface Props {
  children: React.ReactNode;
}

export default function HookSelectContainer(props: Props) {
  return (
    <div className={style.flexCol}>
      <div className={style.hookSelectContainer}>{props.children}</div>
      <div className={style.hookSelectSupport} />
    </div>
  );
}
