import { Patient } from '../../models/patientModels';
import { ErrorAction, RequestState } from '../common/types';
import { Action } from 'redux';

export const C = {
  GET_PATIENTS_REQUEST: 'GET_PATIENTS_REQUEST',
  GET_PATIENTS_SUCCESS: 'GET_PATIENTS_SUCCESS',
  GET_PATIENTS_FAILURE: 'GET_PATIENTS_FAILURE',
  SELECT_PATIENT: 'SELECT_PATIENT',
  GET_PATIENT_REQUEST: 'GET_PATIENT_REQUEST',
  GET_PATIENT_SUCCESS: 'GET_PATIENT_SUCCESS',
  GET_PATIENT_FAILURE: 'GET_PATIENT_FAILURE',
  CREATE_PATIENT_REQUEST: 'CREATE_PATIENT_REQUEST',
  CREATE_PATIENT_SUCCESS: 'CREATE_PATIENT_SUCCESS',
  CREATE_PATIENT_FAILURE: 'CREATE_PATIENT_FAILURE',
  UPDATE_PATIENT_REQUEST: 'UPDATE_PATIENT_REQUEST',
  UPDATE_PATIENT_SUCCESS: 'UPDATE_PATIENT_SUCCESS',
  UPDATE_PATIENT_FAILURE: 'UPDATE_PATIENT_FAILURE',
  DELETE_PATIENT_REQUEST: 'DELETE_PATIENT_REQUEST',
  DELETE_PATIENT_SUCCESS: 'DELETE_PATIENT_SUCCESS',
  DELETE_PATIENT_FAILURE: 'DELETE_PATIENT_FAILURE'
};

//--------------------
//#region ACTIONS
export interface CreatePatientSuccessAction extends Action {
  payload: Patient;
}

export interface GetPatientsSuccessAction extends Action {
  payload: Patient[];
}

export interface SelectPatientAction extends Action {
  payload: Patient;
}

export interface GetPatientSuccessAction extends Action {
  payload: Patient;
}

export interface UpdatePatientSuccessAction extends Action {
  payload: Patient;
}

export interface DeletePatientSuccessAction extends Action {
  payload: string;
}
//#endregion ACTIONS
//--------------------

// ACTION TYPE
type RequestAction = Action | ErrorAction;
export type CreatePatientKnownAction = RequestAction | CreatePatientSuccessAction;
export type GetPatientsKnownAction = RequestAction | GetPatientsSuccessAction;
export type GetPatientKnownAction = RequestAction | GetPatientSuccessAction;
export type UpdatePatientKnownAction = RequestAction | UpdatePatientSuccessAction;
export type DeletePatientKnownAction = RequestAction | DeletePatientSuccessAction;
export type KnownAction =
  | CreatePatientKnownAction
  | GetPatientsKnownAction
  | SelectPatientAction
  | GetPatientKnownAction
  | UpdatePatientKnownAction
  | DeletePatientKnownAction;

export interface PatientState extends Patient, RequestState {
  list: Patient[];
}
