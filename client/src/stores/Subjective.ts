import { SubjectiveAssessment } from "src/models/commonModels";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { consultationService } from "../api/consultationService";

const C = {
  GET_SUBJECTIVE_REQUEST: "GET_SUBJECTIVE_REQUEST",
  GET_SUBJECTIVE_SUCCESS: "GET_SUBJECTIVE_SUCCESS",
  GET_SUBJECTIVE_FAILURE: "GET_SUBJECTIVE_FAILURE",
};

/**
 * STATE
 */
export interface SubjectiveState {
  isFetching: boolean;
  assessment: SubjectiveAssessment | null;
}

//--------------------
//#region ACTIONS
export interface GetSubjectiveRequestAction {
  type: typeof C.GET_SUBJECTIVE_REQUEST;
}

export interface GetSubjectiveSuccessAction {
  type: typeof C.GET_SUBJECTIVE_SUCCESS;
  payload: SubjectiveAssessment;
}

export interface GetSubjectiveFailureAction {
  type: typeof C.GET_SUBJECTIVE_FAILURE;
}

//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetSubjectiveKnownAction =
  | GetSubjectiveRequestAction
  | GetSubjectiveSuccessAction
  | GetSubjectiveFailureAction;
export type KnownAction = GetSubjectiveKnownAction;

/**
 * ACTION CREATORS
 */
export const actionCreators = {
  getSubjectiveAssessment: (
    consultId: string
  ): AppThunkAction<GetSubjectiveKnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (appState?.subjective?.assessment?.consultationId !== consultId) {
      dispatch({ type: C.GET_SUBJECTIVE_REQUEST });

      try {
        dispatch({
          type: C.GET_SUBJECTIVE_SUCCESS,
          payload: await consultationService.getSubjectiveAssessment(consultId),
        });
      } catch (e) {
        dispatch({ type: C.GET_SUBJECTIVE_FAILURE });
      }
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: SubjectiveState = {
  isFetching: false,
  assessment: null,
};

export const reducer: Reducer<SubjectiveState> = (
  state: SubjectiveState | undefined,
  incomingAction: Action
): SubjectiveState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_SUBJECTIVE_REQUEST:
      return { ...unloadedState, isFetching: true };
    case C.GET_SUBJECTIVE_SUCCESS:
      obj = action as GetSubjectiveSuccessAction;
      return {
        isFetching: false,
        assessment: obj.payload,
      };
    case C.GET_SUBJECTIVE_FAILURE:
      obj = action as GetSubjectiveFailureAction;
      return unloadedState;
    default:
      return state;
  }
};
