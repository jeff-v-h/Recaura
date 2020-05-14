import { AppThunkAction } from '../index'
import * as T from './casefileTypes'
import casefileService from '../../api/casefileService'

const { C } = T

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
                payload: await casefileService.getCasefile(id),
            });
        } catch (e) {
            dispatch({ type: C.GET_CASEFILE_FAILURE });
        }
    }
}