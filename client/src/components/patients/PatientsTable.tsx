import React from 'react';
import { Table } from 'antd';
import { Patient } from 'src/models/patientModels';
import { RowData } from './patientRowData';
import style from './patients.scss';
import { parseDateString } from '../../helpers/utils';

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

interface Props {
  onRowClick: (patientRow: RowData) => React.HTMLAttributes<HTMLElement>;
  patients: Patient[];
}

const PatientsTable = ({ onRowClick, patients }: Props) => {
  const parseDataForTable = (patients: Patient[]): RowData[] => {
    if (!patients) return [];

    return patients.map((patient) => ({
      key: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dob: parseDateString(patient.dob)
    }));
  };

  const data = parseDataForTable(patients);

  return <Table onRow={onRowClick} columns={columns} dataSource={data} rowClassName={style.row} />;
};

export default PatientsTable;
