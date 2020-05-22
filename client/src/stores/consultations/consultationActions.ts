import { AppThunkAction } from '../index';
import * as T from './consultationTypes';
import consultationService from '../../services/consultationService';
import {
  Consultation,
  SubjectiveAssessment,
  ObjectiveAssessment,
  TreatmentsAndPlans,
  ConsultationBase
} from '../../models/consultationModels';
import { history } from '../../index';

const { C } = T;
//#region simple action creators
export const createConsultRequest = () => ({ type: C.CREATE_CONSULTATION_REQUEST });
export const createConsultSuccess = (consult: Consultation): T.CreateConsultSuccessAction => {
  return {
    type: C.CREATE_CONSULTATION_SUCCESS,
    payload: consult
  };
};
export const createConsultFailure = () => ({ type: C.CREATE_CONSULTATION_FAILURE });

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

export const selectConsult = (consult: Consultation) => ({
  type: C.SELECT_CONSULT,
  payload: consult
});

export const getConsultRequest = () => ({ type: C.GET_CONSULTATION_REQUEST });
export const getConsultSuccess = async (id: string): Promise<T.GetConsultSuccessAction> => {
  return {
    type: C.GET_CONSULTATION_SUCCESS,
    payload: await consultationService.getConsultation(id)
  };
};
export const getConsultFailure = () => ({ type: C.GET_CONSULTATION_FAILURE });

export const clearConsult = () => ({ type: C.CLEAR_CONSULTATION });
export const modifyDate = (date: string) => ({ type: C.MODIFY_DATE, payload: date });
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
export const createConsult = (
  newConsult: ConsultationBase
): AppThunkAction<T.CreateConsultKnownAction> => async (dispatch) => {
  dispatch(createConsultRequest());

  try {
    const consult = await consultationService.createConsultation(newConsult);
    dispatch(createConsultSuccess(consult));
    history.push(`/patients/${consult.patientId}/casefiles/${consult.casefileId}/consultations`);
  } catch (e) {
    dispatch(getConsultsFailure());
  }
};

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

export const updateConsult = (
  id: string,
  consult: ConsultationBase
): AppThunkAction<T.UpdateConsultKnownAction> => async (dispatch) => {
  dispatch({ type: C.UPDATE_CONSULTATION_REQUEST });

  try {
    const newConsult = await consultationService.updateConsultation(id, consult);
    dispatch({ type: C.UPDATE_CONSULTATION_SUCCESS, payload: newConsult });
  } catch (e) {
    dispatch({ type: C.UPDATE_CONSULTATION_FAILURE });
  }
};

export const deleteConsult = (id: string): AppThunkAction<T.DeleteConsultKnownAction> => async (
  dispatch
) => {
  dispatch({ type: C.DELETE_CONSULTATION_REQUEST });

  try {
    const consult = await consultationService.deleteConsultation(id);
    dispatch({ type: C.DELETE_CONSULTATION_SUCCESS, payload: id });
    history.push(`/patients/${consult.patientId}/casefiles/${consult.casefileId}/consultations`);
  } catch (e) {
    dispatch({ type: C.DELETE_CONSULTATION_FAILURE });
  }
};
//#endregion
