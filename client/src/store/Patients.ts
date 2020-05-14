import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { Patient } from "src/models/patientModels";
import { patientsService } from "../api/patientsService";

const C = {
  GET_PATIENTS_REQUEST: "GET_PATIENTS_REQUEST",
  GET_PATIENTS_SUCCESS: "GET_PATIENTS_SUCCESS",
  GET_PATIENTS_FAILURE: "GET_PATIENTS_FAILURE",
};

/**
 * STATE
 */
export interface PatientsState {
  isFetching: boolean;
  patients: Patient[];
}

//--------------------
//#region ACTIONS
export interface GetPatientsRequestAction {
  type: typeof C.GET_PATIENTS_REQUEST;
}

export interface GetPatientsSuccessAction {
  type: typeof C.GET_PATIENTS_SUCCESS;
  payload: Patient[];
}

export interface GetPatientsFailureAction {
  type: typeof C.GET_PATIENTS_FAILURE;
}

//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetPatientsKnownAction =
  | GetPatientsRequestAction
  | GetPatientsSuccessAction
  | GetPatientsFailureAction;
export type KnownAction = GetPatientsKnownAction;

/**
 * ACTION CREATORS
 */
export const actionCreators = {
  getPatients: (): AppThunkAction<GetPatientsKnownAction> => async (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.patients) {
      dispatch({ type: C.GET_PATIENTS_REQUEST });

      try {
        dispatch({
          type: C.GET_PATIENTS_SUCCESS,
          payload: await patientsService.getPatients(),
        });
      } catch (e) {
        dispatch({ type: C.GET_PATIENTS_FAILURE });
      }
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: PatientsState = {
  isFetching: false,
  patients: [],
};

export const reducer: Reducer<PatientsState> = (
  state: PatientsState | undefined,
  incomingAction: Action
): PatientsState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_PATIENTS_REQUEST:
      return { ...state, isFetching: true };
    case C.GET_PATIENTS_SUCCESS:
      obj = action as GetPatientsSuccessAction;
      return {
        isFetching: false,
        patients: obj.payload,
      };
    case C.GET_PATIENTS_FAILURE:
      obj = action as GetPatientsFailureAction;
      return {
        isFetching: false,
        patients: [],
      };
    default:
      return state;
  }
};
