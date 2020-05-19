import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PatientBase } from '../../models/patientModels';
import { Button } from 'antd';
import HookFormInput from '../common/HookFormInput';
import style from '../common/hookForm.scss';
import HookHonorificSelect from '../common/HookHonorificSelect';
import HookGenderSelect from '../common/HookGenderSelect';
import HookCountryCodeSelect from '../common/HookCountryCodeSelect';
import {
  validateEmailAllowEmpty,
  validatePhoneLengthAllowEmpty,
  validatePhoneLength,
  validateDigitStringAllowEmpty,
  validateDigitString,
  getPhoneErrorMsg
} from '../../helpers/formHelper';

interface Props {
  onSubmit: (data: PatientBase) => void;
}

function NewPatientForm({ onSubmit }: Props) {
  const { register, handleSubmit, watch, errors, setValue, control } = useForm<PatientBase>({
    // Set empty strings for non required inputs to ensure undefined not passed through
    defaultValues: {
      email: '',
      homePhone: '',
      mobilePhone: '',
      occupation: ''
    }
  });

  console.log('firstName', watch('firstName'));

  //#region register effects
  useEffect(() => register({ name: 'firstName' }, { required: true }), []);
  useEffect(() => register({ name: 'lastName' }, { required: true }), []);
  useEffect(() => register({ name: 'dob' }, { required: true }), []);
  useEffect(() => register({ name: 'email' }, { validate: validateEmailAllowEmpty }), []);
  useEffect(
    () =>
      register(
        { name: 'homePhone' },
        {
          validate: {
            onlyDigits: validateDigitStringAllowEmpty,
            correctLength: validatePhoneLengthAllowEmpty
          }
        }
      ),
    []
  );
  useEffect(
    () =>
      register(
        { name: 'mobilePhone' },
        {
          validate: {
            onlyDigits: validateDigitString,
            correctLength: validatePhoneLength
          }
        }
      ),
    []
  );
  useEffect(() => register({ name: 'occupation' }), []);
  //#endregion

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookForm}>
      <div className={style.inputSection}>
        <HookHonorificSelect control={control} />
        <HookFormInput
          label="First Name"
          name="firstName"
          required
          setValue={setValue}
          error={errors.firstName}
          errorMsg={'First name is required'}
        />
        <HookFormInput
          label="Last Name"
          name="lastName"
          required
          setValue={setValue}
          error={errors.lastName}
          errorMsg={'Last name is required'}
        />
        <HookGenderSelect control={control} />
        <HookFormInput
          label="DOB"
          name="dob"
          setValue={setValue}
          error={errors.dob}
          errorMsg={'Date of birth required'}
        />
        <HookFormInput
          label="Occupation"
          name="occupation"
          setValue={setValue}
          error={errors.occupation}
          errorMsg={''}
        />
        <HookFormInput
          label="Email"
          name="email"
          setValue={setValue}
          error={errors.email}
          errorMsg={'Email required'}
          inputStyle={style.hookInputLong}
        />
        <div className={style.phoneSection}>
          <HookCountryCodeSelect control={control} />
          <HookFormInput
            label="Home Ph"
            name="homePhone"
            setValue={setValue}
            error={errors.homePhone}
            errorMsg={getPhoneErrorMsg(errors.homePhone?.type)}
            inputStyle={style.hookInputShort}
          />
          <HookFormInput
            label="Mobile Ph"
            name="mobilePhone"
            required
            setValue={setValue}
            error={errors.mobilePhone}
            errorMsg={getPhoneErrorMsg(errors.mobilePhone?.type)}
          />
        </div>
      </div>
      <div className={style.submitButton}>
        <Button type="primary" htmlType="submit">
          Add Patient
        </Button>
      </div>
    </form>
  );
}

export default NewPatientForm;
