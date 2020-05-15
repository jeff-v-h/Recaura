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

type Props = CasefileState & typeof casefileActions & RouteComponentProps<{ id: string }>;

class CasefilesPage extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  private ensureDataFetched = () => {
    const { match, getCasefiles } = this.props;
    getCasefiles(match.params.id);
  };

  getFormattedDate(date: string) {
    return moment(date).format('Do MMM YYYY');
  }

  render() {
    return (
      <>
        <PatientInfo />
        <CaseFiles files={this.props.list} />
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.casefile;

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, casefileActions))(CasefilesPage);
