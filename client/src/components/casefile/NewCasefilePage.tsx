import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as casefileActions from '../../stores/casefiles/casefileActions';
import { ApplicationState } from '../../stores';
// import style from './patient.scss';
// import NewPatientForm from './NewPatientForm';
import { CasefileBase } from 'src/models/casefileModels';
import PatientInfo from '../common/PatientInfo';

const mapStateToProps = (state: ApplicationState) => state.casefile;
const connector = connect(mapStateToProps, casefileActions);

type Props = ConnectedProps<typeof connector>;

class NewCasefilePage extends React.Component<Props> {
  onSubmit = async (values: CasefileBase) => {
    this.props.createCasefile(values);
  };

  render() {
    const { isFetching } = this.props;

    return (
      <>
        <PatientInfo />
        {/* <NewPatientForm onSubmit={this.onSubmit} isSaving={isFetching} /> */}
      </>
    );
  }
}

export default connector(NewCasefilePage);
