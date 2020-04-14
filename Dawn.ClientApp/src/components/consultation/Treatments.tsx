import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as TreatmentsStore from "../../store/Treatments";
import { ApplicationState } from "../../store";
import { Form, message, Button } from "antd";
import FormTextArea from "../common/FormTextArea";
import { FormInstance } from "antd/lib/form";
import style from "./formCommon.scss";
import { formLayout, tailLayout } from "../../helpers/formHelper";

type ParentProps = { consultId: number };
type Props = TreatmentsStore.TreatmentsState &
  typeof TreatmentsStore.actionCreators &
  ParentProps;

class Treatments extends React.Component<Props> {
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
    const { list } = this.props;
    if (!list) return null;

    const initialValues = {
      remember: true,
    };

    return (
      <Form
        {...formLayout}
        name="treatments"
        initialValues={initialValues}
        onFinish={this.onSubmit}
        onFinishFailed={this.onSubmitFail}
      >
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className={style.submit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

  private ensureDataFetched = () => {
    const { consultId, getTreatments } = this.props;
    getTreatments(consultId);
  };
}

const mapStateToProps = (state: ApplicationState) => state.treatments;

export default compose<React.ComponentType<ParentProps>>(
  withRouter,
  connect(mapStateToProps, TreatmentsStore.actionCreators)
)(Treatments);
