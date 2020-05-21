import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ApplicationState } from '../../stores';
import PatientInfo from '../common/PatientInfo';
import style from './consultation.scss';
import { ConsultPart } from '../../helpers/utils';
import TreatmentsAndPlanForm from './TreatmentsAndPlanForm';
import SubjectiveForm from './SubjectiveForm';
import ObjectiveForm from './ObjectiveForm';
import moment from 'moment';
import { DatePicker } from 'antd';
import CasefileInfo from '../common/CasefileInfo';

const mapStateToProps = (state: ApplicationState) => state.consultation;
const connector = connect(mapStateToProps, consultActions);

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ patientId: string; casefileId: string; consultId: string }>;

type State = {
  display: ConsultPart;
  date: moment.Moment | null;
};

class NewConsultationPage extends React.Component<Props, State> {
  state = {
    display: ConsultPart.Subjective,
    date: moment()
  };

  componentDidMount() {
    this.props.clearConsult();
  }

  onSubmit = () => {
    const { subjectiveAssessment, objectiveAssessment, treatments, plans, match } = this.props;
    const { patientId, casefileId } = match.params;

    this.props.createConsult({
      subjectiveAssessment,
      objectiveAssessment,
      treatments,
      plans,
      patientId,
      casefileId,
      practitionerId: '5eba9093e047213db0cbcd38',
      date: this.state.date.format()
    });
  };

  selectSection = (display: ConsultPart) => this.setState({ display });

  renderConsultSection = (consultPart: ConsultPart) => {
    const {
      modifySubjective,
      modifyObjective,
      modifyTreatmentsAndPlans,
      subjectiveAssessment,
      objectiveAssessment,
      treatments,
      plans,
      id
    } = this.props;

    switch (consultPart) {
      case ConsultPart.Subjective:
        return (
          <SubjectiveForm
            data={id.length > 0 ? undefined : subjectiveAssessment}
            display={consultPart}
            changeSection={this.selectSection}
            saveValues={modifySubjective}
          />
        );
      case ConsultPart.Objective:
        return (
          <ObjectiveForm
            data={objectiveAssessment}
            display={consultPart}
            changeSection={this.selectSection}
            saveValues={modifyObjective}
          />
        );
      default:
        return (
          <TreatmentsAndPlanForm
            data={{ treatments, plans }}
            display={consultPart}
            changeSection={this.selectSection}
            saveValues={modifyTreatmentsAndPlans}
            createConsult={this.onSubmit}
          />
        );
    }
  };

  changeDate = (date: moment.Moment | null) => this.setState({ date });

  render() {
    const { display, date } = this.state;

    return (
      <>
        <PatientInfo />
        <CasefileInfo />
        <div className={style.consultDate}>
          <label>Consult date:</label>
          <DatePicker format="DD-MM-YYYY" onChange={this.changeDate} defaultValue={date} />
        </div>
        <div className={style.container}>{this.renderConsultSection(display)}</div>
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(NewConsultationPage);
