import * as React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';
import style from './navMenu.scss';

const Item = Menu.Item;

export default class NavMenu extends React.PureComponent<{}, { current: string }> {
  state = {
    current: 'patients'
  };

  handleClick = (e: ClickParam) => this.setState({ current: e.key });

  render() {
    return (
      <div className={style.navbar}>
        <div className={style.innerNavbar}>
          <div className={style.appName}>
            <Link to="/" className={style.appLink}>
              Recaura
            </Link>
          </div>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{ maxWidth: 1280, margin: '0 auto', borderBottom: 'none', flexGrow: 1 }}
          >
            <Item key="patients">
              <Link to="/patients">Patients</Link>
            </Item>
          </Menu>
        </div>
      </div>
    );
  }
}
