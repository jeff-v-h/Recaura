import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import style from "./consultation.scss";
import Subjective from "./Subjective";
import { getParsedUrlId } from "../../helpers/utils";

enum ConsultPart {
  Subjective,
  Objective,
  Treatments,
  Plans,
}

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

  render() {
    const { consultId, display } = this.state;
    return (
      <div className={style.container}>
        <div>horizontal index bar goes here</div>
        {display === ConsultPart.Subjective ? (
          <Subjective consultId={consultId} />
        ) : (
          <div>Objective here</div>
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
