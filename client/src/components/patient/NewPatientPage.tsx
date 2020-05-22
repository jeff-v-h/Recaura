import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as patientActions from '../../stores/patients/patientActions';
import { ApplicationState } from '../../stores';
import style from './patient.scss';
import PatientForm from './PatientForm';
import { PatientBase } from 'src/models/patientModels';

const mapStateToProps = (state: ApplicationState) => state.patient;
const connector = connect(mapStateToProps, patientActions);

type Props = ConnectedProps<typeof connector>;

class NewPatientPage extends React.Component<Props> {
  onSubmit = async (values: PatientBase) => {
    this.props.createPatient(values);
  };

  render() {
    const { isFetching } = this.props;

    return (
      <div className={style.centerContainer}>
        <PatientForm onSubmit={this.onSubmit} isSaving={isFetching} />
      </div>
    );
  }
}

export default connector(NewPatientPage);
