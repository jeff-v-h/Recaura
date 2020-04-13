import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as SubjectiveStore from "../../store/Subjective";
import { ApplicationState } from "../../store";

type ParentProps = { consultId: number };
type Props = SubjectiveStore.SubjectiveState &
  typeof SubjectiveStore.actionCreators &
  ParentProps;

class Subjective extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.ensureDataFetched();
  }

  render() {
    const { assessment } = this.props;
    if (!assessment) return null;

    return (
      <div>
        <div>
          <label htmlFor="moi">MOI</label>
          <textarea name="moi"></textarea>
        </div>
      </div>
    );
  }

  private ensureDataFetched = () => {
    const { consultId, getSubjectiveAssessment } = this.props;
    getSubjectiveAssessment(consultId);
  };
}

const mapStateToProps = (state: ApplicationState) => state.subjective;

export default compose<React.ComponentType<ParentProps>>(
  withRouter,
  connect(mapStateToProps, SubjectiveStore.actionCreators)
)(Subjective);
