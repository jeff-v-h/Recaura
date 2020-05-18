import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { message } from 'antd';
import * as patientActions from '../../stores/patients/patientActions';
import { PatientState } from '../../stores/patients/patientTypes';
import { ApplicationState } from '../../stores';
import style from './patient.scss';
import NewPatientForm from './NewPatientForm';
import { PatientBase } from 'src/models/patientModels';

type Props = PatientState & typeof patientActions & RouteComponentProps;

class NewPatientPage extends React.Component<Props> {
  onSubmit = async (values: PatientBase) => {
    console.log(values);
    const { createPatient, history } = this.props;
    // if (values.password !== values.confirmpassword) {
    //     return message.error("Passwords do not match");
    // }

    createPatient(values);
    console.log('props after create', this.props);
    //     delete values.confirmpassword
    //     await createPatient({ ...values })
    //     message.success('Patient created')
    //     history.push('/')
  };

  render() {
    const { isFetching, redirectTo } = this.props;

    if (redirectTo) return <Redirect to={redirectTo} />;

    return (
      <div className={style.centerContainer}>
        <NewPatientForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.patient;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, patientActions)
)(NewPatientPage);
