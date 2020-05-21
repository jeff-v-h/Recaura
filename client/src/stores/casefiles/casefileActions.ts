import { AppThunkAction } from '../index';
import * as T from './casefileTypes';
import casefileService from '../../services/casefileService';
import { Casefile, CasefileBase } from '../../models/casefileModels';
import { history } from '../../index';

const { C } = T;

export const createCasefile = (
  casefile: CasefileBase
): AppThunkAction<T.CreateCasefileKnownAction> => async (dispatch) => {
  dispatch({ type: C.CREATE_CASEFILE_REQUEST });

  try {
    const newCasefile = await casefileService.createCasefile(casefile);

    dispatch({
      type: C.CREATE_CASEFILE_SUCCESS,
      payload: newCasefile
    });
    history.push(`/patients/${newCasefile.patientId}/casefiles/${newCasefile.id}`);
  } catch (e) {
    dispatch({ type: C.CREATE_CASEFILE_FAILURE });
  }
};

export const getCasefiles = (
  patientId: string
): AppThunkAction<T.GetCasefilesKnownAction> => async (dispatch) => {
  dispatch({ type: C.GET_CASEFILES_REQUEST });

  try {
    dispatch({
      type: C.GET_CASEFILES_SUCCESS,
      payload: await casefileService.getCasefiles(patientId)
    });
  } catch (e) {
    dispatch({ type: C.GET_CASEFILES_FAILURE });
  }
};

export const selectCasefile = (casefile: Casefile): T.SelectCasefileAction => ({
  type: C.SELECT_CASEFILE,
  payload: casefile
});

export const getCasefile = (id: string): AppThunkAction<T.GetCasefileKnownAction> => async (
  dispatch,
  getState
) => {
  const appState = getState();
  if (appState?.casefile?.id !== id) {
    dispatch({ type: C.GET_CASEFILE_REQUEST });

    try {
      dispatch({
        type: C.GET_CASEFILE_SUCCESS,
        payload: await casefileService.getCasefile(id)
      });
    } catch (e) {
      dispatch({ type: C.GET_CASEFILE_FAILURE });
    }
  }
};
