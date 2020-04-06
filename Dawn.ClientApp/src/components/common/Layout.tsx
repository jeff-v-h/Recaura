import * as React from "react";
import NavMenu from "./NavMenu";

export default (props: { children?: React.ReactNode }) => (
  <>
    <NavMenu />
    <div className="main-container">{props.children}</div>
  </>
);
