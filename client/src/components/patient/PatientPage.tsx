import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as patientActions from '../../stores/patients/patientActions';
import { ApplicationState } from '../../stores';
import PatientDescription from './PatientDescription';

const mapStateToProps = (state: ApplicationState) => state.patient;
const connector = connect(mapStateToProps, patientActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{ patientId: string }>;

class PatientPage extends React.Component<Props> {
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

  render() {
    return (
      <>
        <PatientDescription patient={this.props} />
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(PatientPage);
