import { ObjectiveAssessment } from "src/models/commonModels";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { consultationService } from "../api/consultationService";

const C = {
  GET_OBJECTIVE_REQUEST: "GET_OBJECTIVE_REQUEST",
  GET_OBJECTIVE_SUCCESS: "GET_OBJECTIVE_SUCCESS",
  GET_OBJECTIVE_FAILURE: "GET_OBJECTIVE_FAILURE",
};

/**
 * STATE
 */
export interface ObjectiveState {
  isFetching: boolean;
  assessment: ObjectiveAssessment | null;
}

//--------------------
//#region ACTIONS
export interface GetObjectiveRequestAction {
  type: typeof C.GET_OBJECTIVE_REQUEST;
}

export interface GetObjectiveSuccessAction {
  type: typeof C.GET_OBJECTIVE_SUCCESS;
  payload: ObjectiveAssessment;
}

export interface GetObjectiveFailureAction {
  type: typeof C.GET_OBJECTIVE_FAILURE;
}

//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetObjectiveKnownAction =
  | GetObjectiveRequestAction
  | GetObjectiveSuccessAction
  | GetObjectiveFailureAction;
export type KnownAction = GetObjectiveKnownAction;

/**
 * ACTION CREATORS
 */
export const actionCreators = {
  getObjectiveAssessment: (
    consultId: string
  ): AppThunkAction<GetObjectiveKnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (appState?.objective?.assessment?.consultationId !== consultId) {
      dispatch({ type: C.GET_OBJECTIVE_REQUEST });

      try {
        dispatch({
          type: C.GET_OBJECTIVE_SUCCESS,
          payload: await consultationService.getObjectiveAssessment(consultId),
        });
      } catch (e) {
        dispatch({ type: C.GET_OBJECTIVE_FAILURE });
      }
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: ObjectiveState = {
  isFetching: false,
  assessment: null,
};

export const reducer: Reducer<ObjectiveState> = (
  state: ObjectiveState | undefined,
  incomingAction: Action
): ObjectiveState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_OBJECTIVE_REQUEST:
      return { ...unloadedState, isFetching: true };
    case C.GET_OBJECTIVE_SUCCESS:
      obj = action as GetObjectiveSuccessAction;
      return {
        isFetching: false,
        assessment: obj.payload,
      };
    case C.GET_OBJECTIVE_FAILURE:
      obj = action as GetObjectiveFailureAction;
      return unloadedState;
    default:
      return state;
  }
};
