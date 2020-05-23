import patientReducer from './patients/patientReducer';
import { PatientState } from './patients/patientTypes';
import casefileReducer from './casefiles/casefileReducer';
import { CasefileState } from './casefiles/casefileTypes';
import consultationReducer from './consultations/consultationReducer';
import { ConsultationState } from './consultations/consultationTypes';

// The top-level state object
export interface ApplicationState {
  patient: PatientState | undefined;
  casefile: CasefileState | undefined;
  consultation: ConsultationState | undefined;
}

export const reducers = {
  patient: patientReducer,
  casefile: casefileReducer,
  consultation: consultationReducer
};

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
