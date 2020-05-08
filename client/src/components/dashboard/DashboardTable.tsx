import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { Table } from "antd";
import * as PatientsStore from "../../store/Patients";
import { ApplicationState } from "../../store";
import { IPatientVm, IGetPatientVm } from "src/api/generated";
import { get } from '../../helpers/apiHelper';
import { AxiosResponse } from "axios";

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
  RouteComponentProps<{}>;

class DashboardTable extends React.Component<Props> {
  state = {
    url: ""
  }
  componentDidMount() {
    this.ensureDataFetched();
  }

  setUrl = (e: any) => {
    this.setState({ url: e.target.value })
  }

  fetchUrl = async () => {
    console.log("-----------------------------")
    try {
      const resp = (await get(this.state.url)) as AxiosResponse<IGetPatientVm>;
      console.log('data: ', resp.data);
    } catch (e) {
      console.log('error fetch ' + this.state.url, e);
    }
  }

  render() {
    const { patients } = this.props;
    const data = this.parseDataForTable(patients);
    return (
      <>
        <Table onRow={this.onRow} columns={columns} dataSource={data} />
        <input value={this.state.url} onChange={this.setUrl} />
        <button onClick={this.fetchUrl}>fetch2</button>
      </>
    );
  }

  private ensureDataFetched = () => {
    this.props.getPatients();
  };

  private parseDataForTable = (patients: IPatientVm[]): RowData[] => {
    if (!patients) return [];

    return patients.map((patient) => ({
      key: patient.id,
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
    (state: ApplicationState) => state.patients, // Selects which state properties are merged into the component's props
    PatientsStore.actionCreators // Selects which action creators are merged into the component's props
  )
)(DashboardTable);
