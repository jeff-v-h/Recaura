import { Clinic } from 'src/models/clinicModels';
import { Action } from 'redux';

export const C = {
  CREATE_CLINIC_REQUEST: 'CREATE_CLINIC_REQUEST',
  CREATE_CLINIC_SUCCESS: 'CREATE_CLINIC_SUCCESS',
  CREATE_CLINIC_FAILURE: 'CREATE_CLINIC_FAILURE',
  SELECT_CLINIC: 'SELECT_CLINIC',
  GET_CLINICS_REQUEST: 'GET_CLINICS_REQUEST',
  GET_CLINICS_SUCCESS: 'GET_CLINICS_SUCCESS',
  GET_CLINICS_FAILURE: 'GET_CLINICS_FAILURE',
  GET_CLINIC_REQUEST: 'GET_CLINIC_REQUEST',
  GET_CLINIC_SUCCESS: 'GET_CLINIC_SUCCESS',
  GET_CLINIC_FAILURE: 'GET_CLINIC_FAILURE',
  UPDATE_CLINIC_REQUEST: 'UPDATE_CLINIC_REQUEST',
  UPDATE_CLINIC_SUCCESS: 'UPDATE_CLINIC_SUCCESS',
  UPDATE_CLINIC_FAILURE: 'UPDATE_CLINIC_FAILURE'
};

export interface ClinicState extends Clinic {
  isFetching: boolean;
  list: Clinic[];
}

//#region actions
export interface CreateClinicSuccessAction extends Action {
  payload: Clinic;
}

export interface GetClinicsSuccessAction extends Action {
  payload: Clinic[];
}

export interface GetClinicSuccessAction extends Action {
  payload: Clinic;
}

export interface SelectClinicAction extends Action {
  payload: Clinic;
}

export interface UpdateClinicSuccessAction extends Action {
  payload: Clinic;
}

export interface DeleteClinicSuccessAction extends Action {
  payload: string;
}

export type CreateClinicKnownAction = Action | CreateClinicSuccessAction;
export type GetClinicsKnownAction = Action | GetClinicsSuccessAction;
export type GetClinicKnownAction = Action | GetClinicSuccessAction;
export type UpdateClinicKnownAction = Action | UpdateClinicSuccessAction;
export type DeleteClinicKnownAction = Action | DeleteClinicSuccessAction;
export type KnownAction =
  | CreateClinicKnownAction
  | GetClinicsKnownAction
  | SelectClinicAction
  | GetClinicKnownAction
  | UpdateClinicKnownAction
  | DeleteClinicKnownAction;
//#endregion actions
