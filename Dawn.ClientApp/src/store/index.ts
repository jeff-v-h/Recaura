import * as Patients from "./Patients";
import * as Patient from "./Patient";
import * as Subjective from "./Subjective";
import * as Objective from "./Objective";
import * as Treatments from "./Treatments";
import * as Plans from "./Plans";

// The top-level state object
export interface ApplicationState {
  patient: Patient.PatientState | undefined;
  patients: Patients.PatientsState | undefined;
  subjective: Subjective.SubjectiveState | undefined;
  objective: Objective.ObjectiveState | undefined;
  treatments: Treatments.TreatmentsState | undefined;
  plans: Plans.PlansState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  patient: Patient.reducer,
  patients: Patients.reducer,
  subjective: Subjective.reducer,
  objective: Objective.reducer,
  treatments: Treatments.reducer,
  plans: Plans.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
