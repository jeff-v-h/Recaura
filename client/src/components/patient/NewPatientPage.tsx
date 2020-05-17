import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { message } from 'antd';
import * as patientActions from '../../stores/patients/patientActions';
import { PatientState } from '../../stores/patients/patientTypes';
import { ApplicationState } from '../../stores';
import style from './patient.scss';
import NewPatientForm from './NewPatientForm';

type Props = PatientState & typeof patientActions;

class NewPatientPage extends React.Component<Props> {
  onSubmit = async (values: any) => {
    console.log(values);
    // const { createPatient, history } = this.props;
    // if (values.password !== values.confirmpassword) {
    //     return message.error("Passwords do not match");
    // }

    // try {
    //     delete values.confirmpassword
    //     await createPatient({ ...values })
    //     message.success('Patient created')
    //     history.push('/')
    // } catch (e) {} // errors displayed via service
  };

  render() {
    const { isFetching } = this.props;
    return (
      <div className={style.centerContainer}>
        <NewPatientForm />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.patient;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, patientActions)
)(NewPatientPage);
