import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as ObjectiveStore from "../../store/Objective";
import { ApplicationState } from "../../store";
import { Form, message, Button } from "antd";
import FormTextArea from "../common/FormTextArea";
import { FormInstance } from "antd/lib/form";
import style from "./formCommon.scss";
import { formLayout, tailLayout } from "../../helpers/formHelper";

type ParentProps = { consultId: number };
type Props = ObjectiveStore.ObjectiveState &
  typeof ObjectiveStore.actionCreators &
  ParentProps;

class Objective extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  onSubmit = (values: React.RefAttributes<FormInstance>) => {
    console.log(values);
  };

  onSubmitFail = () => {
    message.error("form failed");
  };

  render() {
    const { assessment } = this.props;
    if (!assessment) return null;

    const initialValues = {
      remember: true,
      Observation: assessment.observation,
      Active: assessment.active,
      Passive: assessment.passive,
      Isometric: assessment.resistedIsometric,
      Functional: assessment.functionalTests,
      Neurological: assessment.neurologicalTests,
      Special: assessment.specialTests,
      Palpation: assessment.palpation,
      Additional: assessment.additional,
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

  private ensureDataFetched = () => {
    const { consultId, getObjectiveAssessment } = this.props;
    getObjectiveAssessment(consultId);
  };
}

const mapStateToProps = (state: ApplicationState) => state.objective;

export default compose<React.ComponentType<ParentProps>>(
  withRouter,
  connect(mapStateToProps, ObjectiveStore.actionCreators)
)(Objective);
