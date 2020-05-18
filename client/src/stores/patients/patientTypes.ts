import { Patient } from '../../models/patientModels';
import { ReduxAction, ErrorAction, RequestState } from '../common/types';

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
export interface CreatePatientSuccessAction extends ReduxAction {
  payload: Patient;
}

export interface GetPatientsSuccessAction extends ReduxAction {
  payload: Patient[];
}

export interface SelectPatientAction extends ReduxAction {
  payload: Patient;
}

export interface GetPatientSuccessAction extends ReduxAction {
  payload: Patient;
}
//#endregion ACTIONS
//--------------------

// ACTION TYPE
type RequestAction = ReduxAction | ErrorAction;
export type CreatePatientKnownAction = RequestAction | CreatePatientSuccessAction;
export type GetPatientsKnownAction = RequestAction | GetPatientsSuccessAction;
export type GetPatientKnownAction = RequestAction | GetPatientSuccessAction;
export type KnownAction =
  | CreatePatientKnownAction
  | GetPatientsKnownAction
  | SelectPatientAction
  | GetPatientKnownAction;

export interface PatientState extends Patient, RequestState {
  list: Patient[];
}
