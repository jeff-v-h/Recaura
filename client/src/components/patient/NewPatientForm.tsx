import * as React from 'react';
import { useForm } from 'react-hook-form';
import { PatientBase } from '../../models/patientModels';
import { Button } from 'antd';
import { Gender, Honorific } from '../../models/enums';

interface Props {
  onSubmit: (data: PatientBase) => void;
}

type Inputs = {
  honorific: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  countryCode: string;
  homePhone?: string;
  mobilePhone: string;
  gender: string;
  occupation?: string;
};

const requiredMsg = 'This field is required';

function NewPatientForm({ onSubmit }: Props) {
  const { register, handleSubmit, watch, errors } = useForm<PatientBase>();
  // const onSubmit = (data: PatientBase) => console.log('form data', data);

  console.log('firstName', watch('firstName'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select name="honorific" ref={register}>
        {Object.values(Honorific).map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
      <input name="firstName" ref={register({ required: true })} />
      {errors.firstName && <span>{requiredMsg}</span>}
      <input name="lastName" ref={register({ required: true })} />
      {errors.lastName && <span>{requiredMsg}</span>}
      <input name="dob" ref={register({ required: true })} />
      {errors.dob && <span>{requiredMsg}</span>}
      <input name="email" ref={register({ required: true })} />
      {errors.email && <span>{requiredMsg}</span>}
      <select name="countryCode" ref={register}>
        <option value="AU">Australia (+61)</option>
      </select>
      <input name="homePhone" ref={register} />
      <input name="mobilePhone" ref={register({ required: true })} />
      {errors.mobilePhone && <span>{requiredMsg}</span>}
      <select name="gender" ref={register}>
        {Object.values(Gender).map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      <input name="occupation" ref={register} />
      <div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </div>
    </form>
  );
}

export default NewPatientForm;
