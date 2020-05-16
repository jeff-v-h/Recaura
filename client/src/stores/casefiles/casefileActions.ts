import { AppThunkAction } from '../index';
import * as T from './casefileTypes';
import casefileService from '../../services/casefileService';
import { Casefile } from '../../models/casefileModels';

const { C } = T;

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
