import { AppThunkAction } from '../index';
import * as T from './patientTypes';
import patientsService from '../../services/patientsService';
import { Patient, PatientBase } from '../../models/patientModels';
import history from '../../helpers/history';

const { C } = T;

export const createPatient = (
  patient: PatientBase
): AppThunkAction<T.CreatePatientKnownAction> => async (dispatch) => {
  dispatch({ type: C.CREATE_PATIENT_REQUEST });

  try {
    const newPatient = await patientsService.createPatient(patient);
    dispatch({ type: C.CREATE_PATIENT_SUCCESS, payload: newPatient });
    history.push(`/patients/${newPatient.id}/casefiles`);
  } catch (error) {
    dispatch({ type: C.CREATE_PATIENT_FAILURE, payload: error });
  }
};

export const getPatients = (): AppThunkAction<T.GetPatientsKnownAction> => async (dispatch) => {
  dispatch({ type: C.GET_PATIENTS_REQUEST });

  try {
    dispatch({
      type: C.GET_PATIENTS_SUCCESS,
      payload: await patientsService.getPatients()
    });
  } catch (error) {
    dispatch({ type: C.GET_PATIENTS_FAILURE, payload: error });
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
      dispatch({
        type: C.GET_PATIENT_SUCCESS,
        payload: await patientsService.getPatient(id)
      });
    } catch (error) {
      dispatch({ type: C.GET_PATIENT_FAILURE, payload: error });
    }
  }
};

export const updatePatient = (
  id: string,
  patient: PatientBase
): AppThunkAction<T.UpdatePatientKnownAction> => async (dispatch) => {
  dispatch({ type: C.UPDATE_PATIENT_REQUEST });

  try {
    const updatedPatient = await patientsService.updatePatient(id, patient);
    dispatch({ type: C.UPDATE_PATIENT_SUCCESS, payload: updatedPatient });
  } catch (e) {
    dispatch({ type: C.UPDATE_PATIENT_FAILURE, payload: e });
  }
};

export const deletePatient = (id: string): AppThunkAction<T.DeletePatientKnownAction> => async (
  dispatch
) => {
  dispatch({ type: C.DELETE_PATIENT_REQUEST });

  try {
    await patientsService.deletePatient(id);
    dispatch({ type: C.DELETE_PATIENT_SUCCESS, payload: id });
    history.push(`/patients`);
  } catch (e) {
    dispatch({ type: C.DELETE_PATIENT_FAILURE, payload: e });
  }
};
