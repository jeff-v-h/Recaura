import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TreatmentsAndPlans } from '../../models/consultationModels';
import { Button } from 'antd';
import HookTextArea from '../common/HookTextArea';
import style from '../common/hookForm.scss';

interface Props {
  onSubmit: (data: TreatmentsAndPlans) => void;
  data?: TreatmentsAndPlans;
  formRef: React.RefObject<HTMLFormElement>;
}

function TreatmentsAndPlanForm({ data, onSubmit, formRef }: Props) {
  const { register, handleSubmit, setValue } = useForm<TreatmentsAndPlans>({
    // Set empty strings for non required inputs to ensure undefined not passed through
    defaultValues: {
      treatments: '',
      plans: ''
    }
  });

  useEffect(() => register({ name: 'treatments' }), []);
  useEffect(() => register({ name: 'plans' }), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookForm} ref={formRef}>
      <div className={style.inputSection}>
        <HookTextArea label="Treatments" name="treatments" setValue={setValue} />
        <HookTextArea label="Plans" name="plans" setValue={setValue} />
      </div>
      <div className={style.submitRow}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default TreatmentsAndPlanForm;
