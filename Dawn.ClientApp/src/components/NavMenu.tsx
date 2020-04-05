import * as React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ClickParam } from "antd/lib/menu";

export default class NavMenu extends React.PureComponent<
  {},
  { current: string }
> {
  public state = {
    current: "home"
  };

  public render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link to="/">Dawn</Link>
        </Menu.Item>
      </Menu>
    );
  }

  private handleClick = (e: ClickParam) => {
    this.setState({
      current: e.key
    });
  };
}
