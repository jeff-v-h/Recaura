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

  render() {
    // const { id, honorific, firstName, lastName, dob, email, countryCode, homePhone, mobilePhone, gender, occupation } = this.props;

    return (
      <>
        <PatientDescription patient={this.props} />
        <CaseFiles files={this.props.caseFiles} />
      </>
    );
  }

  private ensureDataFetched = () => {
    const { match, getPatient } = this.props;
    getPatient(match.params.id);
  };
}

const mapStateToProps = (state: ApplicationState) => state.patient;

export default compose(
  withRouter,
  connect(mapStateToProps, actionCreators)
)(Patient);
