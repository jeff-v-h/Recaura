import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import * as PatientStore from "../../store/Patient";
import { ApplicationState } from "../../store";
import { Descriptions } from "antd";

const Item = Descriptions.Item;

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
      <Descriptions title="User Info" bordered>
        <Item label="Title">{patient.honorific}</Item>
        <Item label="First Name">{patient.firstName}</Item>
        <Item label="Last Name">{patient.firstName}</Item>
        <Item label="DOB">{patient.firstName}</Item>
        <Item label="Email">{patient.email}</Item>
        <Item label="Home Ph">{patient.homePhone}</Item>
        <Item label="Mobile Ph">{patient.mobilePhone}</Item>
        <Item label="Gender">{patient.gender}</Item>
        <Item label="Occupation">{patient.occupation}</Item>
      </Descriptions>
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
