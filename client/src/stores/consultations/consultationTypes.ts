import {
  Consultation,
  SubjectiveAssessment,
  ObjectiveAssessment,
  TreatmentsAndPlans
} from 'src/models/consultationModels';
import { ReduxAction } from '../common/types';

export const C = {
  GET_CONSULTATIONS_REQUEST: 'GET_CONSULTATIONS_REQUEST',
  GET_CONSULTATIONS_SUCCESS: 'GET_CONSULTATIONS_SUCCESS',
  GET_CONSULTATIONS_FAILURE: 'GET_CONSULTATIONS_FAILURE',
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
  list: Consultation[];
}

export interface GetConsultsSuccessAction extends ReduxAction {
  payload: Consultation[];
}

export interface GetConsultSuccessAction extends ReduxAction {
  payload: Consultation;
}

export interface UpdateConsultRequestAction extends ReduxAction {
  payload: Consultation;
}

export interface UpdateConsultSuccessAction extends ReduxAction {
  payload: Consultation;
}

export interface ModifySubjective extends ReduxAction {
  payload: SubjectiveAssessment;
}

export interface ModifyObjective extends ReduxAction {
  payload: ObjectiveAssessment;
}

export interface ModifyTreatmentsAndPlans extends ReduxAction {
  payload: TreatmentsAndPlans;
}

export type GetConsultsKnownAction = ReduxAction | GetConsultsSuccessAction;
export type GetConsultKnownAction = ReduxAction | GetConsultSuccessAction;
export type UpdateConsultKnownAction =
  | ReduxAction
  | UpdateConsultRequestAction
  | UpdateConsultSuccessAction;

export type KnownAction =
  | GetConsultsKnownAction
  | GetConsultKnownAction
  | UpdateConsultKnownAction
  | ModifySubjective
  | ModifyObjective
  | ModifyTreatmentsAndPlans;
