import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as ConsultationStore from "../../store/Consultation";
import { ApplicationState } from "../../store";
import { Form, message, Button } from "antd";
import FormTextArea from "../common/FormTextArea";
import style from "./formCommon.scss";
import { formLayout, tailLayout } from "../../helpers/formHelper";

type ParentProps = { consultId: number };
type Props = ConsultationStore.ConsultationState &
  typeof ConsultationStore.actionCreators &
  ParentProps;

class Objective extends React.Component<Props> {
  onSubmit = (values: any) => {
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
      ...objectiveAssessment,
    };

    return (
      <Form
        {...formLayout}
        name="objective"
        initialValues={initialValues}
        onFinish={this.onSubmit}
        onFinishFailed={this.onSubmitFail}
      >
        <FormTextArea label="Observation" name="observation" />
        <FormTextArea label="Active" name="active" />
        <FormTextArea label="Passive" name="passive" />
        <FormTextArea label="Isometric" name="isometric" />
        <FormTextArea label="Functional" name="functional" />
        <FormTextArea label="Neurological" name="neurological" />
        <FormTextArea label="Special" name="special" />
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
  connect(mapStateToProps, ConsultationStore.actionCreators)
)(Objective);
