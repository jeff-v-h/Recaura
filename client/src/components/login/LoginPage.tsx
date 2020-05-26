import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import * as practitionerActions from '../../stores/practitioners/practitionerActions';
import { ApplicationState } from '../../stores';
import style from './login.scss';
import { Login } from '../../models/practitionerModels';
import LoginForm from './LoginForm';

const mapStateToProps = (state: ApplicationState) => state.practitioner;
const connector = connect(mapStateToProps, practitionerActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{}>;

class LoginPage extends React.Component<Props> {
  onSubmit = (values: Login) => this.props.loginPractitioner(values.email, values.password);

  render() {
    const { isFetching, id } = this.props;

    if (id) return <Redirect to="/" />;

    return (
      <div className={style.loginPage}>
        <LoginForm onSubmit={this.onSubmit} isSaving={isFetching} />
      </div>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(LoginPage);
