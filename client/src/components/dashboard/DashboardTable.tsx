import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { Table } from "antd";
import { actionCreators } from "../../store/patient/patientActions";
import { PatientState } from "../../store/patient/patientTypes";
import { ApplicationState } from "../../store";
import { Patient } from "src/models/patientModels";

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

interface RowData {
  key: number;
  firstName: string;
  lastName: string;
  dob: string;
}

type Props = PatientState &
  typeof actionCreators &
  RouteComponentProps<{}>;

class DashboardTable extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  render() {
    const { list } = this.props;
    const data = this.parseDataForTable(list);
    return <Table onRow={this.onRow} columns={columns} dataSource={data} />;
  }

  private ensureDataFetched = () => {
    this.props.getPatients();
  };

  private parseDataForTable = (patients: Patient[]): RowData[] => {
    if (!patients) return [];

    return patients.map((patient, i) => ({
      key: i,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dob: patient.dob,
    }));
  };

  private onRow = (patientRow: RowData) => {
    return {
      onClick: (event: React.MouseEvent) => {
        const { history } = this.props;
        history.push(`/patients/${patientRow.key}`);
      },
    };
  };
}

export default compose<React.ComponentType>(
  withRouter,
  connect(
    (state: ApplicationState) => state.patient,
    actionCreators
  )
)(DashboardTable);
