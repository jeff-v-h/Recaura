import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ApplicationState } from '../../stores';
import SubjectiveForm from './SubjectiveForm';
import { RadioChangeEvent } from 'antd/lib/radio';
import { SubjectiveAssessment } from 'src/models/consultationModels';
import NavPills from './NavPills';
import { ConsultPart } from 'src/helpers/utils';

const mapStateToProps = (state: ApplicationState) => state.consultation;
const connector = connect(mapStateToProps, consultActions);

type ParentProps = { display: ConsultPart; changeSection: (display: ConsultPart) => void };
type Props = ConnectedProps<typeof connector> & ParentProps;

class Subjective extends React.Component<Props> {
  formRef: React.RefObject<HTMLFormElement> = React.createRef();

  saveForm = (values: SubjectiveAssessment) => this.props.modifySubjective(values);

  onChangeSection = (e: RadioChangeEvent) => {
    this.formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }));
    this.props.changeSection(e.target.value);
  };

  render() {
    const { subjectiveAssessment, display } = this.props;

    return (
      <>
        <NavPills value={display} onChange={this.onChangeSection} />
        <SubjectiveForm formRef={this.formRef} onSubmit={this.saveForm} />
      </>
    );
  }
}

export default compose<React.ComponentType<ParentProps>>(withRouter, connector)(Subjective);
