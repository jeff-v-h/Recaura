import * as React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ClickParam } from "antd/lib/menu";
import style from "./navMenu.scss";

const Item = Menu.Item;

export default class NavMenu extends React.PureComponent<
  {},
  { current: string }
> {
  public state = {
    current: "home",
  };

  public render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Item key="home">
          <Link to="/">Recaura</Link>
        </Item>
        <Item key="patients">
          <Link to="/patients">Patients</Link>
        </Item>
      </Menu>
    );
  }

  private handleClick = (e: ClickParam) => {
    this.setState({
      current: e.key,
    });
  };
}
