import { Honorific, Gender, AccessLevel } from './enums';

export interface Login {
  email: string;
  password: string;
}

export interface PractitionerBase {
  honorific: Honorific;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  countryCode: string;
  homePhone: string;
  mobilePhone: string;
  gender: Gender;
  profession: string;
  jobLevel: string;
  accessLevel: AccessLevel;
  clinicId: string;
}

export interface Practitioner extends PractitionerBase {
  id: string;
}

export interface LoginResponse {
  practitioner: Practitioner;
  token: string;
}
