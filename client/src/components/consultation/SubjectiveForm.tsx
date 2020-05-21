import React from 'react';
import { useForm } from 'react-hook-form';
import { SubjectiveAssessment } from '../../models/consultationModels';
import { Button, Input } from 'antd';
import HookTextArea from '../common/HookTextArea';
import style from '../common/hookForm.scss';
import HookVasSelect from '../common/HookVasSelect';
import NavPills from './NavPills';
import { ConsultPart } from '../../helpers/utils';
import { RadioChangeEvent } from 'antd/lib/radio';

interface Props {
  data?: SubjectiveAssessment;
  display: ConsultPart;
  changeSection: (display: ConsultPart) => void;
  saveValues: (values: SubjectiveAssessment) => void;
}

function SubjectiveForm({ data, display, changeSection, saveValues }: Props) {
  console.log('rendered', data);
  const defaultValues = data ?? {
    moi: '',
    currentHistory: '',
    bodyChart: '',
    aggravatingFactors: '',
    easingFactors: '',
    pastHistory: '',
    socialHistory: '',
    imaging: '',
    generalHealth: '',
    vas: 0
  };

  const { register, handleSubmit, control } = useForm<SubjectiveAssessment>({
    // Set empty strings for non required inputs to ensure undefined not passed through
    defaultValues
  });

  const onChangeSection = (e: RadioChangeEvent) => {
    handleSubmit(saveValues)();
    changeSection(e.target.value);
  };

  const saveAndNext = (values: SubjectiveAssessment) => {
    saveValues(values);
    changeSection(ConsultPart.Objective);
  };

  return (
    <>
      <NavPills value={display} onChange={onChangeSection} />
      <form onSubmit={handleSubmit(saveAndNext)} className={style.hookForm}>
        <div className={style.inputSection}>
          <HookTextArea label="MOI" name="moi" register={register} />
          <HookTextArea label="Current History" name="currentHistory" register={register} />
          <HookTextArea label="Body Chart" name="bodyChart" register={register} />
          <HookTextArea label="Agg" name="aggravatingFactors" register={register} />
          <HookTextArea label="Ease" name="easingFactors" register={register} />
          <HookVasSelect control={control} defaultValue={defaultValues.vas} />
          <HookTextArea label="Past History" name="pastHistory" register={register} />
          <HookTextArea label="Social History" name="socialHistory" register={register} />
          <HookTextArea label="Imaging" name="imaging" register={register} />
          <HookTextArea label="General Health" name="generalHealth" register={register} />
        </div>
        <div className={style.submitRow}>
          <Button type="primary" htmlType="submit">
            Objective >
          </Button>
        </div>
      </form>
    </>
  );
}

export default SubjectiveForm;
