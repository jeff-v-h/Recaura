import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { CasefileState } from '../../stores/casefiles/casefileTypes';
import { ApplicationState } from '../../stores';

type Props = CasefileState & typeof casefileActions & RouteComponentProps<{ casefileId: string }>;

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
    return (
      <>
        <div className="sub-header">
          <h3>{this.props.name}</h3>
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
