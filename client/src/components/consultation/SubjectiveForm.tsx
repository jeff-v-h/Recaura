import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubjectiveAssessment } from '../../models/consultationModels';
import { Button } from 'antd';
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

  const { register, handleSubmit, setValue, control } = useForm<SubjectiveAssessment>({
    // Set empty strings for non required inputs to ensure undefined not passed through
    defaultValues
  });

  // useEffect(() => register({ name: 'moi' }), []);
  useEffect(() => register({ name: 'currentHistory' }), []);
  useEffect(() => register({ name: 'bodyChart' }), []);
  useEffect(() => register({ name: 'aggravatingFactors' }), []);
  useEffect(() => register({ name: 'easingFactors' }), []);
  useEffect(() => register({ name: 'pastHistory' }), []);
  useEffect(() => register({ name: 'socialHistory' }), []);
  useEffect(() => register({ name: 'imaging' }), []);
  useEffect(() => register({ name: 'generalHealth' }), []);

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
          <textarea id={'moi'} name={'moi'} ref={register} />
          {/* <HookTextArea
            label="MOI"
            name="moi"
            setValue={setValue}
            defaultValue={defaultValues.moi}
          /> */}
          <HookTextArea
            label="Current History"
            name="currentHistory"
            setValue={setValue}
            defaultValue={defaultValues.currentHistory}
          />
          <HookTextArea
            label="Body Chart"
            name="bodyChart"
            setValue={setValue}
            defaultValue={defaultValues.bodyChart}
          />
          <HookTextArea
            label="Agg"
            name="aggravatingFactors"
            setValue={setValue}
            defaultValue={defaultValues.aggravatingFactors}
          />
          <HookTextArea
            label="Ease"
            name="easingFactors"
            setValue={setValue}
            defaultValue={defaultValues.easingFactors}
          />
          <HookVasSelect control={control} defaultValue={defaultValues.vas} />
          <HookTextArea
            label="Past History"
            name="pastHistory"
            setValue={setValue}
            defaultValue={defaultValues.pastHistory}
          />
          <HookTextArea
            label="Social History"
            name="socialHistory"
            setValue={setValue}
            defaultValue={defaultValues.socialHistory}
          />
          <HookTextArea
            label="Imaging"
            name="imaging"
            setValue={setValue}
            defaultValue={defaultValues.imaging}
          />
          <HookTextArea
            label="General Health"
            name="generalHealth"
            setValue={setValue}
            defaultValue={defaultValues.generalHealth}
          />
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
