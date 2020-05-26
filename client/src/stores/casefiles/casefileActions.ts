import { AppThunkAction } from '../index';
import * as T from './casefileTypes';
import casefileService from '../../services/casefileService';
import { Casefile, CasefileBase } from '../../models/casefileModels';
import history from '../../helpers/history';
import cookieService from '../../services/cookieService';
import { NOT_LOGGED_IN } from '../../helpers/constants';
import { handleNotLoggedInError } from '../../helpers/utils';

const { C } = T;

export const createCasefile = (
  casefile: CasefileBase
): AppThunkAction<T.CreateCasefileKnownAction> => async (dispatch) => {
  dispatch({ type: C.CREATE_CASEFILE_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    const newCasefile = await casefileService.createCasefile(casefile, token);

    dispatch({ type: C.CREATE_CASEFILE_SUCCESS, payload: newCasefile });
    history.push(`/patients/${newCasefile.patientId}/casefiles/${newCasefile.id}/consultations`);
  } catch (e) {
    dispatch({ type: C.CREATE_CASEFILE_FAILURE });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};

export const getCasefiles = (
  patientId: string
): AppThunkAction<T.GetCasefilesKnownAction> => async (dispatch) => {
  dispatch({ type: C.GET_CASEFILES_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    dispatch({
      type: C.GET_CASEFILES_SUCCESS,
      payload: await casefileService.getCasefiles(patientId, token)
    });
  } catch (e) {
    dispatch({ type: C.GET_CASEFILES_FAILURE });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
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
      const token = cookieService.getUserToken();
      if (!token) throw NOT_LOGGED_IN;

      dispatch({
        type: C.GET_CASEFILE_SUCCESS,
        payload: await casefileService.getCasefile(id, token)
      });
    } catch (e) {
      dispatch({ type: C.GET_CASEFILE_FAILURE });
      if (e === NOT_LOGGED_IN) handleNotLoggedInError();
    }
  }
};

export const updateCasefile = (
  id: string,
  file: CasefileBase
): AppThunkAction<T.UpdateCasefileKnownAction> => async (dispatch) => {
  dispatch({ type: C.UPDATE_CASEFILE_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    const casefile = await casefileService.updateCasefile(id, file, token);
    dispatch({ type: C.UPDATE_CASEFILE_SUCCESS, payload: casefile });
  } catch (e) {
    dispatch({ type: C.UPDATE_CASEFILE_FAILURE });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};

export const deleteCasefile = (id: string): AppThunkAction<T.DeleteCasefileKnownAction> => async (
  dispatch
) => {
  dispatch({ type: C.DELETE_CASEFILE_REQUEST });

  try {
    const token = cookieService.getUserToken();
    if (!token) throw NOT_LOGGED_IN;

    const casefile = await casefileService.deleteCasefile(id, token);
    dispatch({ type: C.DELETE_CASEFILE_SUCCESS, payload: id });
    history.push(`/patients/${casefile.patientId}/casefiles`);
  } catch (e) {
    dispatch({ type: C.DELETE_CASEFILE_FAILURE });
    if (e === NOT_LOGGED_IN) handleNotLoggedInError();
  }
};
