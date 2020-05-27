import React from 'react';
import { useForm } from 'react-hook-form';
import { Login } from '../../models/practitionerModels';
import { Button } from 'antd';
import HookInputStandard from '../common/forms/HookInputStandard';
import style from '../common/forms/hookForm.scss';
import Spinner from '../common/Spinner';
import * as V from '../../helpers/formHelper';
import { WatchIgnorePlugin } from 'webpack';

interface Props {
  onSubmit: (values: V.SignUpValues) => void;
  isSaving: boolean;
}

function SignUpForm({ onSubmit, isSaving }: Props) {
  const { register, handleSubmit, errors, watch } = useForm<V.SignUpValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookSignupForm}>
      <div>
        <HookInputStandard
          label="Username"
          name="email"
          required
          register={register({ validate: V.validateEmail })}
          error={errors.email}
          errorMsg="Email invalid"
          placeholder="user@example.com"
          labelStyle={style.hookLabelDivLong}
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
          labelStyle={style.hookLabelDivLong}
        />
        <HookInputStandard
          label="Confirm Password"
          name="confirmPassword"
          required
          register={register({ validate: (value) => value === watch('password') })}
          error={errors.confirmPassword}
          errorMsg={'Must match password'}
          isPrivate
          labelStyle={style.hookLabelDivLong}
        />
        <HookInputStandard
          label="Clinic Name"
          name="clinicName"
          required
          register={register({ required: true })}
          error={errors.clinicName}
          errorMsg={V.getPasswordErrorMsg(errors.password?.type)}
          labelStyle={style.hookLabelDivLong}
        />
      </div>
      <div className={style.submitRow}>
        <div className={style.spinner}>{isSaving && <Spinner fontSize={18} />}</div>
        <Button type="primary" disabled={isSaving} htmlType="submit">
          Create Account
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
