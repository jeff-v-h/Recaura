import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { ApplicationState } from '../../stores';
import moment from 'moment';
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

  getFormattedDate(date: string) {
    return moment(date).format('Do MMM YYYY');
  }

  render() {
    const { list, match } = this.props;
    return (
      <>
        <PatientInfo />
        <Casefiles files={list} patientId={match.params.patientId} />
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(CasefilesPage);
