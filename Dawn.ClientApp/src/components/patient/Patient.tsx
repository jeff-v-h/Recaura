import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import * as PatientStore from "../../store/Patient";
import { ApplicationState } from "../../store";
import PatientDescription from "./PatientDescription";
import CaseFiles from "./CaseFiles";

type Props = PatientStore.PatientState &
  typeof PatientStore.actionCreators &
  RouteComponentProps<{ id: string }>;

class Patient extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.ensureDataFetched();
  }

  render() {
    const { patient } = this.props;
    if (!patient) return null;

    return (
      <>
        <PatientDescription patient={patient} />
        <CaseFiles files={patient.caseFiles} />
      </>
    );
  }

  private ensureDataFetched = () => {
    const { match } = this.props;
    const parsedId = parseInt(match.params.id, 10);
    if (isNaN(parsedId)) {
      console.error(`${match.params.id} is not a number`);
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
