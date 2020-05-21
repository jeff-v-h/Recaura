import { Gender } from './enums';

export interface CasefileBase {
  name: string;
  patientId: string;
}

export interface Casefile extends CasefileBase {
  id: string;
  createdAt: string;
  consultations: CasefileConsult[] | undefined;
  patient: CasefilePatient | undefined;
}

export interface CasefileConsult {
  id: string;
  date: string;
  number: number;
  practitionerId: string;
}

export interface CasefilePatient {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string;
  occupation: string;
}
