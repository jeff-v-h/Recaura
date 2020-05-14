export interface Consultation {
    id: string;
    patientId: string;
    caseFileId: string;
    practitionerId: string;
    date: string;
    number: number;
    practitioner: ConsultPractitioner | null;
    subjectiveAssessment: SubjectiveAssessment | null;
    objectiveAssessment: ObjectiveAssessment | null;
    treatments: string;
    plans: string;
}

export interface ConsultPractitioner {
    id: string;
    firstName: string;
    lastName: string;
}

export interface SubjectiveAssessment {
    moi: string;
    currentHistory: string;
    bodyChart: string;
    aggravatingFactors: string;
    easingFactors: string;
    vas: number;
    pastHistory: string;
    socialHistory: string;
    imaging: string;
    generalHealth: string;
}

export interface ObjectiveAssessment {
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

// Client specific models
export interface TreatmentsAndPlans {
    treatments: string;
    plans: string;
}