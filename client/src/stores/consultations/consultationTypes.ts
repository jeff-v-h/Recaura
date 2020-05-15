import {
  Consultation,
  SubjectiveAssessment,
  ObjectiveAssessment,
  TreatmentsAndPlans
} from 'src/models/consultationModels';

export const C = {
  GET_CONSULTATION_REQUEST: 'GET_CONSULTATION_REQUEST',
  GET_CONSULTATION_SUCCESS: 'GET_CONSULTATION_SUCCESS',
  GET_CONSULTATION_FAILURE: 'GET_CONSULTATION_FAILURE',
  UPDATE_CONSULTATION_REQUEST: 'UPDATE_CONSULTATION_REQUEST',
  UPDATE_CONSULTATION_SUCCESS: 'UPDATE_CONSULTATION_SUCCESS',
  UPDATE_CONSULTATION_FAILURE: 'UPDATE_CONSULTATION_FAILURE',
  MODIFY_SUBJECTIVE: 'MODIFY_SUBJECTIVE',
  MODIFY_OBJECTIVE: 'MODIFY_OBJECTIVE',
  MODIFY_TREATMENTS_AND_PLANS: 'MODIFY_TREATMENTS_AND_PLANS'
};

export interface ConsultationState extends Consultation {
  isFetching: boolean;
}

export interface GetConsultRequestAction {
  type: typeof C.GET_CONSULTATION_REQUEST;
}

export interface GetConsultSuccessAction {
  type: typeof C.GET_CONSULTATION_SUCCESS;
  payload: Consultation;
}

export interface GetConsultFailureAction {
  type: typeof C.GET_CONSULTATION_FAILURE;
}

export interface UpdateConsultRequestAction {
  type: typeof C.UPDATE_CONSULTATION_REQUEST;
  payload: Consultation;
}

export interface UpdateConsultSuccessAction {
  type: typeof C.UPDATE_CONSULTATION_SUCCESS;
}

export interface UpdateConsultFailureAction {
  type: typeof C.UPDATE_CONSULTATION_FAILURE;
}

export interface ModifySubjective {
  type: typeof C.MODIFY_SUBJECTIVE;
  payload: SubjectiveAssessment;
}

export interface ModifyObjective {
  type: typeof C.MODIFY_SUBJECTIVE;
  payload: ObjectiveAssessment;
}

export interface ModifyTreatmentsAndPlans {
  type: typeof C.MODIFY_SUBJECTIVE;
  payload: TreatmentsAndPlans;
}

export type GetConsultKnownAction = GetConsultRequestAction | GetConsultSuccessAction | GetConsultFailureAction;
export type UpdateConsultKnownAction =
  | UpdateConsultRequestAction
  | UpdateConsultSuccessAction
  | UpdateConsultFailureAction;
export type KnownAction =
  | GetConsultKnownAction
  | UpdateConsultKnownAction
  | ModifySubjective
  | ModifyObjective
  | ModifyTreatmentsAndPlans;
