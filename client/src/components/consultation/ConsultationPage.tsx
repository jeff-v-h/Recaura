import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './consultation.scss';
import SubjectiveSection from './SubjectiveSection';
import { ConsultPart } from '../../helpers/utils';
import { RadioChangeEvent } from 'antd/lib/radio';
import NavPills from './NavPills';
import ObjectiveSection from './ObjectiveSection';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ApplicationState } from '../../stores';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import TreatmentsAndPlanSection from './TreatmentsAndPlanSection';
import PatientInfo from '../common/PatientInfo';
import CasefileInfo from '../common/CasefileInfo';

const mapStateToProps = (state: ApplicationState) => state.consultation;
const connector = connect(mapStateToProps, consultActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{ consultId: string }>;

type State = {
  display: ConsultPart;
};

class ConsultationPage extends React.Component<Props, State> {
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
        return <SubjectiveSection consultId={consultId} />;
      case ConsultPart.Objective:
        return <ObjectiveSection consultId={consultId} />;
      case ConsultPart.Treatments:
      case ConsultPart.Plan:
        return <TreatmentsAndPlanSection consultId={consultId} />;
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

export default compose<React.ComponentType>(withRouter, connector)(ConsultationPage);
