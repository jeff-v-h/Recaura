import { AppThunkAction } from '../index';
import * as T from './patientTypes';
import patientsService from '../../services/patientsService';
import { Patient, PatientBase } from '../../models/patientModels';
import history from '../../helpers/history';
import cookieService from '../../services/cookieService';
import { NOT_LOGGED_IN } from '../../helpers/constants';
import { handleNotLoggedInError } from '../../helpers/utils';

const { C } = T;

export const createPatient = (
  patient: PatientBase
): AppThunkAction<T.CreatePatientKnownAction> => async (dispatch) => {
  dispatch({ type: C.CREATE_PATIENT_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    const newPatient = await patientsService.createPatient(patient, token);
    dispatch({ type: C.CREATE_PATIENT_SUCCESS, payload: newPatient });
    history.push(`/patients/${newPatient.id}/casefiles`);
  } catch (e) {
    dispatch({ type: C.CREATE_PATIENT_FAILURE, payload: e });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};

export const getPatients = (): AppThunkAction<T.GetPatientsKnownAction> => async (dispatch) => {
  dispatch({ type: C.GET_PATIENTS_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    dispatch({
      type: C.GET_PATIENTS_SUCCESS,
      payload: await patientsService.getPatients(token)
    });
  } catch (e) {
    dispatch({ type: C.GET_PATIENTS_FAILURE, payload: e });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
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
  if (id !== appState?.patient?.id) {
    dispatch({ type: C.GET_PATIENT_REQUEST });

    try {
      const token = cookieService.getUserToken();
      if (!token) throw NOT_LOGGED_IN;

      dispatch({
        type: C.GET_PATIENT_SUCCESS,
        payload: await patientsService.getPatient(id, token)
      });
    } catch (e) {
      dispatch({ type: C.GET_PATIENT_FAILURE, payload: e });
      if (e === NOT_LOGGED_IN) handleNotLoggedInError();
    }
  }
};

export const updatePatient = (
  id: string,
  patient: PatientBase
): AppThunkAction<T.UpdatePatientKnownAction> => async (dispatch) => {
  dispatch({ type: C.UPDATE_PATIENT_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    const updatedPatient = await patientsService.updatePatient(id, patient, token);
    dispatch({ type: C.UPDATE_PATIENT_SUCCESS, payload: updatedPatient });
  } catch (e) {
    dispatch({ type: C.UPDATE_PATIENT_FAILURE, payload: e });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};

export const deletePatient = (id: string): AppThunkAction<T.DeletePatientKnownAction> => async (
  dispatch
) => {
  dispatch({ type: C.DELETE_PATIENT_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    await patientsService.deletePatient(id, token);
    dispatch({ type: C.DELETE_PATIENT_SUCCESS, payload: id });
    history.push(`/patients`);
  } catch (e) {
    dispatch({ type: C.DELETE_PATIENT_FAILURE, payload: e });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};
