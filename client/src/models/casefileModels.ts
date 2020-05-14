import { Gender } from "./enums";

export interface Casefile {
    id: string;
    name: string;
    createdAt: string;
    patientId: string;
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
