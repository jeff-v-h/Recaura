import { AppThunkAction } from '../index';
import * as T from './patientTypes';
import patientsService from '../../services/patientsService';
import { Patient, PatientBase } from '../../models/patientModels';
import { history } from '../../index';

const { C } = T;

export const createPatient = (
  patient: PatientBase
): AppThunkAction<T.CreatePatientKnownAction> => async (dispatch) => {
  dispatch({ type: C.CREATE_PATIENT_REQUEST });

  try {
    dispatch({
      type: C.CREATE_PATIENT_SUCCESS,
      payload: await patientsService.createPatient(patient)
    });
    history.push('/');
  } catch (error) {
    dispatch({ type: C.GET_PATIENTS_FAILURE, payload: error });
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
    } catch (error) {
      dispatch({ type: C.GET_PATIENTS_FAILURE, payload: error });
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
    } catch (error) {
      dispatch({ type: C.GET_PATIENT_FAILURE, payload: error });
    }
  }
};
