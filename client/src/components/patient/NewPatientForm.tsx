import * as React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  // submitForm: (data) => void
}

type Inputs = {
  honorific: string;
  firstName: string;
  lastName: string;
};

const requiredMsg = 'This field is required';

const NewPatientForm = ({}: Props) => {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log('form data', data);

  console.log(watch('firstName'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="honorific" defaultValue="test" ref={register} />
      <input name="firstName" ref={register({ required: true })} />
      {errors.firstName && <span>{requiredMsg}</span>}
      <input name="lastName" ref={register({ required: true })} />
      {errors.lastName && <span>{requiredMsg}</span>}
      <input type="submit" />
    </form>
  );
};

export default NewPatientForm;
