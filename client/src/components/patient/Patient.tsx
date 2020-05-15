import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as patientActions from '../../stores/patients/patientActions';
import { PatientState } from '../../stores/patients/patientTypes';
import { ApplicationState } from '../../stores';
import PatientDescription from './PatientDescription';
import Casefiles from './Casefiles';

type Props = PatientState & typeof patientActions & RouteComponentProps<{ patientId: string }>;

class Patient extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { match, getPatient } = this.props;
    getPatient(match.params.patientId);
  };

  render() {
    const { casefiles, match } = this.props;
    return (
      <>
        <PatientDescription patient={this.props} />
        <Casefiles files={casefiles} patientId={match.params.patientId} />
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.patient;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, patientActions)
)(Patient);
