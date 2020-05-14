import patientReducer from './patient/patientReducer'
import { PatientState } from './patient/patientTypes'
import * as Subjective from "./Subjective";
import * as Objective from "./Objective";
import * as CaseFile from "./CaseFile";
import * as Consultation from "./Consultation";

// The top-level state object
export interface ApplicationState {
  patient: PatientState | undefined;
  subjective: Subjective.SubjectiveState | undefined;
  objective: Objective.ObjectiveState | undefined;
  casefile: CaseFile.CaseFileState | undefined;
  consultation: Consultation.ConsultationState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  patient: patientReducer,
  subjective: Subjective.reducer,
  objective: Objective.reducer,
  casefile: CaseFile.reducer,
  consultation: Consultation.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
