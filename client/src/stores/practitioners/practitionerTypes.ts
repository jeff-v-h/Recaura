import { Practitioner } from '../../models/practitionerModels';
import { ErrorAction, RequestState } from '../common/types';
import { Action } from 'redux';

export const C = {
  LOGIN_PRACTITIONER_REQUEST: 'LOGIN_PRACTITIONER_REQUEST',
  LOGIN_PRACTITIONER_SUCCESS: 'LOGIN_PRACTITIONER_SUCCESS',
  LOGIN_PRACTITIONER_FAILURE: 'LOGIN_PRACTITIONER_FAILURE',
  LOGOUT_PRACTITIONER_REQUEST: 'LOGOUT_PRACTITIONER_REQUEST',
  LOGOUT_PRACTITIONER_SUCCESS: 'LOGOUT_PRACTITIONER_SUCCESS',
  LOGOUT_PRACTITIONER_FAILURE: 'LOGOUT_PRACTITIONER_FAILURE',
  GET_PRACTITIONERS_REQUEST: 'GET_PRACTITIONERS_REQUEST',
  GET_PRACTITIONERS_SUCCESS: 'GET_PRACTITIONERS_SUCCESS',
  GET_PRACTITIONERS_FAILURE: 'GET_PRACTITIONERS_FAILURE',
  GET_PRACTITIONER_REQUEST: 'GET_PRACTITIONER_REQUEST',
  GET_PRACTITIONER_SUCCESS: 'GET_PRACTITIONER_SUCCESS',
  GET_PRACTITIONER_FAILURE: 'GET_PRACTITIONER_FAILURE',
  CREATE_PRACTITIONER_REQUEST: 'CREATE_PRACTITIONER_REQUEST',
  CREATE_PRACTITIONER_SUCCESS: 'CREATE_PRACTITIONER_SUCCESS',
  CREATE_PRACTITIONER_FAILURE: 'CREATE_PRACTITIONER_FAILURE',
  UPDATE_PRACTITIONER_REQUEST: 'UPDATE_PRACTITIONER_REQUEST',
  UPDATE_PRACTITIONER_SUCCESS: 'UPDATE_PRACTITIONER_SUCCESS',
  UPDATE_PRACTITIONER_FAILURE: 'UPDATE_PRACTITIONER_FAILURE',
  DELETE_PRACTITIONER_REQUEST: 'DELETE_PRACTITIONER_REQUEST',
  DELETE_PRACTITIONER_SUCCESS: 'DELETE_PRACTITIONER_SUCCESS',
  DELETE_PRACTITIONER_FAILURE: 'DELETE_PRACTITIONER_FAILURE'
};

//--------------------
//#region ACTIONS
export interface LoginPractitionerSuccessAction extends Action {
  payload: Practitioner;
}

export interface CreatePractitionerSuccessAction extends Action {
  payload: Practitioner;
}

export interface GetPractitionersSuccessAction extends Action {
  payload: Practitioner[];
}

export interface GetPractitionerSuccessAction extends Action {
  payload: Practitioner;
}

export interface UpdatePractitionerSuccessAction extends Action {
  payload: Practitioner;
}

export interface DeletePractitionerSuccessAction extends Action {
  payload: string;
}
//#endregion ACTIONS
//--------------------

// ACTION TYPE
type RequestAction = Action | ErrorAction;
export type LoginPractitionerKnownAction = RequestAction | LoginPractitionerSuccessAction;
export type CreatePractitionerKnownAction = RequestAction | CreatePractitionerSuccessAction;
export type GetPractitionersKnownAction = RequestAction | GetPractitionersSuccessAction;
export type GetPractitionerKnownAction = RequestAction | GetPractitionerSuccessAction;
export type UpdatePractitionerKnownAction = RequestAction | UpdatePractitionerSuccessAction;
export type DeletePractitionerKnownAction = RequestAction | DeletePractitionerSuccessAction;
export type KnownAction =
  | LoginPractitionerKnownAction
  | CreatePractitionerKnownAction
  | GetPractitionersKnownAction
  | GetPractitionerKnownAction
  | UpdatePractitionerKnownAction
  | DeletePractitionerKnownAction;

export interface PractitionerState extends Practitioner, RequestState {
  list: Practitioner[];
}
