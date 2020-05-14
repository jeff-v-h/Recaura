import { Honorific, Gender } from "./enums";

export interface IPatientVm {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
}

export interface Patient {
    id: string;
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
    caseFiles: PatientCasefile[];
}

export interface PatientCasefile {
    id: string;
    name: string;
}