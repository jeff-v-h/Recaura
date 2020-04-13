import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as SubjectiveStore from "../../store/Subjective";
import { ApplicationState } from "../../store";
import { Form, message, Button, Input } from "antd";
import FormTextArea from "../common/FormTextArea";
import { FormInstance } from "antd/lib/form";
import FormSelect from "../common/FormSelect";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 16, span: 2 },
};

type ParentProps = { consultId: number };
type Props = SubjectiveStore.SubjectiveState &
  typeof SubjectiveStore.actionCreators &
  ParentProps;

class Subjective extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

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
      MOI: assessment.moi,
      "Current History": assessment.currentHistory,
      "Body Chart": assessment.bodyChart,
      Agg: assessment.aggravatingFactors,
      Ease: assessment.easingFactors,
      VAS: assessment.vas,
      "Past History": assessment.pastHistory,
      "Social History": assessment.socialHistory,
      Imaging: assessment.imaging,
      "General Health": assessment.generalHealth,
    };

    return (
      <Form
        {...layout}
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

  private ensureDataFetched = () => {
    const { consultId, getSubjectiveAssessment } = this.props;
    getSubjectiveAssessment(consultId);
  };
}

const mapStateToProps = (state: ApplicationState) => state.subjective;

export default compose<React.ComponentType<ParentProps>>(
  withRouter,
  connect(mapStateToProps, SubjectiveStore.actionCreators)
)(Subjective);
