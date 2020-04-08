import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { IPatientVm, IGetPatientVm } from "src/api/generated";

const C = {
  GET_PATIENT_REQUEST: "GET_PATIENTS_REQUEST",
  GET_PATIENT_SUCCESS: "GET_PATIENTS_SUCCESS",
  GET_PATIENT_FAILURE: "GET_PATIENTS_FAILURE",
};

/**
 * STATE
 */
export interface PatientState {
  isFetching: boolean;
  patient: IGetPatientVm | null;
}

//--------------------
//#region ACTIONS
export interface GetPatientRequestAction {
  type: typeof C.GET_PATIENT_REQUEST;
}

export interface GetPatientSuccessAction {
  type: typeof C.GET_PATIENT_REQUEST;
  payload: IGetPatientVm;
}

export interface GetPatientFailureAction {
  type: typeof C.GET_PATIENT_REQUEST;
  err: any;
}

//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetPatientKnownAction =
  | GetPatientRequestAction
  | GetPatientSuccessAction
  | GetPatientFailureAction;
export type KnownAction = GetPatientKnownAction;

/**
 * ACTION CREATORS
 */
export const actionCreators = {
  getPatients: (id: number): AppThunkAction<GetPatientKnownAction> => (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.patients) {
      fetch(`api/patients/${id}`)
        .then((response) => response.json() as Promise<IGetPatientVm>)
        .then((data) => {
          dispatch({
            type: C.GET_PATIENT_SUCCESS,
            payload: data,
          });
        })
        .catch((err) => {
          console.log(err);
          console.log(typeof err);
          dispatch({
            type: C.GET_PATIENT_FAILURE,
          });
        });

      dispatch({ type: C.GET_PATIENT_REQUEST });
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: PatientState = {
  isFetching: false,
  patient: null,
};

export const reducer: Reducer<PatientState> = (
  state: PatientState | undefined,
  incomingAction: Action
): PatientState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case C.GET_PATIENT_REQUEST:
      return { ...state, isFetching: true };
    case C.GET_PATIENT_SUCCESS:
      const obj = action as GetPatientSuccessAction;
      return {
        isFetching: false,
        patient: obj.payload,
      };
    default:
      return state;
  }
};
