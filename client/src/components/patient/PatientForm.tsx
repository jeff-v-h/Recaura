import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import HookFormInput from '../common/forms/HookFormInput';
import style from '../common/forms/hookForm.scss';
import HookHonorificSelect from '../common/forms/HookHonorificSelect';
import HookGenderSelect from '../common/forms/HookGenderSelect';
import HookCountryCodeSelect from '../common/forms/HookCountryCodeSelect';
import * as V from '../../helpers/formHelper';
import HookDatePicker from '../common/forms/HookDatePicker';
import Spinner from '../common/Spinner';

interface Props {
  onSubmit: (data: V.PatientBaseForm) => void;
  isSaving: boolean;
  data?: V.PatientBaseForm;
  isNew: boolean;
}

function PatientForm({ data, onSubmit, isSaving, isNew }: Props) {
  // Set empty strings for non-required inputs to ensure undefined not passed through
  const defaultValues = data ?? {
    email: '',
    homePhone: '',
    mobilePhone: '',
    occupation: ''
  };
  const form = useForm<V.PatientBaseForm>({ defaultValues });
  const { register, handleSubmit, errors, setValue, control } = form;

  useEffect(() => data && form.reset(data), [data]);

  const onTitleChange = (args: any[]) => {
    setValue('gender', V.getGenderFromTitle(args[0]));
    return args[0];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookForm}>
      <div className={style.inputSection}>
        <HookHonorificSelect control={control} onChange={onTitleChange} />
        <HookFormInput
          label="First Name"
          name="firstName"
          required
          register={register({ required: true })}
          error={errors.firstName}
          errorMsg={'First name is required'}
        />
        <HookFormInput
          label="Last Name"
          name="lastName"
          required
          register={register({ required: true })}
          error={errors.lastName}
          errorMsg={'Last name is required'}
        />
        <HookGenderSelect control={control} />
        <HookDatePicker
          label="DOB"
          name="dob"
          required
          error={errors.dob}
          errorMsg={'Date of birth required'}
          control={control}
        />
        <HookFormInput
          label="Occupation"
          name="occupation"
          register={register}
          error={errors.occupation}
          errorMsg={''}
        />
        <HookFormInput
          label="Email"
          name="email"
          register={register({ validate: V.validateEmailAllowEmpty })}
          error={errors.email}
          errorMsg={'Email invalid'}
          inputStyle={style.hookInputLong}
        />
        <div className={style.phoneSection}>
          <HookCountryCodeSelect control={control} />
          <HookFormInput
            label="Home Ph"
            name="homePhone"
            register={register({
              validate: {
                onlyDigits: V.validateDigitStringAllowEmpty,
                correctLength: V.validatePhoneLengthAllowEmpty
              }
            })}
            error={errors.homePhone}
            errorMsg={V.getPhoneErrorMsg(errors.homePhone?.type)}
            inputStyle={style.hookInputShort}
            placeholder="9876 5432"
          />
          <HookFormInput
            label="Mobile Ph"
            name="mobilePhone"
            required
            register={register({
              validate: {
                onlyDigits: V.validateDigitString,
                correctLength: V.validatePhoneLength
              }
            })}
            error={errors.mobilePhone}
            errorMsg={V.getPhoneErrorMsg(errors.mobilePhone?.type)}
            placeholder="0400 111 222"
          />
        </div>
      </div>
      <div className={style.submitRow}>
        <div className={style.spinner}>{isSaving && <Spinner fontSize={18} />}</div>
        <Button type="primary" disabled={isSaving} htmlType="submit">
          {isNew ? 'Add' : 'Update'} Patient
        </Button>
      </div>
    </form>
  );
}

export default PatientForm;
