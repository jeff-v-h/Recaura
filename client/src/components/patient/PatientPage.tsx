import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as patientActions from '../../stores/patients/patientActions';
import { ApplicationState } from '../../stores';
import PatientForm from './PatientForm';
import moment from 'moment';
import { PatientBaseForm } from '../../helpers/formHelper';

const mapStateToProps = (state: ApplicationState) => state.patient;
const connector = connect(mapStateToProps, patientActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{ patientId: string }>;
type State = { isNew: boolean };

class PatientPage extends React.Component<Props, State> {
  state = {
    isNew: this.props.match.params.patientId === 'new'
  };

  componentDidMount() {
    !this.state.isNew && this.ensureDataFetched();
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

  save = (values: PatientBaseForm) => {
    const { id, createPatient, updatePatient } = this.props;
    const patient = { ...values, dob: values.dob?.format() ?? '' };

    if (this.state.isNew) return createPatient(patient);
    updatePatient(id, patient);
  };

  getPatientData = () => {
    const { honorific, firstName, lastName, dob, email, homePhone, mobilePhone } = this.props;
    const { countryCode, gender, occupation } = this.props;

    return {
      honorific,
      firstName,
      lastName,
      dob: dob ? moment(dob) : undefined,
      email,
      countryCode,
      homePhone,
      mobilePhone,
      gender,
      occupation
    };
  };

  render() {
    const { isFetching, error } = this.props;
    const { isNew } = this.state;
    const data = isNew ? undefined : this.getPatientData();

    return (
      <PatientForm
        data={data}
        onSubmit={this.save}
        isSaving={isFetching}
        isNew={isNew}
        error={error}
      />
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(PatientPage);
