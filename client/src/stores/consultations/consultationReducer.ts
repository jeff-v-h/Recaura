import { Reducer } from 'redux';
import * as T from './consultationTypes';

const { C } = T;

export const unloadedState: T.ConsultationState = {
  isFetching: false,
  list: [],
  id: '0',
  patientId: '0',
  caseFileId: '0',
  practitionerId: '0',
  date: '',
  number: 0,
  practitioner: null,
  subjectiveAssessment: null,
  objectiveAssessment: null,
  treatments: '',
  plans: ''
};

const reducer: Reducer<T.ConsultationState> = (
  state: T.ConsultationState | undefined,
  incomingAction: T.KnownAction
): T.ConsultationState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as T.KnownAction;
  let obj;
  switch (action.type) {
    case C.GET_CONSULTATIONS_REQUEST:
      return { ...state, isFetching: true, list: [] };
    case C.GET_CONSULTATIONS_SUCCESS:
      obj = action as T.GetConsultsSuccessAction;
      return { ...state, isFetching: false, list: obj.payload };
    case C.GET_CONSULTATIONS_FAILURE:
      return { ...state, isFetching: false };

    case C.GET_CONSULTATION_REQUEST:
      return { ...unloadedState, isFetching: true, list: state.list };
    case C.GET_CONSULTATION_SUCCESS:
      obj = action as T.GetConsultSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.GET_CONSULTATION_FAILURE:
      return { ...state, isFetching: false };

    case C.UPDATE_CONSULTATION_REQUEST:
      obj = action as T.UpdateConsultRequestAction;
      return { ...state, isFetching: true, ...obj.payload };
    case C.UPDATE_CONSULTATION_SUCCESS:
    case C.UPDATE_CONSULTATION_FAILURE:
      return { ...state, isFetching: false };

    case C.MODIFY_SUBJECTIVE:
      obj = action as T.ModifySubjective;
      return { ...state, subjectiveAssessment: obj.payload };
    case C.MODIFY_OBJECTIVE:
      obj = action as T.ModifyObjective;
      return { ...state, objectiveAssessment: obj.payload };
    case C.MODIFY_TREATMENTS_AND_PLANS:
      obj = action as T.ModifyTreatmentsAndPlans;
      return { ...state, ...obj.payload };
    default:
      return state;
  }
};

export default reducer;
