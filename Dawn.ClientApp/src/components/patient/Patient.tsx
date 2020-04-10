import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import * as PatientStore from "../../store/Patient";
import { ApplicationState } from "../../store";
import PatientDescription from "./PatientDescription";

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

  renderDescription() {
    const { patient } = this.props;

    if (!patient) return null;

    return (
      <>
        <PatientDescription patient={patient} />
      </>
    );
  }

  render() {
    return this.renderDescription();
  }

  private ensureDataFetched() {
    const { match } = this.props;
    const parsedId = parseInt(match.params.id, 10);
    if (isNaN(parsedId)) {
      console.error(`${match.params.id} is not a number`);
      return;
    }

    this.props.getPatient(parsedId);
  }
}

export default compose(
  withRouter,
  connect(
    (state: ApplicationState) => state.patient, // Selects which state properties are merged into the component's props
    PatientStore.actionCreators // Selects which action creators are merged into the component's props
  )
)(Patient);
