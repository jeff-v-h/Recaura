import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import * as PatientStore from "../../store/Patient";
import { ApplicationState } from "../../store";
import PatientDescription from "./PatientDescription";
import CaseFiles from "./CaseFiles";
import { message } from "antd";

type Props = PatientStore.PatientState &
  typeof PatientStore.actionCreators &
  RouteComponentProps<{ id: string }>;

class Patient extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  render() {
    const { details } = this.props;
    if (!details) return null;

    return (
      <>
        <PatientDescription patient={details} />
        <CaseFiles files={details.caseFiles} />
      </>
    );
  }

  private ensureDataFetched = () => {
    const { match } = this.props;
    const parsedId = parseInt(match.params.id, 10);
    if (isNaN(parsedId)) {
      message.error(`${match.params.id} is not a number`);
      return;
    }

    this.props.getPatient(parsedId);
  };
}

const mapStateToProps = (state: ApplicationState) => state.patient;

export default compose(
  withRouter,
  connect(mapStateToProps, PatientStore.actionCreators)
)(Patient);
