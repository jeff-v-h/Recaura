import patientReducer from './patients/patientReducer';
import { PatientState } from './patients/patientTypes';
import casefileReducer from './casefiles/casefileReducer';
import { CasefileState } from './casefiles/casefileTypes';
import consultationReducer from './consultations/consultationReducer';
import { ConsultationState } from './consultations/consultationTypes';
import practitionerReducer from './practitioners/practitionerReducer';
import { PractitionerState } from './practitioners/practitionerTypes';
import clinicReducer from './clinics/clinicReducer';
import { ClinicState } from './clinics/clinicTypes';

// The top-level state object
export interface ApplicationState {
  patient: PatientState | undefined;
  casefile: CasefileState | undefined;
  consultation: ConsultationState | undefined;
  practitioner: PractitionerState | undefined;
  clinic: ClinicState | undefined;
}

export const reducers = {
  patient: patientReducer,
  casefile: casefileReducer,
  consultation: consultationReducer,
  practitioner: practitionerReducer,
  clinic: clinicReducer
};

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
