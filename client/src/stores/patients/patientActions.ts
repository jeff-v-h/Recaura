import { AppThunkAction } from '../index';
import * as T from './patientTypes';
import patientsService from '../../services/patientsService';
import { Patient } from '../../models/patientModels';

const { C } = T;

export const createPatient = (
  patient: Omit<Patient, 'id'>
): AppThunkAction<T.CreatePatientKnownAction> => async (dispatch) => {
  dispatch({ type: C.CREATE_PATIENT_REQUEST });

  try {
    dispatch({
      type: C.CREATE_PATIENT_SUCCESS,
      payload: await patientsService.createPatient(patient)
    });
  } catch (e) {
    dispatch({ type: C.GET_PATIENTS_FAILURE });
  }
};

export const getPatients = (): AppThunkAction<T.GetPatientsKnownAction> => async (
  dispatch,
  getState
) => {
  // Only load data if it's something we don't already have (and are not already loading)
  const appState = getState();
  if (appState.patient) {
    dispatch({ type: C.GET_PATIENTS_REQUEST });

    try {
      dispatch({
        type: C.GET_PATIENTS_SUCCESS,
        payload: await patientsService.getPatients()
      });
    } catch (e) {
      dispatch({ type: C.GET_PATIENTS_FAILURE });
    }
  }
};

export const selectPatient = (patient: Patient): T.SelectPatientAction => ({
  type: C.SELECT_PATIENT,
  payload: patient
});

export const getPatient = (id: string): AppThunkAction<T.GetPatientKnownAction> => async (
  dispatch,
  getState
) => {
  // Only load data if it's something we don't already have (and are not already loading)
  const appState = getState();
  if (id !== appState.patient?.id) {
    dispatch({ type: C.GET_PATIENT_REQUEST });

    try {
      dispatch({
        type: C.GET_PATIENT_SUCCESS,
        payload: await patientsService.getPatient(id)
      });
    } catch (e) {
      dispatch({ type: C.GET_PATIENT_FAILURE });
    }
  }
};
