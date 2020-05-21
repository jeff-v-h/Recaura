import React from 'react';
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
  const defaultValues = data ?? {
    treatments: '',
    plans: ''
  };

  const { register, handleSubmit } = useForm<TreatmentsAndPlans>({
    defaultValues
  });

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
          <HookTextArea label="Treatments" name="treatments" register={register} />
          <HookTextArea label="Plans" name="plans" register={register} />
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
