import { patientsService } from "./../api/patientsService";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { IGetPatientVm } from "src/api/generated";

const C = {
  GET_PATIENT_REQUEST: "GET_PATIENT_REQUEST",
  GET_PATIENT_SUCCESS: "GET_PATIENT_SUCCESS",
  GET_PATIENT_FAILURE: "GET_PATIENT_FAILURE",
};

/**
 * STATE
 */
export interface PatientState {
  isFetching: boolean;
  details: IGetPatientVm | null;
}

//--------------------
//#region ACTIONS
export interface GetPatientRequestAction {
  type: typeof C.GET_PATIENT_REQUEST;
}

export interface GetPatientSuccessAction {
  type: typeof C.GET_PATIENT_SUCCESS;
  payload: IGetPatientVm;
}

export interface GetPatientFailureAction {
  type: typeof C.GET_PATIENT_FAILURE;
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
  getPatient: (id: number): AppThunkAction<GetPatientKnownAction> => async (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.patient && id !== appState.patient.details?.id) {
      dispatch({ type: C.GET_PATIENT_REQUEST });

      try {
        dispatch({
          type: C.GET_PATIENT_SUCCESS,
          payload: await patientsService.getPatient(id),
        });
      } catch (e) {
        dispatch({ type: C.GET_PATIENT_FAILURE });
      }
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: PatientState = {
  isFetching: false,
  details: null,
};

export const reducer: Reducer<PatientState> = (
  state: PatientState | undefined,
  incomingAction: Action
): PatientState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_PATIENT_REQUEST:
      return { ...state, isFetching: true };
    case C.GET_PATIENT_SUCCESS:
      obj = action as GetPatientSuccessAction;
      return {
        isFetching: false,
        details: obj.payload,
      };
    case C.GET_PATIENT_FAILURE:
      obj = action as GetPatientFailureAction;
      return {
        isFetching: false,
        details: null,
      };
    default:
      return state;
  }
};
