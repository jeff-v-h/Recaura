import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as ConsultationStore from "../../store/Consultation";
import { ApplicationState } from "../../store";
import { Form, Button } from "antd";
import FormTextArea from "../common/FormTextArea";
import FormSelect from "../common/FormSelect";
import style from "./formCommon.scss";
import { formLayout, tailLayout } from "../../helpers/formHelper";
import { FormInstance } from "antd/lib/form";

type ParentProps = { consultId: number };
type Props = ConsultationStore.ConsultationState &
  typeof ConsultationStore.actionCreators &
  ParentProps;

class Subjective extends React.Component<Props> {
  formRef: React.RefObject<FormInstance> = React.createRef();

  componentWillUnmount() {
    this.updateStoreWithFormChanges();
  }

  updateStoreWithFormChanges = () => {
    const { modifySubjective, subjectiveAssessment } = this.props;
    if (this.formRef.current && subjectiveAssessment) {
      const { getFieldValue } = this.formRef.current;
      const newSubjective: any = {};

      Object.keys(subjectiveAssessment).forEach((key, i) => {
        const fieldValue = getFieldValue(key);
        newSubjective[key] = fieldValue;
      });

      modifySubjective(newSubjective);
    }
  };

  onSubmit = (values: any) => {
    const { updateConsult } = this.props;
    this.updateStoreWithFormChanges();
    updateConsult();
  };

  render() {
    const { subjectiveAssessment } = this.props;
    if (!subjectiveAssessment) return null;

    const initialValues = {
      remember: true,
      ...subjectiveAssessment,
    };

    return (
      <Form
        {...formLayout}
        ref={this.formRef}
        name="subjective"
        initialValues={initialValues}
        onFinish={this.onSubmit}
      >
        <FormTextArea label="MOI" name="moi" />
        <FormTextArea label="Current History" name="currentHistory" />
        <FormTextArea label="Body Chart" name="bodyChart" />
        <FormTextArea label="Agg" name="aggravatingFactors" />
        <FormTextArea label="Ease" name="easingFactors" />
        <FormSelect
          label="VAS"
          name="vas"
          options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        />
        <FormTextArea label="Past History" name="pastHistory" />
        <FormTextArea label="Social History" name="socialHistory" />
        <FormTextArea label="Imaging" name="imaging" />
        <FormTextArea label="General Health" name="generalHealth" />
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
  connect(mapStateToProps, ConsultationStore.actionCreators)
)(Subjective);
