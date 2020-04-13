import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import style from "./consultation.scss";
import Subjective from "./Subjective";
import { getParsedUrlId, ConsultPart } from "../../helpers/utils";
import { RadioChangeEvent } from "antd/lib/radio";
import NavPills from "./NavPills";
import Objective from "./Objective";

type Props = RouteComponentProps<{ consultId: string }>;

type State = {
  consultId: number;
  display: ConsultPart;
};

class Consultation extends React.Component<Props, State> {
  state = {
    consultId: this.getUrlConsultId(),
    display: ConsultPart.Subjective,
  };

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

  private getUrlConsultId(): number {
    const { match } = this.props;
    return getParsedUrlId(match.params.consultId);
  }
}

export default withRouter(Consultation);
