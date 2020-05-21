import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './consultation.scss';
import { ConsultPart } from '../../helpers/utils';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ApplicationState } from '../../stores';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import PatientInfo from '../common/PatientInfo';
import CasefileInfo from '../common/CasefileInfo';
import TreatmentsAndPlanForm from './TreatmentsAndPlanForm';
import SubjectiveForm from './SubjectiveForm';
import ObjectiveForm from './ObjectiveForm';
import moment from 'moment';
import { DatePicker, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const mapStateToProps = (state: ApplicationState) => state.consultation;
const connector = connect(mapStateToProps, consultActions);

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ patientId: string; casefileId: string; consultId: string }>;

type State = {
  display: ConsultPart;
  isNewConsult: boolean;
};

class ConsultationPage extends React.Component<Props, State> {
  state = {
    display: ConsultPart.Subjective,
    isNewConsult: this.props.match.params.consultId === 'new'
  };

  componentDidMount() {
    this.state.isNewConsult ? this.props.clearConsult() : this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { list, id, match, getConsult, selectConsult } = this.props;
    const { consultId } = match.params;

    if (!id || id !== consultId) {
      const consult = list.find((c) => c.id === consultId);

      if (consult) return selectConsult(consult);

      getConsult(consultId);
    }
  };

  onSubmit = () => {
    const { id, date, practitionerId, match } = this.props;
    const { subjectiveAssessment, objectiveAssessment, treatments, plans } = this.props;
    const { patientId, casefileId } = match.params;

    this.state.isNewConsult
      ? this.props.createConsult({
          subjectiveAssessment,
          objectiveAssessment,
          treatments,
          plans,
          patientId,
          casefileId,
          practitionerId: '5eba9093e047213db0cbcd38',
          date: date ? date : moment().format()
        })
      : this.props.updateConsult(id, {
          patientId,
          casefileId,
          date,
          practitionerId,
          subjectiveAssessment,
          objectiveAssessment,
          treatments,
          plans
        });
  };

  selectSection = (display: ConsultPart) => this.setState({ display });

  renderConsultSection = (consultPart: ConsultPart) => {
    const { modifySubjective, modifyObjective, modifyTreatmentsAndPlans } = this.props;
    const { subjectiveAssessment, objectiveAssessment, treatments, plans, id } = this.props;

    switch (consultPart) {
      case ConsultPart.Subjective:
        const data = this.state.isNewConsult && id.length > 0 ? undefined : subjectiveAssessment;
        return (
          <SubjectiveForm
            data={data}
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

  changeDate = (date: moment.Moment | null) => date && this.props.modifyDate(date.format());

  getDate = (date: string) =>
    !date && this.state.isNewConsult ? moment() : !date ? undefined : moment(date);

  deleteConsult = () => this.props.deleteConsult(this.props.id);

  render() {
    const { display, isNewConsult } = this.state;
    const { date } = this.props;

    return (
      <>
        <PatientInfo />
        <CasefileInfo />
        <div className={isNewConsult ? style.dateRow : style.dateRowSpaced}>
          <div>
            <label className={style.consultDateLabel}>Consult date:</label>
            <DatePicker format="DD-MM-YYYY" onChange={this.changeDate} value={this.getDate(date)} />
          </div>
          {!isNewConsult && (
            <Button type="primary" icon={<DeleteOutlined />} onClick={this.deleteConsult} />
          )}
        </div>
        {this.renderConsultSection(display)}
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(ConsultationPage);
