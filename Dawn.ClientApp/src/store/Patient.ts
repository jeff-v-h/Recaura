import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { IPatientVm, IGetPatientVm } from "src/api/generated";
import { get } from "../helpers/apiHelper";
import { AxiosResponse } from "axios";

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
  error: any;
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
  getPatient: (id: number): AppThunkAction<GetPatientKnownAction> => async (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.patients) {
      try {
        const resp = (await get(`/api/patients/${id}`)) as AxiosResponse<
          IGetPatientVm
        >;
        dispatch({ type: C.GET_PATIENT_SUCCESS, payload: resp.data });
      } catch (err) {
        console.log(err);
        console.log(typeof err);
        dispatch({ type: C.GET_PATIENT_FAILURE, err });
      }

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
  error: null,
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
        patient: obj.payload,
        error: null,
      };
    case C.GET_PATIENT_FAILURE:
      obj = action as GetPatientFailureAction;
      return {
        isFetching: false,
        patient: null,
        error: obj.err,
      };
    default:
      return state;
  }
};
