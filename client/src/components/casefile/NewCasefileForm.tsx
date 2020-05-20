import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CasefileBase } from '../../models/casefileModels';
import { Button } from 'antd';
import HookFormInput from '../common/HookFormInput';
import style from '../common/hookForm.scss';
import Spinner from '../common/Spinner';

interface Props {
  onSubmit: (data: CasefileBase) => void;
  isSaving: boolean;
}

function NewCasefileForm({ onSubmit, isSaving }: Props) {
  const { register, handleSubmit, errors, setValue } = useForm<CasefileBase>();

  useEffect(() => register({ name: 'name' }, { required: true }), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookForm}>
      <div className={style.inputSection}>
        <HookFormInput
          label="Casefile Name"
          name="name"
          required
          setValue={setValue}
          error={errors.name}
          errorMsg={'A name is required'}
          inputStyle={style.hookInputLong}
        />
      </div>
      <div className={style.submitRow}>
        <div className={style.spinner}>{isSaving && <Spinner fontSize={18} />}</div>
        <Button type="primary" disabled={isSaving} htmlType="submit">
          Add Casefile
        </Button>
      </div>
    </form>
  );
}

export default NewCasefileForm;
