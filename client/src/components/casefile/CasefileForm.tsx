import React from 'react';
import { useForm } from 'react-hook-form';
import { CasefileBase } from '../../models/casefileModels';
import { Button } from 'antd';
import HookFormInput from '../common/forms/HookFormInput';
import style from '../common/forms/hookForm.scss';
import Spinner from '../common/Spinner';

interface Props {
  onSubmit: (data: CasefileBase) => void;
  isSaving: boolean;
  isNew: boolean;
}

function CasefileForm({ onSubmit, isSaving, isNew }: Props) {
  const { register, handleSubmit, errors } = useForm<CasefileBase>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookCasefileForm}>
      <div className={style.inputSection}>
        <HookFormInput
          label={isNew ? 'Casefile Name' : 'Update Name'}
          name="name"
          required
          register={register({ required: true })}
          error={errors.name}
          errorMsg={'A name is required'}
          inputStyle={style.hookInputLong}
        />
      </div>
      <div className={style.submitRow}>
        <div className={style.spinner}>{isSaving && <Spinner fontSize={18} />}</div>
        <Button type="primary" disabled={isSaving} htmlType="submit">
          {isNew ? 'Add' : 'Update'} Casefile
        </Button>
      </div>
    </form>
  );
}

export default CasefileForm;
