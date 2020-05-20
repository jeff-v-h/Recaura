import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubjectiveAssessment } from '../../models/consultationModels';
import { Button } from 'antd';
import HookTextArea from '../common/HookTextArea';
import style from '../common/hookForm.scss';
import HookVasSelect from '../common/HookVasSelect';

interface Props {
  onSubmit: (data: SubjectiveAssessment) => void;
  data?: SubjectiveAssessment;
  formRef: React.RefObject<HTMLFormElement>;
}

function SubjectiveForm({ data, onSubmit, formRef }: Props) {
  const { register, handleSubmit, setValue, control } = useForm<SubjectiveAssessment>({
    // Set empty strings for non required inputs to ensure undefined not passed through
    defaultValues: {
      moi: '',
      currentHistory: '',
      bodyChart: '',
      aggravatingFactors: '',
      easingFactors: '',
      pastHistory: '',
      socialHistory: '',
      imaging: '',
      generalHealth: ''
    }
  });

  useEffect(() => register({ name: 'moi' }), []);
  useEffect(() => register({ name: 'currentHistory' }), []);
  useEffect(() => register({ name: 'bodyChart' }), []);
  useEffect(() => register({ name: 'aggravatingFactors' }), []);
  useEffect(() => register({ name: 'easingFactors' }), []);
  useEffect(() => register({ name: 'pastHistory' }), []);
  useEffect(() => register({ name: 'socialHistory' }), []);
  useEffect(() => register({ name: 'imaging' }), []);
  useEffect(() => register({ name: 'generalHealth' }), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookForm} ref={formRef}>
      <div className={style.inputSection}>
        <HookTextArea label="MOI" name="moi" setValue={setValue} />
        <HookTextArea label="Current History" name="currentHistory" setValue={setValue} />
        <HookTextArea label="Body Chart" name="bodyChart" setValue={setValue} />
        <HookTextArea label="Agg" name="aggravatingFactors" setValue={setValue} />
        <HookTextArea label="Ease" name="easingFactors" setValue={setValue} />
        <HookVasSelect control={control} />
        <HookTextArea label="Past History" name="pastHistory" setValue={setValue} />
        <HookTextArea label="Social History" name="socialHistory" setValue={setValue} />
        <HookTextArea label="Imaging" name="imaging" setValue={setValue} />
        <HookTextArea label="General Health" name="generalHealth" setValue={setValue} />
      </div>
      <div className={style.submitRow}>
        <Button type="primary" htmlType="submit">
          Objective >
        </Button>
      </div>
    </form>
  );
}

export default SubjectiveForm;
