import React from 'react';
import { List, Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './casefile.scss';
import { Consultation } from '../../models/consultationModels';
import Spinner from '../common/Spinner';
import { parseDateString } from '../../helpers/utils';

interface Props {
  consults: Consultation[];
  patientId: string;
  casefileId: string;
  isFetching: boolean;
}

const Consultations = ({ consults, patientId, casefileId, isFetching }: Props) => (
  <div className={style.list}>
    <div className={style.header}>
      <Button type="primary">
        <Link to={`/patients/${patientId}/casefiles/${casefileId}/consultations/new`}>
          New Consult
        </Link>
      </Button>
    </div>
    <List bordered>
      {isFetching ? (
        <List.Item>
          <div className={style.spinner}>
            <Spinner fontSize={26} />
          </div>
        </List.Item>
      ) : consults.length > 0 ? (
        consults.map((consult) => (
          <Link
            to={`/patients/${patientId}/casefiles/${casefileId}/consultations/${consult.id}`}
            key={consult.id}
          >
            <List.Item>
              Consult {consult.number}: {parseDateString(consult.date)}
            </List.Item>
          </Link>
        ))
      ) : (
        <List.Item>No consultations exist for this patient</List.Item>
      )}
    </List>
  </div>
);

export default Consultations;
