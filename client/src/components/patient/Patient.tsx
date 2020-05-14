import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import * as patientActions from "../../stores/patients/patientActions";
import { PatientState } from "../../stores/patients/patientTypes";
import { ApplicationState } from "../../stores";
import PatientDescription from "./PatientDescription";
import CaseFiles from "./CaseFiles";

type Props = PatientState &
  typeof patientActions &
  RouteComponentProps<{ id: string }>;

class Patient extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { match, getPatient } = this.props;
    getPatient(match.params.id);
  };

  render() {
    return (
      <>
        <PatientDescription patient={this.props} />
        <CaseFiles files={this.props.casefiles} />
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.patient;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, patientActions)
)(Patient);
