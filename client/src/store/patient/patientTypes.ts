import { Patient } from 'src/models/patientModels'

export const C = {
    GET_PATIENTS_REQUEST: "GET_PATIENTS_REQUEST",
    GET_PATIENTS_SUCCESS: "GET_PATIENTS_SUCCESS",
    GET_PATIENTS_FAILURE: "GET_PATIENTS_FAILURE",
    GET_PATIENT_REQUEST: "GET_PATIENT_REQUEST",
    GET_PATIENT_SUCCESS: "GET_PATIENT_SUCCESS",
    GET_PATIENT_FAILURE: "GET_PATIENT_FAILURE",
    CREATE_PATIENT_REQUEST: "CREATE_PATIENT_REQUEST",
    CREATE_PATIENT_SUCCESS: "CREATE_PATIENT_SUCCESS",
    CREATE_PATIENT_FAILURE: "CREATE_PATIENT_FAILURE",
    UPDATE_PATIENT_REQUEST: "UPDATE_PATIENT_REQUEST",
    UPDATE_PATIENT_SUCCESS: "UPDATE_PATIENT_SUCCESS",
    UPDATE_PATIENT_FAILURE: "UPDATE_PATIENT_FAILURE",
    DELETE_PATIENT_REQUEST: "DELETE_PATIENT_REQUEST",
    DELETE_PATIENT_SUCCESS: "DELETE_PATIENT_SUCCESS",
    DELETE_PATIENT_FAILURE: "DELETE_PATIENT_FAILURE",
};

//--------------------
//#region ACTIONS
export interface GetPatientsRequestAction {
    type: typeof C.GET_PATIENTS_REQUEST;
}
  
export interface GetPatientsSuccessAction {
    type: typeof C.GET_PATIENTS_SUCCESS;
    payload: Patient[];
}
  
export interface GetPatientsFailureAction {
    type: typeof C.GET_PATIENTS_FAILURE;
}

export interface GetPatientRequestAction {
    type: typeof C.GET_PATIENT_REQUEST;
}
  
export interface GetPatientSuccessAction {
    type: typeof C.GET_PATIENT_SUCCESS;
    payload: Patient;
}
  
export interface GetPatientFailureAction {
    type: typeof C.GET_PATIENT_FAILURE;
}
  
//#endregion ACTIONS
//--------------------

// ACTION TYPE
export type GetPatientsKnownAction =
    | GetPatientsRequestAction
    | GetPatientsSuccessAction
    | GetPatientsFailureAction;
export type GetPatientKnownAction =
    | GetPatientRequestAction
    | GetPatientSuccessAction
    | GetPatientFailureAction;
export type KnownAction = GetPatientsKnownAction | GetPatientKnownAction;

export interface PatientState extends Patient {
    isFetching: boolean;
    list: Patient[];
}
