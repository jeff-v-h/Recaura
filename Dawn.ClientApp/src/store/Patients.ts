import { AxiosResponse } from "axios";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { IPatientVm, IGetPatientsVm } from "src/api/generated";
import { get } from "../helpers/apiHelper";

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
  err: any;
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
  getPatients: (): AppThunkAction<GetPatientsKnownAction> => async (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.patients) {
      try {
        const url = `api/patients`;
        const resp = (await get(url)) as AxiosResponse<IGetPatientsVm>;
        dispatch({
          type: C.GET_PATIENTS_SUCCESS,
          payload: resp.data,
        });
      } catch (err) {
        console.log(err);
        dispatch({ type: C.GET_PATIENTS_FAILURE, err });
      }

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
  err: null,
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
        patients: obj.payload.patients,
        err: null,
      };
    case C.GET_PATIENTS_FAILURE:
      obj = action as GetPatientsFailureAction;
      return {
        isFetching: false,
        patients: [],
        err: obj.err,
      };
    default:
      return state;
  }
};
