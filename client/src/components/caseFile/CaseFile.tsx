import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { CasefileState } from '../../stores/casefiles/casefileTypes';
import { ApplicationState } from '../../stores';
import { List } from 'antd';
import style from './casefile.scss';
import moment from 'moment';
import PatientInfo from '../common/PatientInfo';

type Props = CasefileState &
  typeof casefileActions &
  RouteComponentProps<{ patientId: string; casefileId: string }>;

class CasefilePage extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  private ensureDataFetched = () => {
    const { match, getCasefile } = this.props;
    getCasefile(match.params.patientId);
  };

  getFormattedDate(date: string) {
    return moment(date).format('Do MMM YYYY');
  }

  render() {
    return (
      <>
        <PatientInfo />
        <div className={style.list}>
          {this.props.consultations && (
            <List bordered>
              {this.props.consultations?.map((consult) => (
                <Link to={`/consultations/${consult.id}`} key={this.props.id}>
                  <List.Item>
                    Consultation {consult.number}: {this.getFormattedDate(consult.date)}
                  </List.Item>
                </Link>
              ))}
            </List>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.casefile;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, casefileActions)
)(CasefilePage);
