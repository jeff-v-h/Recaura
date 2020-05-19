import { Honorific, Gender } from './enums';

export interface PatientBase {
  honorific: Honorific;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  countryCode: string;
  homePhone: string;
  mobilePhone: string;
  gender: Gender;
  occupation: string;
}

export interface Patient extends PatientBase {
  id: string;
}

export interface PatientWithFiles extends Patient {
  casefiles: PatientCasefile[];
}

export interface PatientCasefile {
  id: string;
  name: string;
}
