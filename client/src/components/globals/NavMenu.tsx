import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { ApplicationState } from '../../stores';
import * as practitionerActions from '../../stores/practitioners/practitionerActions';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import style from './navMenu.scss';
import cookieService from '../../services/cookieService';

const Item = Menu.Item;

const mapStateToProps = (state: ApplicationState) => state.practitioner;
const connector = connect(mapStateToProps, practitionerActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{}>;

class NavMenu extends React.Component<Props, { current: string }> {
  state = {
    current: 'patients'
  };

  componentDidMount() {
    if (cookieService.getUserToken() && !this.props.id) this.props.getPractitioner('me');
  }

  handleClick = (e: ClickParam) => this.setState({ current: e.key });

  logout = () => this.props.logoutPractitioner();

  render() {
    const isAuthenticated = cookieService.getUserToken();

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
            {isAuthenticated && (
              <Item key="patients">
                <Link to="/patients">Patients</Link>
              </Item>
            )}
            {isAuthenticated ? (
              <Item key="logout" className={style.right} onClick={this.logout}>
                Logout
              </Item>
            ) : (
              <Item key="login" className={style.right}>
                <Link to="/login">Login</Link>
              </Item>
            )}
          </Menu>
        </div>
      </div>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(NavMenu);
