import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PatientBase } from '../../models/patientModels';
import { Button, Spin } from 'antd';
import HookFormInput from '../common/HookFormInput';
import style from '../common/hookForm.scss';
import HookHonorificSelect from '../common/HookHonorificSelect';
import HookGenderSelect from '../common/HookGenderSelect';
import HookCountryCodeSelect from '../common/HookCountryCodeSelect';
import * as V from '../../helpers/formHelper';
import HookDatePicker from '../common/HookDatePicker';
import { LoadingOutlined } from '@ant-design/icons';

const spinIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;

interface Props {
  onSubmit: (data: PatientBase) => void;
  isSaving: boolean;
}

function NewPatientForm({ onSubmit, isSaving }: Props) {
  const { register, handleSubmit, errors, setValue, control } = useForm<PatientBase>({
    // Set empty strings for non required inputs to ensure undefined not passed through
    defaultValues: {
      email: '',
      homePhone: '',
      mobilePhone: '',
      occupation: ''
    }
  });

  //#region register effects
  useEffect(() => register({ name: 'firstName' }, { required: true }), []);
  useEffect(() => register({ name: 'lastName' }, { required: true }), []);
  useEffect(() => register({ name: 'dob' }, { required: true }), []);
  useEffect(() => register({ name: 'email' }, { validate: V.validateEmailAllowEmpty }), []);
  useEffect(
    () =>
      register(
        { name: 'homePhone' },
        {
          validate: {
            onlyDigits: V.validateDigitStringAllowEmpty,
            correctLength: V.validatePhoneLengthAllowEmpty
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
            onlyDigits: V.validateDigitString,
            correctLength: V.validatePhoneLength
          }
        }
      ),
    []
  );
  useEffect(() => register({ name: 'occupation' }), []);
  //#endregion

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
        <HookDatePicker
          label="DOB"
          name="dob"
          setValue={setValue}
          required
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
          errorMsg={'Email invalid'}
          inputStyle={style.hookInputLong}
        />
        <div className={style.phoneSection}>
          <HookCountryCodeSelect control={control} />
          <HookFormInput
            label="Home Ph"
            name="homePhone"
            setValue={setValue}
            error={errors.homePhone}
            errorMsg={V.getPhoneErrorMsg(errors.homePhone?.type)}
            inputStyle={style.hookInputShort}
            placeholder="9876 5432"
          />
          <HookFormInput
            label="Mobile Ph"
            name="mobilePhone"
            required
            setValue={setValue}
            error={errors.mobilePhone}
            errorMsg={V.getPhoneErrorMsg(errors.mobilePhone?.type)}
            placeholder="0400 111 222"
          />
        </div>
      </div>
      <div className={style.submitRow}>
        <div className={style.spinner}>{isSaving && <Spin indicator={spinIcon} />}</div>
        <Button type="primary" disabled={isSaving} htmlType="submit">
          Add Patient
        </Button>
      </div>
    </form>
  );
}

export default NewPatientForm;
