import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as practitionerActions from '../../stores/practitioners/practitionerActions';
import { ApplicationState } from '../../stores';
import style from './signup.scss';
import { SignUpValues } from '../../helpers/formHelper';
import { message } from 'antd';
import SignUpForm from './SignUpForm';

const mapStateToProps = (state: ApplicationState) => state.practitioner;
const connector = connect(mapStateToProps, practitionerActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{}>;

class SignUp extends React.Component<Props, {}> {
  onSubmit = async (values: SignUpValues) => {
    const { createPractitioner, history } = this.props;
    if (values.password !== values.confirmPassword) {
      return message.error('Passwords do not match');
    }

    try {
      delete values.confirmPassword;
      // await createPractitioner({ ...values, honorific: Honorific })
      // message.success('Account created successfully!')
      // history.push('/')
    } catch (e) {} // errors displayed via service
  };

  render() {
    const { isFetching } = this.props;

    return (
      <div className={style.centerContainer}>
        <SignUpForm onSubmit={this.onSubmit} isSaving={isFetching} />
      </div>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(SignUp);
