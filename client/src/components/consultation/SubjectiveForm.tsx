import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubjectiveAssessment } from '../../models/consultationModels';
import { Button } from 'antd';
import HookTextArea from '../common/forms/HookTextArea';
import style from '../common/forms/hookForm.scss';
import HookVasSelect from '../common/forms/HookVasSelect';
import NavPills from './NavPills';
import { ConsultPart } from '../../helpers/utils';
import { RadioChangeEvent } from 'antd/lib/radio';
import { emptySubjective } from '../../stores/common/objects';

interface Props {
  data?: SubjectiveAssessment;
  display: ConsultPart;
  changeSection: (display: ConsultPart) => void;
  saveValues: (values: SubjectiveAssessment) => void;
}

function SubjectiveForm({ data, display, changeSection, saveValues }: Props) {
  const defaultValues = data ?? emptySubjective;
  const form = useForm<SubjectiveAssessment>({ defaultValues });
  const { register, handleSubmit, control } = form;

  // Reset form to be display fetched data as defaultValues
  useEffect(() => data && form.reset(data), [data]);

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
      <form onSubmit={handleSubmit(saveAndNext)} className={style.hookConsultForm}>
        <div>
          <HookTextArea label="Body Chart" name="bodyChart" register={register} />
          <HookVasSelect control={control} defaultValue={defaultValues.vas} />
          <HookTextArea label="MOI" name="moi" register={register} />
          <HookTextArea label="Current History" name="currentHistory" register={register} />
          <div className={style.hookRow}>
            <HookTextArea label="Agg" name="aggravatingFactors" register={register} />
            <HookTextArea label="Ease" name="easingFactors" register={register} />
          </div>
          <div className={style.hookRow}>
            <HookTextArea label="Past History" name="pastHistory" register={register} />
            <HookTextArea label="Social History" name="socialHistory" register={register} />
          </div>
          <div className={style.hookRow}>
            <HookTextArea label="Imaging" name="imaging" register={register} />
            <HookTextArea label="General Health" name="generalHealth" register={register} />
          </div>
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
