import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as ConsultationStore from "../../store/Consultation";
import { ApplicationState } from "../../store";
import { Form, message, Button } from "antd";
import FormTextArea from "../common/FormTextArea";
import { FormInstance } from "antd/lib/form";
import style from "./formCommon.scss";
import { formLayout, tailLayout } from "../../helpers/formHelper";

type ParentProps = { consultId: number };
type Props = ConsultationStore.ConsultationState &
  typeof ConsultationStore.actionCreators &
  ParentProps;

class Objective extends React.Component<Props> {
  onSubmit = (values: React.RefAttributes<FormInstance>) => {
    console.log(values);
  };

  onSubmitFail = () => {
    message.error("form failed");
  };

  render() {
    const { objectiveAssessment } = this.props;
    if (!objectiveAssessment) return null;

    const initialValues = {
      remember: true,
      Observation: objectiveAssessment.observation,
      Active: objectiveAssessment.active,
      Passive: objectiveAssessment.passive,
      Isometric: objectiveAssessment.resistedIsometric,
      Functional: objectiveAssessment.functionalTests,
      Neurological: objectiveAssessment.neurologicalTests,
      Special: objectiveAssessment.specialTests,
      Palpation: objectiveAssessment.palpation,
      Additional: objectiveAssessment.additional,
    };

    return (
      <Form
        {...formLayout}
        name="objective"
        initialValues={initialValues}
        onFinish={this.onSubmit}
        onFinishFailed={this.onSubmitFail}
      >
        <FormTextArea label="Observation" />
        <FormTextArea label="Active" />
        <FormTextArea label="Passive" />
        <FormTextArea label="Isometric" />
        <FormTextArea label="Functional" />
        <FormTextArea label="Neurological" />
        <FormTextArea label="Special" />
        <FormTextArea label="Palpation" />
        <FormTextArea label="Additional" />
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
)(Objective);
