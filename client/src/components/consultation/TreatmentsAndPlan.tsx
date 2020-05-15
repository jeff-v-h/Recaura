import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ConsultationState } from '../../stores/consultations/consultationTypes';
import { ApplicationState } from '../../stores';
import { Form, Button } from 'antd';
import FormTextArea from '../common/FormTextArea';
import { FormInstance } from 'antd/lib/form';
import style from './formCommon.scss';
import { formLayout, tailLayout } from '../../helpers/formHelper';

type ParentProps = { consultId: string };
type Props = ConsultationState & typeof consultActions & ParentProps;

class TreatmentsAndPlan extends React.Component<Props> {
  formRef: React.RefObject<FormInstance> = React.createRef();

  componentWillUnmount() {
    this.updateStoreWithFormChanges();
  }

  updateStoreWithFormChanges = () => {
    const { modifyTreatmentsAndPlans } = this.props;
    if (this.formRef.current) {
      const { getFieldValue } = this.formRef.current;
      modifyTreatmentsAndPlans({
        treatments: getFieldValue('treatments'),
        plans: getFieldValue('plans')
      });
    }
  };

  onSubmit = (values: any) => {
    const { updateConsult } = this.props;
    this.updateStoreWithFormChanges();
    updateConsult();
  };

  render() {
    const { treatments, plans } = this.props;

    const initialValues = {
      remember: true,
      treatments,
      plans
    };

    return (
      <Form
        {...formLayout}
        ref={this.formRef}
        name="treatments"
        initialValues={initialValues}
        onFinish={this.onSubmit}
      >
        <FormTextArea label="Treatments" name="treatments" />
        <FormTextArea label="Plan" name="plans" />
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
)(TreatmentsAndPlan);
