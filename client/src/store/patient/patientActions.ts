import { AppThunkAction } from '../index';
import * as T from './patientTypes'
import patientsService from '../../api/patientsService'

const { C } = T;

export const actionCreators = {
    getPatients: (): AppThunkAction<T.GetPatientsKnownAction> => async (
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
                payload: await patientsService.getPatients(),
                });
            } catch (e) {
                dispatch({ type: C.GET_PATIENTS_FAILURE });
            }
        }
    },
    getPatient: (id: string): AppThunkAction<T.GetPatientKnownAction> => async (
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
              payload: await patientsService.getPatient(id),
            });
          } catch (e) {
            dispatch({ type: C.GET_PATIENT_FAILURE });
          }
        }
    },
};
