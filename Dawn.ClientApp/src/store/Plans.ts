import { IGetPlansVm, IForwardPlanVm } from "../api/generated";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { consultationService } from "../api/consultationService";

const C = {
  GET_PLANS_REQUEST: "GET_PLANS_REQUEST",
  GET_PLANS_SUCCESS: "GET_PLANS_SUCCESS",
  GET_PLANS_FAILURE: "GET_PLANS_FAILURE",
};

/**
 * STATE
 */
export interface PlansState {
  isFetching: boolean;
  consultationId: number;
  list: IForwardPlanVm[];
}

//--------------------
//#region ACTIONS
export interface GetPlansRequestAction {
  type: typeof C.GET_PLANS_REQUEST;
}

export interface GetPlansSuccessAction {
  type: typeof C.GET_PLANS_REQUEST;
  payload: IGetPlansVm;
}

export interface GetPlansFailureAction {
  type: typeof C.GET_PLANS_REQUEST;
}

//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetPlansKnownAction =
  | GetPlansRequestAction
  | GetPlansSuccessAction
  | GetPlansFailureAction;
export type KnownAction = GetPlansKnownAction;

/**
 * ACTION CREATORS
 */
export const actionCreators = {
  getPlans: (consultId: number): AppThunkAction<GetPlansKnownAction> => async (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState?.plans?.consultationId !== consultId) {
      try {
        dispatch({
          type: C.GET_PLANS_SUCCESS,
          payload: await consultationService.getPlans(consultId),
        });
      } catch (e) {
        dispatch({ type: C.GET_PLANS_FAILURE });
      }

      dispatch({ type: C.GET_PLANS_REQUEST });
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: PlansState = {
  isFetching: false,
  consultationId: 0,
  list: [],
};

export const reducer: Reducer<PlansState> = (
  state: PlansState | undefined,
  incomingAction: Action
): PlansState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_PLANS_REQUEST:
      return { ...unloadedState, isFetching: true };
    case C.GET_PLANS_SUCCESS:
      obj = action as GetPlansSuccessAction;
      return {
        isFetching: false,
        consultationId: obj.payload.consultationId,
        list: obj.payload.plans,
      };
    case C.GET_PLANS_FAILURE:
      obj = action as GetPlansFailureAction;
      return unloadedState;
    default:
      return state;
  }
};
