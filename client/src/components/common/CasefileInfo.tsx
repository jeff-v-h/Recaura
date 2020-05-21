import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { ApplicationState } from '../../stores';
import style from './casefileInfo.scss';
import { capitalise } from '../../helpers/utils';

const mapStateToProps = (state: ApplicationState) => state.casefile;
const connector = connect(mapStateToProps, casefileActions);

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ patientId: string; casefileId: string }>;

class CasefileInfo extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { list, id, match, getCasefile, selectCasefile } = this.props;
    const { casefileId } = match.params;

    if (!id || id !== casefileId) {
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
            <h3 className="sub-header">{capitalise(this.props.name)}</h3>
          </Link>
        </div>
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(CasefileInfo);
