import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import style from "./consultation.scss";
import Subjective from "./Subjective";
import { getParsedUrlId, ConsultPart } from "../../helpers/utils";
import { RadioChangeEvent } from "antd/lib/radio";
import NavPills from "./NavPills";
import Objective from "./Objective";
import * as ConsultationStore from "../../store/Consultation";
import { ApplicationState } from "../../store";
import { compose } from "redux";
import { connect } from "react-redux";

type Props = ConsultationStore.ConsultationState &
  typeof ConsultationStore.actionCreators &
  RouteComponentProps<{ consultId: string }>;

type State = {
  consultId: number;
  display: ConsultPart;
};

class Consultation extends React.Component<Props, State> {
  state = {
    consultId: this.getUrlConsultId(),
    display: ConsultPart.Subjective,
  };

  componentDidMount() {
    console.log("mount");
    this.ensureDataFetched();
  }

  onChange = (e: RadioChangeEvent) => {
    this.setState({ display: e.target.value });
  };

  render() {
    const { consultId, display } = this.state;
    return (
      <div className={style.container}>
        <NavPills value={display} onChange={this.onChange} />
        {display === ConsultPart.Subjective ? (
          <Subjective consultId={consultId} />
        ) : (
          <Objective consultId={consultId} />
        )}
      </div>
    );
  }

  private ensureDataFetched = () => {
    const { getConsult } = this.props;
    getConsult(this.state.consultId);
  };

  private getUrlConsultId(): number {
    const { match } = this.props;
    return getParsedUrlId(match.params.consultId);
  }
}

const mapStateToProps = (state: ApplicationState) => state.subjective;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, ConsultationStore.actionCreators)
)(Consultation);
