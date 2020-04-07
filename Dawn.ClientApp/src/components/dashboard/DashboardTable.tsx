import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { Table } from "antd";
import * as PatientsStore from "../../store/Patients";
import { ApplicationState } from "../../store";
import { IPatientVm } from "src/api/generated";

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

type Props = PatientsStore.PatientsState &
  typeof PatientsStore.actionCreators &
  RouteComponentProps<any>;

class DashboardTable extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  render() {
    const { patients } = this.props;
    const data = this.parseDataForTable(patients);
    return <Table onRow={this.onRow} columns={columns} dataSource={data} />;
  }

  private ensureDataFetched() {
    this.props.getPatients();
  }

  private parseDataForTable(patients: IPatientVm[]): RowData[] {
    return patients.map((patient) => ({
      key: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dob: patient.dob,
    }));
  }

  private onRow = (patientRow: RowData) => {
    return {
      onClick: (event: React.MouseEvent) => {
        const { history } = this.props;
        history.push(`/patients/${patientRow.key}`);
      },
    };
  };
}

export default compose(
  withRouter,
  connect(
    (state: ApplicationState) => state.patients, // Selects which state properties are merged into the component's props
    PatientsStore.actionCreators // Selects which action creators are merged into the component's props
  )
)(DashboardTable as any);
