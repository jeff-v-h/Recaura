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
import TreatmentsAndPlan from "./TreatmentsAndPlan";

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
    this.ensureDataFetched();
  }

  onChange = (e: RadioChangeEvent) => {
    this.setState({ display: e.target.value });
  };

  renderConsultSection = (consultPart: ConsultPart, consultId: number) => {
    switch (consultPart) {
      case ConsultPart.Subjective:
        return <Subjective consultId={consultId} />;
      case ConsultPart.Objective:
        return <Objective consultId={consultId} />;
      case ConsultPart.Treatments:
      case ConsultPart.Plan:
        return <TreatmentsAndPlan consultId={consultId} />;
      default:
        return null;
    }
  };

  render() {
    const { consultId, display } = this.state;
    return (
      <div className={style.container}>
        <NavPills value={display} onChange={this.onChange} />
        {this.renderConsultSection(display, consultId)}
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
