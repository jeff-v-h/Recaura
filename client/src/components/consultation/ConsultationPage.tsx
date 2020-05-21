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
import { DatePicker } from 'antd';

const mapStateToProps = (state: ApplicationState) => state.consultation;
const connector = connect(mapStateToProps, consultActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{ consultId: string }>;

type State = {
  display: ConsultPart;
  date: moment.Moment | null;
};

class ConsultationPage extends React.Component<Props, State> {
  state = {
    display: ConsultPart.Subjective,
    date: moment()
  };

  componentDidMount() {
    this.ensureDataFetched();
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
    const updatedConsult = { ...this.props };

    delete updatedConsult.list;
    delete updatedConsult.isFetching;
    updatedConsult.date = this.state.date.format();

    this.props.updateConsult(updatedConsult);
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
    console.log('renderConsultSection called: id is', id);

    switch (consultPart) {
      case ConsultPart.Subjective:
        return (
          <SubjectiveForm
            data={subjectiveAssessment}
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
    const { id } = this.props;
    console.log('render page id', id);
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

export default compose<React.ComponentType>(withRouter, connector)(ConsultationPage);
