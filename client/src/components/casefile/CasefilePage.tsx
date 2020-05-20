import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as consultationActions from '../../stores/consultations/consultationActions';
import { ApplicationState } from '../../stores';
import PatientInfo from '../common/PatientInfo';
import Consultations from './Consultations';
import CasefileInfo from '../common/CasefileInfo';

const mapStateToProps = (state: ApplicationState) => state.consultation;
const connector = connect(mapStateToProps, consultationActions);

type Props = ConnectedProps<typeof connector> &
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
    const { list, match, isFetching } = this.props;
    const { patientId, casefileId } = match.params;

    return (
      <>
        <PatientInfo />
        <CasefileInfo />
        <Consultations
          consults={list}
          patientId={patientId}
          casefileId={casefileId}
          isFetching={isFetching}
        />
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(CasefilePage);
