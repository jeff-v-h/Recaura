import { Casefile } from 'src/models/casefileModels';
import { ReduxAction } from '../common/types';

export const C = {
  CREATE_CASEFILE_REQUEST: 'CREATE_CASEFILE_REQUEST',
  CREATE_CASEFILE_SUCCESS: 'CREATE_CASEFILE_SUCCESS',
  CREATE_CASEFILE_FAILURE: 'CREATE_CASEFILE_FAILURE',
  SELECT_CASEFILE: 'SELECT_CASEFILE',
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
export interface CreateCasefileSuccessAction extends ReduxAction {
  payload: Casefile;
}

export interface GetCasefileSuccessAction extends ReduxAction {
  payload: Casefile;
}

export interface SelectCasefileAction extends ReduxAction {
  payload: Casefile;
}

export interface GetCasefilesSuccessAction extends ReduxAction {
  payload: Casefile[];
}

export interface UpdateCasefileSuccessAction extends ReduxAction {
  payload: Casefile;
}

export type CeateCasefileKnownAction = ReduxAction | CreateCasefileSuccessAction;
export type GetCasefileKnownAction = ReduxAction | GetCasefileSuccessAction;
export type GetCasefilesKnownAction = ReduxAction | GetCasefilesSuccessAction;
export type KnownAction =
  | CeateCasefileKnownAction
  | GetCasefilesKnownAction
  | SelectCasefileAction
  | GetCasefileKnownAction;
//#endregion actions
