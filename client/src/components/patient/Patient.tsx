import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { actionCreators } from "../../store/patient/patientActions";
import { PatientState } from "../../store/patient/patientTypes";
import { ApplicationState } from "../../store";
import PatientDescription from "./PatientDescription";
import CaseFiles from "./CaseFiles";

type Props = PatientState &
  typeof actionCreators &
  RouteComponentProps<{ id: string }>;

class Patient extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { match, getPatient, list, selectPatient } = this.props;
    const { id } = match.params;
    if (list.findIndex(p => p.id === id) !== -1)
      return selectPatient(id)
    getPatient(id);
  };

  render() {
    return (
      <>
        <PatientDescription patient={this.props} />
        <CaseFiles files={this.props.caseFiles} />
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.patient;

export default compose(
  withRouter,
  connect(mapStateToProps, actionCreators)
)(Patient);
