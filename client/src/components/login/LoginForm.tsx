import React from 'react';
import { useForm } from 'react-hook-form';
import { Login } from '../../models/practitionerModels';
import { Button } from 'antd';
import HookInputStandard from '../common/forms/HookInputStandard';
import style from '../common/forms/hookForm.scss';
import Spinner from '../common/Spinner';
import * as V from '../../helpers/formHelper';

interface Props {
  onSubmit: (data: Login) => void;
  isSaving: boolean;
}

function CasefileForm({ onSubmit, isSaving }: Props) {
  const { register, handleSubmit, errors } = useForm<Login>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookLoginForm}>
      <div>
        <HookInputStandard
          label="Username"
          name="email"
          required
          register={register({ validate: V.validateEmail })}
          error={errors.email}
          errorMsg="Email invalid"
          placeholder="user@example.com"
        />
        <HookInputStandard
          label="Password"
          name="password"
          required
          register={register({
            validate: {
              correctLength: V.validatePasswordLength,
              containsChars: V.validatePasswordChars
            }
          })}
          error={errors.password}
          errorMsg={V.getPasswordErrorMsg(errors.password?.type)}
          isPrivate
        />
      </div>
      <div className={style.submitRow}>
        <div className={style.spinner}>{isSaving && <Spinner fontSize={18} />}</div>
        <Button type="primary" disabled={isSaving} htmlType="submit">
          Login
        </Button>
      </div>
    </form>
  );
}

export default CasefileForm;
