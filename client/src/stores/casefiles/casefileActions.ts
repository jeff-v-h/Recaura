import { AppThunkAction } from '../index'
import * as T from './casefileTypes'
import patientsService from '../../api/patientsService'

const { C } = T

export const GetCasefile = (id: string): AppThunkAction<T.GetCasefileKnownAction> => async (
    dispatch,
    getState
) => {
    const appState = getState();
    if (appState?.casefile?.id !== id) {
        dispatch({ type: C.GET_CASEFILE_REQUEST });

        try {
            dispatch({
                type: C.GET_CASEFILE_SUCCESS,
                payload: await patientsService.GetCasefile(id),
            });
        } catch (e) {
            dispatch({ type: C.GET_CASEFILE_FAILURE });
        }
    }
},