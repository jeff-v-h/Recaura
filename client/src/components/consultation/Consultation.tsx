import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './consultation.scss';
import Subjective from './Subjective';
import { getParsedUrlId, ConsultPart } from '../../helpers/utils';
import { RadioChangeEvent } from 'antd/lib/radio';
import NavPills from './NavPills';
import Objective from './Objective';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ConsultationState } from '../../stores/consultations/consultationTypes';
import { ApplicationState } from '../../stores';
import { compose } from 'redux';
import { connect } from 'react-redux';
import TreatmentsAndPlan from './TreatmentsAndPlan';
import PatientInfo from '../common/PatientInfo';

type Props = ConsultationState & typeof consultActions & RouteComponentProps<{ consultId: string }>;

type State = {
  consultId: string;
  display: ConsultPart;
};

class Consultation extends React.Component<Props, State> {
  state = {
    consultId: this.props.match.params.consultId,
    display: ConsultPart.Subjective
  };

  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { getConsult } = this.props;
    getConsult(this.state.consultId);
  };

  onChange = (e: RadioChangeEvent) => this.setState({ display: e.target.value });

  renderConsultSection = (consultPart: ConsultPart, consultId: string) => {
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
      <>
        <PatientInfo />
        <div className={style.container}>
          <NavPills value={display} onChange={this.onChange} />
          {this.renderConsultSection(display, consultId)}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.consultation;
const connectProps = connect(mapStateToProps, consultActions);

export default compose<React.ComponentType>(withRouter, connectProps)(Consultation);
