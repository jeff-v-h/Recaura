import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as practitionerActions from '../../stores/practitioners/practitionerActions';
import { ApplicationState } from '../../stores';
import style from './signup.scss';
import { SignUpValues, RegisterType } from '../../helpers/formHelper';
import SignUpForm from './SignUpForm';

const mapStateToProps = (state: ApplicationState) => ({
  practitioner: state.practitioner,
  clinic: state.clinic
});
const connector = connect(mapStateToProps, practitionerActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{}>;
type State = { showClinic: boolean };

class SignUpPage extends React.Component<Props, State> {
  state = {
    showClinic: false
  };

  onSubmit = (values: SignUpValues) => {
    const { signUpPractitioner } = this.props;

    if (values.registerType === RegisterType.solePractitioner)
      values.clinicName = `Sole Practitioner: ${values.email}`;

    signUpPractitioner(values);
  };

  toggleClinicDisplay = () => this.setState((prevState) => ({ showClinic: !prevState.showClinic }));

  render() {
    const { practitioner, clinic } = this.props;
    const isFetching = (practitioner?.isFetching || clinic?.isFetching) ?? false;

    return (
      <div className={style.signup}>
        <SignUpForm
          onSubmit={this.onSubmit}
          isSaving={isFetching}
          showClinic={this.state.showClinic}
          toggleClinic={this.toggleClinicDisplay}
        />
      </div>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(SignUpPage);
