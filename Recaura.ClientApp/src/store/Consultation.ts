import {
  IGetConsultationVm,
  IPractitionerVm,
  ISubjectiveAssessmentVm,
  IObjectiveAssessmentVm,
  IUpdateConsultationCommand,
} from "../api/generated";
import { AppThunkAction } from "./index";
import { Action, Reducer } from "redux";
import { consultationService } from "../api/consultationService";

export const C = {
  GET_CONSULTATION_REQUEST: "GET_CONSULTATION_REQUEST",
  GET_CONSULTATION_SUCCESS: "GET_CONSULTATION_SUCCESS",
  GET_CONSULTATION_FAILURE: "GET_CONSULTATION_FAILURE",
  UPDATE_CONSULTATION_REQUEST: "UPDATE_CONSULTATION_REQUEST",
  UPDATE_CONSULTATION_SUCCESS: "UPDATE_CONSULTATION_SUCCESS",
  UPDATE_CONSULTATION_FAILURE: "UPDATE_CONSULTATION_FAILURE",
  MODIFY_SUBJECTIVE: "MODIFY_SUBJECTIVE",
  MODIFY_OBJECTIVE: "MODIFY_OBJECTIVE",
  MODIFY_TREATMENTS_AND_PLANS: "MODIFY_TREATMENTS_AND_PLANS",
};

interface TreatmentsAndPlans {
  treatments: string;
  plans: string;
}

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
//#region ACTION INTERFACES
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

interface UpdateConsultRequestAction {
  type: typeof C.UPDATE_CONSULTATION_REQUEST;
  payload: IUpdateConsultationCommand;
}

interface UpdateConsultSuccessAction {
  type: typeof C.UPDATE_CONSULTATION_SUCCESS;
}

interface UpdateConsultFailureAction {
  type: typeof C.UPDATE_CONSULTATION_FAILURE;
}

interface ModifySubjective {
  type: typeof C.MODIFY_SUBJECTIVE;
  payload: ISubjectiveAssessmentVm;
}

interface ModifyObjective {
  type: typeof C.MODIFY_SUBJECTIVE;
  payload: IObjectiveAssessmentVm;
}

interface ModifyTreatmentsAndPlans {
  type: typeof C.MODIFY_SUBJECTIVE;
  payload: TreatmentsAndPlans;
}

//#endregion ACTION INTERFACES
//--------------------

// ACTION TYPE
type GetConsultKnownAction =
  | GetConsultRequestAction
  | GetConsultSuccessAction
  | GetConsultFailureAction;
type UpdateConsultKnownAction =
  | UpdateConsultRequestAction
  | UpdateConsultSuccessAction
  | UpdateConsultFailureAction;
type KnownAction =
  | GetConsultKnownAction
  | UpdateConsultKnownAction
  | ModifySubjective
  | ModifyObjective
  | ModifyTreatmentsAndPlans;


//#region ACTIONS
export const getConsultRequest = (): GetConsultRequestAction => {
  return { type: C.GET_CONSULTATION_REQUEST }
}

export const getConsultSuccess = async (id: number): Promise<GetConsultSuccessAction> => {
  return {
    type: C.GET_CONSULTATION_SUCCESS,
    payload: await consultationService.getConsultation(id),
  }
}

export const getConsultFailure = (): GetConsultFailureAction => {
  return { type: C.GET_CONSULTATION_FAILURE }
}
//#endregion ACTIONS

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
      dispatch(getConsultRequest());

      try {
        dispatch(await getConsultSuccess(id));
      } catch (e) {
        dispatch(getConsultFailure());
      }
    }
  },

  updateConsult: (): AppThunkAction<UpdateConsultKnownAction> => async (
    dispatch,
    getState
  ) => {
    const appState = getState();
    const consult = appState?.consultation;
    if (consult?.id) {
      dispatch({ type: C.UPDATE_CONSULTATION_REQUEST });

      try {
        await consultationService.updateConsultation(consult.id, consult);
        dispatch({ type: C.UPDATE_CONSULTATION_SUCCESS });
      } catch (e) {
        dispatch({ type: C.UPDATE_CONSULTATION_FAILURE });
      }
    }
  },

  modifySubjective: (subjective: ISubjectiveAssessmentVm) =>
    ({ type: C.MODIFY_SUBJECTIVE, payload: subjective } as ModifySubjective),
  modifyObjective: (objective: IObjectiveAssessmentVm) =>
    ({ type: C.MODIFY_OBJECTIVE, payload: objective } as ModifyObjective),
  modifyTreatmentsAndPlans: (treatmentAndPlans: TreatmentsAndPlans) =>
    ({
      type: C.MODIFY_TREATMENTS_AND_PLANS,
      payload: treatmentAndPlans,
    } as ModifyTreatmentsAndPlans),
};

/**
 * REDUCER
 */
export const unloadedState: ConsultationState = {
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

    case C.UPDATE_CONSULTATION_REQUEST:
      obj = action as UpdateConsultRequestAction;
      return { ...state, isFetching: true, ...obj.payload };
    case C.UPDATE_CONSULTATION_SUCCESS:
    case C.UPDATE_CONSULTATION_FAILURE:
      return { ...state, isFetching: false };

    case C.MODIFY_SUBJECTIVE:
      obj = action as ModifySubjective;
      return { ...state, subjectiveAssessment: obj.payload };
    case C.MODIFY_OBJECTIVE:
      obj = action as ModifyObjective;
      return { ...state, objectiveAssessment: obj.payload };
    case C.MODIFY_TREATMENTS_AND_PLANS:
      obj = action as ModifyTreatmentsAndPlans;
      return { ...state, ...obj.payload };
    default:
      return state;
  }
};
