import React from 'react';
import style from './navPills.scss';
import { Radio } from 'antd';
import { ConsultPart } from '../../helpers/utils';
import { RadioChangeEvent } from 'antd/lib/radio';

const { Group, Button } = Radio;
type Props = { value: ConsultPart; onChange: (e: RadioChangeEvent) => void };

export default ({ value, onChange }: Props) => {
  return (
    <div className={style.navPills}>
      <Group value={value} onChange={onChange} size="small">
        <Button value={ConsultPart.Subjective}>{ConsultPart[ConsultPart.Subjective]}</Button>
        <Button value={ConsultPart.Objective}>{ConsultPart[ConsultPart.Objective]}</Button>
        <Button value={ConsultPart.Treatments}>
          {ConsultPart[ConsultPart.Treatments]}/{ConsultPart[ConsultPart.Plan]}
        </Button>
      </Group>
    </div>
  );
};
