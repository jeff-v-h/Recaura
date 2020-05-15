import { Casefile } from 'src/models/casefileModels';

export const C = {
  CREATE_CASEFILE_REQUEST: 'CREATE_CASEFILE_REQUEST',
  CREATE_CASEFILE_SUCCESS: 'CREATE_CASEFILE_SUCCESS',
  CREATE_CASEFILE_FAILURE: 'CREATE_CASEFILE_FAILURE',
  GET_CASEFILES_REQUEST: 'GET_CASEFILES_REQUEST',
  GET_CASEFILES_SUCCESS: 'GET_CASEFILES_SUCCESS',
  GET_CASEFILES_FAILURE: 'GET_CASEFILES_FAILURE',
  GET_CASEFILE_REQUEST: 'GET_CASEFILE_REQUEST',
  GET_CASEFILE_SUCCESS: 'GET_CASEFILE_SUCCESS',
  GET_CASEFILE_FAILURE: 'GET_CASEFILE_FAILURE',
  UPDATE_CASEFILE_REQUEST: 'UPDATE_CASEFILE_REQUEST',
  UPDATE_CASEFILE_SUCCESS: 'UPDATE_CASEFILE_SUCCESS',
  UPDATE_CASEFILE_FAILURE: 'UPDATE_CASEFILE_FAILURE',
  DELETE_CASEFILE_REQUEST: 'DELETE_CASEFILE_REQUEST',
  DELETE_CASEFILE_SUCCESS: 'DELETE_CASEFILE_SUCCESS',
  DELETE_CASEFILE_FAILURE: 'DELETE_CASEFILE_FAILURE'
};

export interface CasefileState extends Casefile {
  isFetching: boolean;
  list: Casefile[];
}

//#region actions
export interface CreateCasefileRequestAction {
  type: string;
}
export interface CreateCasefileSuccessAction {
  type: string;
  payload: Casefile;
}
export interface CreateCasefileFailureAction {
  type: string;
}

export interface GetCasefileRequestAction {
  type: string;
}
export interface GetCasefileSuccessAction {
  type: string;
  payload: Casefile;
}
export interface GetCasefilesFailureAction {
  type: string;
}

export interface GetCasefilesRequestAction {
  type: string;
}
export interface GetCasefilesSuccessAction {
  type: string;
  payload: Casefile[];
}
export interface GetCasefileFailureAction {
  type: string;
}

export interface UpdateCasefileRequestAction {
  type: string;
}
export interface UpdateCasefileSuccessAction {
  type: string;
  payload: Casefile;
}
export interface UpdateCasefileFailureAction {
  type: string;
}

export interface DeleteCasefileRequestAction {
  type: string;
}
export interface DeleteCasefileSuccessAction {
  type: string;
}
export interface DeleteCasefileFailureAction {
  type: string;
}

export type CeateCasefileKnownAction =
  | CreateCasefileRequestAction
  | CreateCasefileSuccessAction
  | CreateCasefileFailureAction;
export type GetCasefileKnownAction =
  | GetCasefileRequestAction
  | GetCasefileSuccessAction
  | GetCasefileFailureAction;
export type GetCasefilesKnownAction =
  | GetCasefilesRequestAction
  | GetCasefilesSuccessAction
  | GetCasefilesFailureAction;
export type KnownAction =
  | CeateCasefileKnownAction
  | GetCasefilesKnownAction
  | GetCasefileKnownAction;
//#endregion actions
