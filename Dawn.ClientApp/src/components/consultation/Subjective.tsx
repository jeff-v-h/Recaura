import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as ConsultationStore from "../../store/Consultation";
import { ApplicationState } from "../../store";
import { Form, message, Button } from "antd";
import FormTextArea from "../common/FormTextArea";
import { FormInstance } from "antd/lib/form";
import FormSelect from "../common/FormSelect";
import style from "./formCommon.scss";
import { formLayout, tailLayout } from "../../helpers/formHelper";

type ParentProps = { consultId: number };
type Props = ConsultationStore.ConsultationState &
  typeof ConsultationStore.actionCreators &
  ParentProps;

class Subjective extends React.Component<Props> {
  onSubmit = (values: React.RefAttributes<FormInstance>) => {
    console.log(values);
  };

  onSubmitFail = () => {
    message.error("form failed");
  };

  render() {
    const { subjectiveAssessment } = this.props;
    if (!subjectiveAssessment) return null;

    const initialValues = {
      remember: true,
      MOI: subjectiveAssessment.moi,
      "Current History": subjectiveAssessment.currentHistory,
      "Body Chart": subjectiveAssessment.bodyChart,
      Agg: subjectiveAssessment.aggravatingFactors,
      Ease: subjectiveAssessment.easingFactors,
      VAS: subjectiveAssessment.vas,
      "Past History": subjectiveAssessment.pastHistory,
      "Social History": subjectiveAssessment.socialHistory,
      Imaging: subjectiveAssessment.imaging,
      "General Health": subjectiveAssessment.generalHealth,
    };

    return (
      <Form
        {...formLayout}
        name="subjective"
        initialValues={initialValues}
        onFinish={this.onSubmit}
        onFinishFailed={this.onSubmitFail}
      >
        <FormTextArea label="MOI" />
        <FormTextArea label="Current History" />
        <FormTextArea label="Body Chart" />
        <FormTextArea label="Agg" />
        <FormTextArea label="Ease" />
        <FormSelect
          label="VAS"
          options={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
        />
        <FormTextArea label="Past History" />
        <FormTextArea label="Social History" />
        <FormTextArea label="Imaging" />
        <FormTextArea label="General Health" />
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
