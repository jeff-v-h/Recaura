import * as React from 'react';
import { List } from 'antd';
import { PatientCasefile } from 'src/models/patientModels';
import { Link } from 'react-router-dom';
import style from './casefiles.scss';

interface Props {
  files: PatientCasefile[];
  patientId: string;
}

const Casefiles = ({ files, patientId }: Props) => (
  <div className={style.list}>
    <div className={style.header}>
      <h3>Case Files</h3>
    </div>
    {files && (
      <List bordered>
        {files.map((file) => (
          <Link to={`/patients/${patientId}/casefiles/${file.id}`} key={file.id}>
            <List.Item>{file.name}</List.Item>
          </Link>
        ))}
      </List>
    )}
  </div>
);

export default Casefiles;
