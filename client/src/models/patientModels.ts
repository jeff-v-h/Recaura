import { Honorific, Gender } from "./enums";

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
    casefiles: PatientCasefile[];
}

export interface PatientCasefile {
    id: string;
    name: string;
}