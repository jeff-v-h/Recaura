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
  componentDidMount() {
    this.ensureDataFetched();
  }

  fetch1 = (host: string) => async () => {
    console.log("-----------------------------")
    try {
      const url = `${host}/api/patients`;
      const resp = (await get(url)) as AxiosResponse<IGetPatientVm>;
      console.log('data: ', resp.data);
    } catch (e) {
      console.log('error fetch ' + host, e);
    }
  }

  render() {
    const { patients } = this.props;
    const data = this.parseDataForTable(patients);
    return (
      <>
        <Table onRow={this.onRow} columns={columns} dataSource={data} />
        <button onClick={this.fetch1('http://192.168.99.100:5555')}>http://192.168.99.100:5555</button>
        <button onClick={this.fetch1('')}>/api/patients</button>
        <button onClick={this.fetch1('http://127.0.0.1:5555')}>http://127.0.0.1:5555</button>
        <button onClick={this.fetch1('http://0.0.0.0:5555')}>http://0.0.0.0:5555</button>
        <button onClick={this.fetch1('http://api:5555')}>http://api:5555</button>
        <button onClick={this.fetch1('http://api')}>http://api</button>
        <button onClick={this.fetch1('http://recaura-env-1.eba-7tkitnxc.ap-southeast-2.elasticbeanstalk.com')}>http://recaura-env-1.eba-7tkitnxc.ap-southeast-2.elasticbeanstalk.com</button>
        <button onClick={this.fetch1('http://recaura-env-1.eba-7tkitnxc.ap-southeast-2.elasticbeanstalk.com:5555')}>http://recaura-env-1.eba-7tkitnxc.ap-southeast-2.elasticbeanstalk.com:5555</button>
        <button onClick={this.fetch1('http://192.168.99.100:5000')}>http://192.168.99.100:5000</button>
        <button onClick={this.fetch1('http://127.0.0.1:5000')}>http://127.0.0.1:5000</button>
        <button onClick={this.fetch1('http://0.0.0.0:5000')}>http://0.0.0.0:5000</button>
        <button onClick={this.fetch1('http://api:5000')}>http://api:5000</button>
        <button onClick={this.fetch1('http://recaura-env-1.eba-7tkitnxc.ap-southeast-2.elasticbeanstalk.com:5000')}>http://recaura-env-1.eba-7tkitnxc.ap-southeast-2.elasticbeanstalk.com:5000</button>
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
