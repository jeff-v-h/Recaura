import {
  IGetConsultationVm,
  IPractitionerVm,
  ISubjectiveAssessmentVm,
  IObjectiveAssessmentVm,
} from "../api/generated";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { consultationService } from "../api/consultationService";

const C = {
  GET_CONSULTATION_REQUEST: "GET_CONSULTATION_REQUEST",
  GET_CONSULTATION_SUCCESS: "GET_CONSULTATION_SUCCESS",
  GET_CONSULTATION_FAILURE: "GET_CONSULTATION_FAILURE",
  MODIFY_SUBJECTIVE: "MODIFY_SUBJECTIVE",
};

/**
 * STATE
 */
export interface ConsultationState {
  isFetching: boolean;
  id: number;
  caseFileId: number;
  date: string;
  number: number;
  practitioner: IPractitionerVm | null;
  subjectiveAssessment: ISubjectiveAssessmentVm | null;
  objectiveAssessment: IObjectiveAssessmentVm | null;
  treatments: string;
  plans: string;
}

//--------------------
//#region ACTIONS
interface GetConsultRequestAction {
  type: typeof C.GET_CONSULTATION_REQUEST;
}

interface GetConsultSuccessAction {
  type: typeof C.GET_CONSULTATION_SUCCESS;
  payload: IGetConsultationVm;
}

interface GetConsultFailureAction {
  type: typeof C.GET_CONSULTATION_FAILURE;
}

interface ModifySubjective {
  type: typeof C.MODIFY_SUBJECTIVE;
  payload: ISubjectiveAssessmentVm;
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
    if (appState?.consultation?.id !== id) {
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
  modifySubjective: (subjective: ISubjectiveAssessmentVm) =>
    ({ type: C.MODIFY_SUBJECTIVE, payload: subjective } as ModifySubjective),
};

/**
 * REDUCER
 */
const unloadedState: ConsultationState = {
  isFetching: false,
  id: 0,
  caseFileId: 0,
  date: "",
  number: 0,
  practitioner: null,
  subjectiveAssessment: null,
  objectiveAssessment: null,
  treatments: "",
  plans: "",
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
        ...obj.payload,
      };
    case C.GET_CONSULTATION_FAILURE:
      obj = action as GetConsultFailureAction;
      return unloadedState;

    case C.MODIFY_SUBJECTIVE:
      obj = action as ModifySubjective;
      return { ...unloadedState, subjectiveAssessment: obj.payload };
    default:
      return state;
  }
};
