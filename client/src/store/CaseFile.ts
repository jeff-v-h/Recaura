import { IGetCaseFileVm } from "src/models/commonModels";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { patientsService } from "../api/patientsService";

const C = {
  GET_CASEFILE_REQUEST: "GET_CASEFILE_REQUEST",
  GET_CASEFILE_SUCCESS: "GET_CASEFILE_SUCCESS",
  GET_CASEFILE_FAILURE: "GET_CASEFILE_FAILURE",
};

/**
 * STATE
 */
export interface CaseFileState {
  isFetching: boolean;
  file: IGetCaseFileVm | null;
}

//--------------------
//#region ACTIONS
export interface GetCaseFileRequestAction {
  type: typeof C.GET_CASEFILE_REQUEST;
}

export interface GetCaseFileSuccessAction {
  type: typeof C.GET_CASEFILE_SUCCESS;
  payload: IGetCaseFileVm;
}

export interface GetCaseFileFailureAction {
  type: typeof C.GET_CASEFILE_FAILURE;
}

//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetCaseFileKnownAction =
  | GetCaseFileRequestAction
  | GetCaseFileSuccessAction
  | GetCaseFileFailureAction;
export type KnownAction = GetCaseFileKnownAction;

/**
 * ACTION CREATORS
 */
export const actionCreators = {
  getCaseFile: (id: string): AppThunkAction<GetCaseFileKnownAction> => async (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState?.casefile?.file?.id !== id) {
      dispatch({ type: C.GET_CASEFILE_REQUEST });

      try {
        dispatch({
          type: C.GET_CASEFILE_SUCCESS,
          payload: await patientsService.getCaseFile(id),
        });
      } catch (e) {
        dispatch({ type: C.GET_CASEFILE_FAILURE });
      }
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: CaseFileState = {
  isFetching: false,
  file: null,
};

export const reducer: Reducer<CaseFileState> = (
  state: CaseFileState | undefined,
  incomingAction: Action
): CaseFileState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_CASEFILE_REQUEST:
      return { ...unloadedState, isFetching: true };
    case C.GET_CASEFILE_SUCCESS:
      obj = action as GetCaseFileSuccessAction;
      return {
        isFetching: false,
        file: obj.payload,
      };
    case C.GET_CASEFILE_FAILURE:
      obj = action as GetCaseFileFailureAction;
      return unloadedState;
    default:
      return state;
  }
};
