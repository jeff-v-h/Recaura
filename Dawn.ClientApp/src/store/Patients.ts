import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { IPatientVm, IGetPatientsVm } from "src/api/generated";

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
  patients: IPatientVm[];
}

//--------------------
//#region ACTIONS
export interface GetPatientsRequestAction {
  type: typeof C.GET_PATIENTS_REQUEST;
}

export interface GetPatientsSuccessAction {
  type: typeof C.GET_PATIENTS_REQUEST;
  payload: IGetPatientsVm;
}

export interface GetPatientsFailureAction {
  type: typeof C.GET_PATIENTS_REQUEST;
  err: any;
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
  getPatients: (): AppThunkAction<GetPatientsKnownAction> => (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.patients) {
      fetch(`api/patients`)
        .then((response) => response.json() as Promise<IGetPatientsVm>)
        .then((data) => {
          dispatch({
            type: C.GET_PATIENTS_SUCCESS,
            payload: data,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: C.GET_PATIENTS_FAILURE,
          });
        });

      dispatch({ type: C.GET_PATIENTS_REQUEST });
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
  switch (action.type) {
    case C.GET_PATIENTS_REQUEST:
      return { ...state, isFetching: true };
    case C.GET_PATIENTS_SUCCESS:
      const obj = action as GetPatientsSuccessAction;
      return {
        isFetching: false,
        patients: obj.payload.patients,
      };
    default:
      return state;
  }
};
