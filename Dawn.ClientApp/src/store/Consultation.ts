import { IGetConsultationVm } from "../api/generated";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { consultationService } from "../api/consultationService";

const C = {
  GET_CONSULTATION_REQUEST: "GET_CONSULTATION_REQUEST",
  GET_CONSULTATION_SUCCESS: "GET_CONSULTATION_SUCCESS",
  GET_CONSULTATION_FAILURE: "GET_CONSULTATION_FAILURE",
};

/**
 * STATE
 */
export interface ConsultationState {
  isFetching: boolean;
  details: IGetConsultationVm | null;
}

//--------------------
//#region ACTIONS
export interface GetConsultRequestAction {
  type: typeof C.GET_CONSULTATION_REQUEST;
}

export interface GetConsultSuccessAction {
  type: typeof C.GET_CONSULTATION_SUCCESS;
  payload: IGetConsultationVm;
}

export interface GetConsultFailureAction {
  type: typeof C.GET_CONSULTATION_FAILURE;
}

//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetConsultKnownAction =
  | GetConsultRequestAction
  | GetConsultSuccessAction
  | GetConsultFailureAction;
export type KnownAction = GetConsultKnownAction;

/**
 * ACTION CREATORS
 */
export const actionCreators = {
  getConsult: (id: number): AppThunkAction<GetConsultKnownAction> => async (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState?.casefile?.file?.id !== id) {
      dispatch({ type: C.GET_CONSULTATION_REQUEST });

      try {
        dispatch({
          type: C.GET_CONSULTATION_SUCCESS,
          payload: await consultationService.getConsultation(id),
        });
      } catch (e) {
        dispatch({ type: C.GET_CONSULTATION_FAILURE });
      }
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: ConsultationState = {
  isFetching: false,
  details: null,
};

export const reducer: Reducer<ConsultationState> = (
  state: ConsultationState | undefined,
  incomingAction: Action
): ConsultationState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_CONSULTATION_REQUEST:
      return { ...unloadedState, isFetching: true };
    case C.GET_CONSULTATION_SUCCESS:
      obj = action as GetConsultSuccessAction;
      return {
        isFetching: false,
        details: obj.payload,
      };
    case C.GET_CONSULTATION_FAILURE:
      obj = action as GetConsultFailureAction;
      return unloadedState;
    default:
      return state;
  }
};
