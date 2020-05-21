import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ObjectiveAssessment } from '../../models/consultationModels';
import { Button } from 'antd';
import HookTextArea from '../common/HookTextArea';
import style from '../common/hookForm.scss';
import NavPills from './NavPills';
import { ConsultPart } from '../../helpers/utils';
import { RadioChangeEvent } from 'antd/lib/radio';

interface Props {
  data?: ObjectiveAssessment;
  display: ConsultPart;
  changeSection: (display: ConsultPart) => void;
  saveValues: (values: ObjectiveAssessment) => void;
}

function ObjectiveForm({ data, display, changeSection, saveValues }: Props) {
  const defaultValues = data ?? {
    observation: '',
    active: '',
    passive: '',
    resistedIsometric: '',
    functionalTests: '',
    neurologicalTests: '',
    specialTests: '',
    palpation: '',
    additional: ''
  };

  const { register, handleSubmit, setValue } = useForm<ObjectiveAssessment>({
    defaultValues
  });

  useEffect(() => register({ name: 'observation' }), []);
  useEffect(() => register({ name: 'active' }), []);
  useEffect(() => register({ name: 'passive' }), []);
  useEffect(() => register({ name: 'resistedIsometric' }), []);
  useEffect(() => register({ name: 'functionalTests' }), []);
  useEffect(() => register({ name: 'neurologicalTests' }), []);
  useEffect(() => register({ name: 'specialTests' }), []);
  useEffect(() => register({ name: 'palpation' }), []);
  useEffect(() => register({ name: 'additional' }), []);

  const onChangeSection = (e: RadioChangeEvent) => {
    handleSubmit(saveValues)();
    changeSection(e.target.value);
  };

  const saveAndNext = (values: ObjectiveAssessment) => {
    saveValues(values);
    changeSection(ConsultPart.Treatments);
  };

  return (
    <>
      <NavPills value={display} onChange={onChangeSection} />
      <form onSubmit={handleSubmit(saveAndNext)} className={style.hookForm}>
        <div className={style.inputSection}>
          <HookTextArea
            label="Observation"
            name="observation"
            setValue={setValue}
            defaultValue={defaultValues.observation}
          />
          <HookTextArea
            label="Active"
            name="active"
            setValue={setValue}
            defaultValue={defaultValues.active}
          />
          <HookTextArea
            label="Passive"
            name="passive"
            setValue={setValue}
            defaultValue={defaultValues.passive}
          />
          <HookTextArea
            label="Isometric"
            name="resistedIsometric"
            setValue={setValue}
            defaultValue={defaultValues.resistedIsometric}
          />
          <HookTextArea
            label="Functional"
            name="functionalTests"
            setValue={setValue}
            defaultValue={defaultValues.functionalTests}
          />
          <HookTextArea
            label="Neurological"
            name="neurologicalTests"
            setValue={setValue}
            defaultValue={defaultValues.neurologicalTests}
          />
          <HookTextArea
            label="Special"
            name="specialTests"
            setValue={setValue}
            defaultValue={defaultValues.specialTests}
          />
          <HookTextArea
            label="Palpation"
            name="palpation"
            setValue={setValue}
            defaultValue={defaultValues.palpation}
          />
          <HookTextArea
            label="Additional"
            name="additional"
            setValue={setValue}
            defaultValue={defaultValues.additional}
          />
        </div>
        <div className={style.submitRow}>
          <Button type="primary" htmlType="submit">
            Treatments/Plan >
          </Button>
        </div>
      </form>
    </>
  );
}

export default ObjectiveForm;
