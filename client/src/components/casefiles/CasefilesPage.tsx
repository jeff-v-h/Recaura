import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { ApplicationState } from '../../stores';
import PatientInfo from '../common/PatientInfo';
import Casefiles from './Casefiles';

const mapStateToProps = (state: ApplicationState) => state.casefile;
const connector = connect(mapStateToProps, casefileActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{ patientId: string }>;

class CasefilesPage extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  private ensureDataFetched = () => {
    const { match, getCasefiles } = this.props;
    getCasefiles(match.params.patientId);
  };

  render() {
    const { list, match, isFetching } = this.props;
    return (
      <>
        <PatientInfo />
        <Casefiles files={list} patientId={match.params.patientId} isFetching={isFetching} />
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(CasefilesPage);
