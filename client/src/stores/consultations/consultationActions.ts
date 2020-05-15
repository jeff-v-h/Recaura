import { AppThunkAction } from '../index';
import * as T from './consultationTypes';
import consultationService from '../../services/consultationService';
import {
  SubjectiveAssessment,
  ObjectiveAssessment,
  TreatmentsAndPlans
} from '../../models/consultationModels';

const { C } = T;
//#region simple action creators
export const getConsultsRequest = () => ({ type: C.GET_CONSULTATIONS_REQUEST });

export const getConsultsSuccess = async (
  casefileId: string
): Promise<T.GetConsultsSuccessAction> => {
  return {
    type: C.GET_CONSULTATIONS_SUCCESS,
    payload: await consultationService.getConsultations(casefileId)
  };
};

export const getConsultsFailure = () => ({ type: C.GET_CONSULTATIONS_FAILURE });

export const getConsultRequest = () => ({ type: C.GET_CONSULTATION_REQUEST });

export const getConsultSuccess = async (id: string): Promise<T.GetConsultSuccessAction> => {
  return {
    type: C.GET_CONSULTATION_SUCCESS,
    payload: await consultationService.getConsultation(id)
  };
};

export const getConsultFailure = () => ({ type: C.GET_CONSULTATION_FAILURE });

export const modifySubjective = (subjective: SubjectiveAssessment) =>
  ({ type: C.MODIFY_SUBJECTIVE, payload: subjective } as T.ModifySubjective);

export const modifyObjective = (objective: ObjectiveAssessment) =>
  ({ type: C.MODIFY_OBJECTIVE, payload: objective } as T.ModifyObjective);

export const modifyTreatmentsAndPlans = (treatmentAndPlans: TreatmentsAndPlans) =>
  ({
    type: C.MODIFY_TREATMENTS_AND_PLANS,
    payload: treatmentAndPlans
  } as T.ModifyTreatmentsAndPlans);
//#endregion

//#region Thunk actions creators
export const getConsults = (casefileId: string): AppThunkAction<T.GetConsultKnownAction> => async (
  dispatch
) => {
  dispatch(getConsultsRequest());

  try {
    dispatch(await getConsultsSuccess(casefileId));
  } catch (e) {
    dispatch(getConsultsFailure());
  }
};

export const getConsult = (id: string): AppThunkAction<T.GetConsultKnownAction> => async (
  dispatch,
  getState
) => {
  const appState = getState();
  if (appState?.consultation?.id !== id) {
    dispatch(getConsultRequest());

    try {
      dispatch(await getConsultSuccess(id));
    } catch (e) {
      dispatch(getConsultFailure());
    }
  }
};

export const updateConsult = (): AppThunkAction<T.UpdateConsultKnownAction> => async (
  dispatch,
  getState
) => {
  const appState = getState();
  const consult = appState?.consultation;
  if (consult?.id) {
    dispatch({ type: C.UPDATE_CONSULTATION_REQUEST });

    try {
      await consultationService.updateConsultation(consult.id, consult);
      dispatch({ type: C.UPDATE_CONSULTATION_SUCCESS });
    } catch (e) {
      dispatch({ type: C.UPDATE_CONSULTATION_FAILURE });
    }
  }
};
//#endregion
