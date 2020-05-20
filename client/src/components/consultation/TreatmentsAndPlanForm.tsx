import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TreatmentsAndPlans } from '../../models/consultationModels';
import { Button } from 'antd';
import HookTextArea from '../common/HookTextArea';
import style from '../common/hookForm.scss';
import NavPills from './NavPills';
import { ConsultPart } from '../../helpers/utils';
import { RadioChangeEvent } from 'antd/lib/radio';

interface Props {
  data?: TreatmentsAndPlans;
  display: ConsultPart;
  changeSection: (display: ConsultPart) => void;
  saveValues: (values: TreatmentsAndPlans) => void;
  createConsult: () => void;
}

function TreatmentsAndPlanForm({ data, display, changeSection, saveValues, createConsult }: Props) {
  const { register, handleSubmit, setValue } = useForm<TreatmentsAndPlans>({
    // Set empty strings for non required inputs to ensure undefined not passed through
    defaultValues: {
      treatments: '',
      plans: ''
    }
  });

  useEffect(() => register({ name: 'treatments' }), []);
  useEffect(() => register({ name: 'plans' }), []);

  const onChangeSection = (e: RadioChangeEvent) => {
    handleSubmit(saveValues)();
    changeSection(e.target.value);
  };

  const saveAndNext = (values: TreatmentsAndPlans) => {
    saveValues(values);
    createConsult();
  };

  return (
    <>
      <NavPills value={display} onChange={onChangeSection} />
      <form onSubmit={handleSubmit(saveAndNext)} className={style.hookForm}>
        <div className={style.inputSection}>
          <HookTextArea label="Treatments" name="treatments" setValue={setValue} />
          <HookTextArea label="Plans" name="plans" setValue={setValue} />
        </div>
        <div className={style.submitRow}>
          <Button type="primary" htmlType="submit">
            Save Consult
          </Button>
        </div>
      </form>
    </>
  );
}

export default TreatmentsAndPlanForm;
