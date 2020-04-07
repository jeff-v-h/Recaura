import * as React from "react";
import NavMenu from "./NavMenu";
import style from "./Layout.scss";

export default (props: { children?: React.ReactNode }) => (
  <div className={style.body}>
    <NavMenu />
    <div className={style.mainContainer}>{props.children}</div>
  </div>
);
