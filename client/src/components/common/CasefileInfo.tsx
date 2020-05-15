import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { CasefileState } from '../../stores/casefiles/casefileTypes';
import { ApplicationState } from '../../stores';
import style from './casefileInfo.scss';

type Props = CasefileState &
  typeof casefileActions &
  RouteComponentProps<{ patientId: string; casefileId: string }>;

class CasefileInfo extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { list, id, match, getCasefile, selectCasefile } = this.props;

    if (!id) {
      const { casefileId } = match.params;
      const casefile = list.find((c) => c.id === casefileId);

      if (casefile) return selectCasefile(casefile);

      getCasefile(casefileId);
    }
  };

  render() {
    const { patientId, casefileId } = this.props.match.params;
    return (
      <>
        <div className={style.subHeader}>
          <Link to={`/patients/${patientId}/casefiles/${casefileId}`}>
            <h3 className="sub-header">{this.props.name}</h3>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.casefile;

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, casefileActions)
)(CasefileInfo);
