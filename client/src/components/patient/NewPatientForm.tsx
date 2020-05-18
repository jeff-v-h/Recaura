import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PatientBase } from '../../models/patientModels';
import { Button, Select } from 'antd';
import HookFormInput from '../common/HookFormInput';
import style from '../common/hookForm.scss';
import HookHonorificSelect from '../common/HookHonorificSelect';
import HookGenderSelect from '../common/HookGenderSelect';
import HookCountryCodeSelect from '../common/HookCountryCodeSelect';

interface Props {
  onSubmit: (data: PatientBase) => void;
}

function NewPatientForm({ onSubmit }: Props) {
  const { register, handleSubmit, watch, errors, setValue, control } = useForm<PatientBase>();

  console.log('firstName', watch('firstName'));

  useEffect(() => register({ name: 'firstName' }, { required: true }), []);
  useEffect(() => register({ name: 'lastName' }, { required: true }), []);
  useEffect(() => register({ name: 'dob' }, { required: true }), []);
  useEffect(() => register({ name: 'email' }, { required: true }), []);
  useEffect(() => register({ name: 'homePhone' }), []);
  useEffect(() => register({ name: 'mobilePhone' }, { required: true }), []);
  useEffect(() => register({ name: 'occupation' }), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.hookForm}>
      <HookHonorificSelect control={control} />
      <HookFormInput
        label="First Name"
        name="firstName"
        setValue={setValue}
        error={errors.firstName}
        errorMsg={'First name is required'}
      />
      <HookFormInput
        label="Last Name"
        name="lastName"
        setValue={setValue}
        error={errors.lastName}
        errorMsg={'Last name is required'}
      />
      <HookFormInput
        label="DOB"
        name="dob"
        setValue={setValue}
        error={errors.dob}
        errorMsg={'Date of birth required'}
      />
      <HookFormInput
        label="Email"
        name="email"
        setValue={setValue}
        error={errors.email}
        errorMsg={'Email required'}
      />
      <HookCountryCodeSelect control={control} />
      <HookFormInput
        label="Home Phone"
        name="homePhone"
        setValue={setValue}
        error={errors.homePhone}
        errorMsg={''}
      />
      <HookFormInput
        label="Mobile Phone"
        name="mobilePhone"
        setValue={setValue}
        error={errors.mobilePhone}
        errorMsg={'Mobile phone required'}
      />
      <HookGenderSelect control={control} />
      <HookFormInput
        label="Occupation"
        name="occupation"
        setValue={setValue}
        error={errors.occupation}
        errorMsg={''}
      />
      <div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </div>
    </form>
  );
}

export default NewPatientForm;
