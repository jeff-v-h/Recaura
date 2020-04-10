import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import * as PatientStore from "../../../store/Patient";
import { ApplicationState } from "../../../store";
import { message } from "antd";

type Props = PatientStore.PatientState &
  typeof PatientStore.actionCreators &
  RouteComponentProps<{ id: string }>;

class CaseFile extends React.Component<Props> {
  componentDidMount() {}

  render() {
    const { details } = this.props;
    if (!details) return null;

    return (
      <>
        <div></div>
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
)(CaseFile);
