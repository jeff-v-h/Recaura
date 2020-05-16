import * as React from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import style from './casefile.scss';
import { Consultation } from '../../models/consultationModels';
import moment from 'moment';

interface Props {
  consults: Consultation[];
  patientId: string;
  casefileId: string;
}

function getFormattedDate(date: string) {
  return moment(date).format('Do MMM YYYY');
}

const Consultations = ({ consults, patientId, casefileId }: Props) => (
  <div className={style.list}>
    <div className={style.header}>
      <h4>Consultations</h4>
    </div>
    {consults && (
      <List bordered>
        {consults.map((consult) => (
          <Link
            to={`/patients/${patientId}/casefiles/${casefileId}/consultations/${consult.id}`}
            key={consult.id}
          >
            <List.Item>
              Consultation {consult.number}: {getFormattedDate(consult.date)}
            </List.Item>
          </Link>
        ))}
      </List>
    )}
  </div>
);

export default Consultations;
