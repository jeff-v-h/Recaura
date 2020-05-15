import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './consultation.scss';
import Subjective from './Subjective';
import { ConsultPart } from '../../helpers/utils';
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
import CasefileInfo from '../common/CasefileInfo';

type Props = ConsultationState & typeof consultActions & RouteComponentProps<{ consultId: string }>;

type State = {
  display: ConsultPart;
};

class Consultation extends React.Component<Props, State> {
  state = {
    display: ConsultPart.Subjective
  };

  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { list, id, match, getConsult, selectConsult } = this.props;

    if (!id) {
      const { consultId } = match.params;
      const consult = list.find((c) => c.id === consultId);

      if (consult) return selectConsult(consult);

      getConsult(consultId);
    }
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
    const { display } = this.state;
    const { consultId } = this.props.match.params;

    return (
      <>
        <PatientInfo />
        <CasefileInfo />
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
