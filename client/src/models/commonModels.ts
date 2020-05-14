import { Honorific } from "./enums";

export interface IGetCaseFileVm {
    id: string;
    name: string;
    created: string;
    consultations: IConsultVm[];
    patient: IFilesPatientVm;
}

export interface IConsultVm {
    id: string;
    date: string;
    number: number;
    practitionerId: number;
}

export interface IFilesPatientVm {
    id: string;
    honorific: Honorific;
    firstName: string;
    lastName: string;
    dob: string;
    occupation: string;
}



export interface IGetConsultationVm {
    id: string;
    caseFileId: string;
    date: string;
    number: number;
    practitioner: IPractitionerVm;
    subjectiveAssessment: ISubjectiveAssessmentVm;
    objectiveAssessment: IObjectiveAssessmentVm;
    treatments: string;
    plans: string;
}

export interface IPractitionerVm {
    id: string;
    firstName: string;
    lastName: string;
    jobLevel: string;
}

export interface ISubjectiveAssessmentVm {
    id: string;
    consultationId: string;
    moi: string;
    currentHistory: string;
    bodyChart: string;
    aggravatingFactors: string;
    easingFactors: string;
    vas: number | null;
    pastHistory: string;
    socialHistory: string;
    imaging: string;
    generalHealth: string;
}

export interface IObjectiveAssessmentVm {
    id: string;
    consultationId: string;
    observation: string;
    active: string;
    passive: string;
    resistedIsometric: string;
    functionalTests: string;
    neurologicalTests: string;
    specialTests: string;
    palpation: string;
    additional: string;
}

export interface IUpdateConsultationCommand {
    id: string;
    date: string;
    number: number;
    practitioner: IPractitionerVm | null;
    subjectiveAssessment: ISubjectiveAssessmentVm | null;
    objectiveAssessment: IObjectiveAssessmentVm | null;
    treatments: string;
    plans: string;
}

export interface IGetObjectiveAssessmentVm extends IObjectiveAssessmentVm {
}







export interface IGetSubjectiveAssessmentVm extends ISubjectiveAssessmentVm {
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}