import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { ApplicationState } from '../../stores';
import CasefileForm from './CasefileForm';
import { CasefileBase } from 'src/models/casefileModels';
import PatientInfo from '../common/PatientInfo';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CasefileInfo from '../common/CasefileInfo';
import style from './casefile.scss';

const mapStateToProps = (state: ApplicationState) => state.casefile;
const connector = connect(mapStateToProps, casefileActions);

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ patientId: string; casefileId: string }>;
type State = { isNew: boolean };

class CasefilePage extends React.Component<Props, State> {
  state = {
    isNew: this.props.match.params.casefileId === 'new'
  };

  onSubmit = async (values: CasefileBase) => {
    const { match, createCasefile, updateCasefile } = this.props;
    const { patientId, casefileId } = match.params;
    values.patientId = patientId;
    this.state.isNew ? createCasefile(values) : updateCasefile(casefileId, values);
  };

  deleteCasefile = () => this.props.deleteCasefile(this.props.match.params.casefileId);

  render() {
    const { isNew } = this.state;
    return (
      <>
        <PatientInfo />
        {!isNew && <CasefileInfo />}
        <div className={style.casefileSection}>
          {!isNew && (
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={this.deleteCasefile}
              style={{ float: 'right' }}
            />
          )}
          <CasefileForm onSubmit={this.onSubmit} isSaving={this.props.isFetching} isNew={isNew} />
        </div>
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(CasefilePage);
