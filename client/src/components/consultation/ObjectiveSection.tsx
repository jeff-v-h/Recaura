import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ConsultationState } from '../../stores/consultations/consultationTypes';
import { ApplicationState } from '../../stores';
import { Form, Button } from 'antd';
import FormTextArea from '../common/FormTextArea';
import style from './formCommon.scss';
import { formLayout, tailLayout } from '../../helpers/formHelper';
import { FormInstance } from 'antd/lib/form';

type ParentProps = { consultId: string };
type Props = ConsultationState & typeof consultActions & ParentProps;

class ObjectiveSection extends React.Component<Props> {
  formRef: React.RefObject<FormInstance> = React.createRef();

  componentWillUnmount() {
    this.updateStoreWithFormChanges();
  }

  updateStoreWithFormChanges = () => {
    const { modifyObjective, objectiveAssessment } = this.props;
    if (this.formRef.current && objectiveAssessment) {
      const { getFieldValue } = this.formRef.current;
      const newObjective: any = {};

      Object.keys(objectiveAssessment).forEach((key, i) => {
        const fieldValue = getFieldValue(key);
        newObjective[key] = fieldValue;
      });

      modifyObjective(newObjective);
    }
  };

  onSubmit = (values: any) => {
    const { updateConsult } = this.props;
    this.updateStoreWithFormChanges();
    updateConsult();
  };

  render() {
    const { objectiveAssessment } = this.props;
    if (!objectiveAssessment) return null;

    const initialValues = {
      remember: true,
      ...objectiveAssessment
    };

    return (
      <Form
        {...formLayout}
        ref={this.formRef}
        name="objective"
        initialValues={initialValues}
        onFinish={this.onSubmit}
      >
        <FormTextArea label="Observation" name="observation" />
        <FormTextArea label="Active" name="active" />
        <FormTextArea label="Passive" name="passive" />
        <FormTextArea label="Isometric" name="resistedIsometric" />
        <FormTextArea label="Functional" name="functionalTests" />
        <FormTextArea label="Neurological" name="neurologicalTests" />
        <FormTextArea label="Special" name="specialTests" />
        <FormTextArea label="Palpation" name="palpation" />
        <FormTextArea label="Additional" name="additional" />
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className={style.submit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.consultation;

export default compose<React.ComponentType<ParentProps>>(
  withRouter,
  connect(mapStateToProps, consultActions)
)(ObjectiveSection);
