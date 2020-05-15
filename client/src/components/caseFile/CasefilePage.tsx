import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as consultationActions from '../../stores/consultations/consultationActions';
import { ConsultationState } from '../../stores/consultations/consultationTypes';
import { ApplicationState } from '../../stores';
import style from './casefile.scss';
import PatientInfo from '../common/PatientInfo';
import Consultations from './Consultations';

type Props = ConsultationState &
  typeof consultationActions &
  RouteComponentProps<{ patientId: string; casefileId: string }>;

class CasefilePage extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  private ensureDataFetched = () => {
    const { list, match, getConsults } = this.props;
    if (list.length === 0) getConsults(match.params.casefileId);
  };

  render() {
    const { list, match } = this.props;
    const { patientId, casefileId } = match.params;

    return (
      <>
        <PatientInfo />
        <Consultations consults={list} patientId={patientId} casefileId={casefileId} />
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.consultation;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, consultationActions)
)(CasefilePage);
