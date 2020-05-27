import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Select } from 'antd';
import HookInputStandard from '../common/forms/HookInputStandard';
import style from '../common/forms/hookForm.scss';
import Spinner from '../common/Spinner';
import * as V from '../../helpers/formHelper';
import HookSelectContainer from '../common/forms/HookSelectContainer';

interface Props {
  onSubmit: (values: V.SignUpValues) => void;
  isSaving: boolean;
  showClinic: boolean;
  toggleClinic: () => void;
}

function SignUpForm({ onSubmit, isSaving, showClinic, toggleClinic }: Props) {
  const { register, handleSubmit, errors, watch, control } = useForm<V.SignUpValues>();

  const onRegisterChange = (args: any[]) => {
    toggleClinic();
    return args[0];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookSignupForm}>
      <div>
        <HookInputStandard
          label="Email"
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
        <HookSelectContainer>
          <label className={style.hookSignupLabel} htmlFor={name}>
            <span className={style.asterisk}>*</span>
            Registering:
          </label>
          <Controller
            as={
              <Select className={style.registerTypeSelect}>
                {Object.values(V.RegisterType).map((value) => (
                  <Select.Option key={value} value={value}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            }
            control={control}
            name="registerType"
            onChange={onRegisterChange}
            defaultValue={V.RegisterType.solePractitioner}
          />
          <p className={style.hint}>*Can be changed later</p>
        </HookSelectContainer>
        {showClinic && (
          <HookInputStandard
            label="Clinic Name"
            name="clinicName"
            required
            register={register({ required: true })}
            error={errors.clinicName}
            errorMsg={V.getPasswordErrorMsg(errors.password?.type)}
            labelStyle={style.hookLabelDivLong}
          />
        )}
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
