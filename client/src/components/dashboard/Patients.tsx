import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Table } from 'antd';
import * as patientActions from '../../stores/patients/patientActions';
import { PatientState } from '../../stores/patients/patientTypes';
import { ApplicationState } from '../../stores';
import { Patient } from 'src/models/patientModels';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName'
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dob',
    key: 'dob'
  }
];

interface RowData {
  key: string;
  firstName: string;
  lastName: string;
  dob: string;
}

type Props = PatientState & typeof patientActions & RouteComponentProps<{}>;

class Patients extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => this.props.getPatients();

  parseDataForTable = (patients: Patient[]): RowData[] => {
    if (!patients) return [];

    return patients.map((patient) => ({
      key: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dob: patient.dob
    }));
  };

  onRow = (patientRow: RowData) => {
    return {
      onClick: (event: React.MouseEvent) => {
        const { history } = this.props;
        history.push(`/patients/${patientRow.key}/casefiles`);
      }
    };
  };

  render() {
    const { list } = this.props;
    const data = this.parseDataForTable(list);
    return <Table onRow={this.onRow} columns={columns} dataSource={data} />;
  }
}

export default compose<React.ComponentType>(
  withRouter,
  connect((state: ApplicationState) => state.patient, patientActions)
)(Patients);
