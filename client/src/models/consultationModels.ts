export interface ConsultationBase {
  patientId: string;
  casefileId: string;
  practitionerId: string;
  date: string;
  subjectiveAssessment?: SubjectiveAssessment;
  objectiveAssessment?: ObjectiveAssessment;
  treatments: string;
  plans: string;
}

export interface Consultation extends ConsultationBase {
  id: string;
  practitioner?: ConsultPractitioner;
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

export interface PatchConsult {
  patientId?: string;
  caseFileId?: string;
  practitionerId?: string;
  date?: string;
  number: number;
  practitioner?: ConsultPractitioner;
  subjectiveAssessment?: SubjectiveAssessment;
  objectiveAssessment?: ObjectiveAssessment;
  treatments?: string;
  plans?: string;
}
