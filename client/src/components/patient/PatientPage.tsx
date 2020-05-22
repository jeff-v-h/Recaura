import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as patientActions from '../../stores/patients/patientActions';
import { ApplicationState } from '../../stores';
import PatientDescription from './PatientDescription';
import PatientForm from './PatientForm';
import style from './patient.scss';

const mapStateToProps = (state: ApplicationState) => state.patient;
const connector = connect(mapStateToProps, patientActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{ patientId: string }>;
type State = { isNew: boolean };

class PatientPage extends React.Component<Props, State> {
  state = {
    isNew: this.props.match.params.patientId === 'new'
  };

  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { match, getPatient, id, list, selectPatient } = this.props;
    const { patientId } = match.params;

    if (!id || id !== patientId) {
      const patient = list.find((c) => c.id === patientId);

      if (patient) return selectPatient(patient);

      getPatient(patientId);
    }
  };

  onSubmit = () => {
    const { id, createPatient } = this.props;
    const patient = this.getPatientData();

    if (this.state.isNew) return createPatient(patient);
    // updatePatient({ ...patient, id })
  };

  getPatientData = () => {
    const { honorific, firstName, lastName, dob, email, homePhone, mobilePhone } = this.props;
    const { countryCode, gender, occupation } = this.props;

    return {
      honorific,
      firstName,
      lastName,
      dob,
      email,
      countryCode,
      homePhone,
      mobilePhone,
      gender,
      occupation
    };
  };

  render() {
    const { isFetching } = this.props;
    const patient = this.getPatientData();

    return (
      <div className={style.centerContainer}>
        <PatientDescription patient={this.props} />
        <PatientForm data={patient} onSubmit={this.onSubmit} isSaving={isFetching} />
      </div>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(PatientPage);
