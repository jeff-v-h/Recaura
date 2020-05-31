import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { ApplicationState } from '../../stores';
import style from './casefileInfo.scss';
import { capitalise } from '../../helpers/utils';
import { EditOutlined } from '@ant-design/icons';

const mapStateToProps = (state: ApplicationState) => state.casefile;
const connector = connect(mapStateToProps, casefileActions);

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ patientId: string; casefileId: string; consultId: string }>;

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
    const { name, match } = this.props;
    const { patientId, casefileId, consultId } = match.params;
    const casefileUrl = `/patients/${patientId}/casefiles/${casefileId}`;

    return (
      <>
        <div className={style.subHeader}>
          <Link to={`${casefileUrl}/consultations`} className={style.headerLink}>
            <h3>{capitalise(name)}</h3>
          </Link>
          {!consultId && (
            <Link to={casefileUrl} className={style.editLink}>
              <EditOutlined />
            </Link>
          )}
        </div>
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(CasefileInfo);
