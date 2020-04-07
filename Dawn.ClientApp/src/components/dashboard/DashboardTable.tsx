import * as React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Table } from "antd";
import * as PatientsStore from "../../store/Patients";
import { ApplicationState } from "../../store";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
];

type Props = PatientsStore.PatientsState &
  typeof PatientsStore.actionCreators &
  RouteComponentProps<{}>;

class DashboardTable extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  render() {
    const { patients } = this.props;
    return <Table columns={columns} dataSource={patients} />;
  }

  private ensureDataFetched() {
    this.props.getPatients();
  }

  // private handleRowClick = (row: AgentOrder) => {
  //   if (!row.isFocused) {
  //     const { history } = this.props;
  //     history.push('/agent/orders/' + row.ldmCoreOrderId);
  //   }
  // };
}

export default connect(
  (state: ApplicationState) => state.patients, // Selects which state properties are merged into the component's props
  PatientsStore.actionCreators // Selects which action creators are merged into the component's props
)(DashboardTable as any);
