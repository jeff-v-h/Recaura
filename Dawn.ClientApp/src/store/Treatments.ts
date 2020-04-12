import { IGetTreatmentsVm, ITreatmentVm } from "../api/generated";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { consultationService } from "../api/consultationService";

const C = {
  GET_TREATMENTS_REQUEST: "GET_TREATMENTS_REQUEST",
  GET_TREATMENTS_SUCCESS: "GET_TREATMENTS_SUCCESS",
  GET_TREATMENTS_FAILURE: "GET_TREATMENTS_FAILURE",
};

/**
 * STATE
 */
export interface TreatmentsState {
  isFetching: boolean;
  consultationId: number;
  list: ITreatmentVm[];
}

//--------------------
//#region ACTIONS
export interface GetTreatmentsRequestAction {
  type: typeof C.GET_TREATMENTS_REQUEST;
}

export interface GetTreatmentsSuccessAction {
  type: typeof C.GET_TREATMENTS_SUCCESS;
  payload: IGetTreatmentsVm;
}

export interface GetTreatmentsFailureAction {
  type: typeof C.GET_TREATMENTS_FAILURE;
}

//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetTreatmentsKnownAction =
  | GetTreatmentsRequestAction
  | GetTreatmentsSuccessAction
  | GetTreatmentsFailureAction;
export type KnownAction = GetTreatmentsKnownAction;

/**
 * ACTION CREATORS
 */
export const actionCreators = {
  getTreatments: (
    consultId: number
  ): AppThunkAction<GetTreatmentsKnownAction> => async (dispatch, getState) => {
    const appState = getState();
    if (appState?.treatments?.consultationId !== consultId) {
      dispatch({ type: C.GET_TREATMENTS_REQUEST });

      try {
        dispatch({
          type: C.GET_TREATMENTS_SUCCESS,
          payload: await consultationService.getTreatments(consultId),
        });
      } catch (e) {
        dispatch({ type: C.GET_TREATMENTS_FAILURE });
      }
    }
  },
};

/**
 * REDUCER
 */
const unloadedState: TreatmentsState = {
  isFetching: false,
  consultationId: 0,
  list: [],
};

export const reducer: Reducer<TreatmentsState> = (
  state: TreatmentsState | undefined,
  incomingAction: Action
): TreatmentsState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_TREATMENTS_REQUEST:
      return { ...unloadedState, isFetching: true };
    case C.GET_TREATMENTS_SUCCESS:
      obj = action as GetTreatmentsSuccessAction;
      return {
        isFetching: false,
        consultationId: obj.payload.consultationId,
        list: obj.payload.treatments,
      };
    case C.GET_TREATMENTS_FAILURE:
      obj = action as GetTreatmentsFailureAction;
      return unloadedState;
    default:
      return state;
  }
};
