import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { CasefileState } from '../../stores/casefiles/casefileTypes';
import { ApplicationState } from '../../stores';
import moment from 'moment';
import PatientInfo from '../common/PatientInfo';
import CaseFiles from '../patient/CaseFiles';

type Props = CasefileState & typeof casefileActions & RouteComponentProps<{ patientId: string }>;

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
        <CaseFiles files={list} patientId={match.params.patientId} />
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.casefile;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, casefileActions)
)(CasefilesPage);
