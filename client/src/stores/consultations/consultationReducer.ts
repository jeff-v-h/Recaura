import { Reducer } from 'redux';
import * as T from './consultationTypes';
import { emptySubjective, emptyObjective } from './../common/objects';

const { C } = T;

export const unloadedState: T.ConsultationState = {
  isFetching: false,
  list: [],
  id: '',
  patientId: '',
  casefileId: '',
  practitionerId: '',
  date: '',
  practitioner: undefined,
  subjectiveAssessment: emptySubjective,
  objectiveAssessment: emptyObjective,
  treatments: '',
  plans: ''
};

const reducer: Reducer<T.ConsultationState> = (
  state: T.ConsultationState | undefined,
  incomingAction: T.KnownAction
): T.ConsultationState => {
  if (state === undefined) return unloadedState;

  const action = incomingAction as T.KnownAction;
  let obj;
  switch (action.type) {
    case C.CREATE_CONSULTATION_REQUEST:
      return { ...state, isFetching: true };
    case C.CREATE_CONSULTATION_SUCCESS:
      obj = action as T.CreateConsultSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.CREATE_CONSULTATION_FAILURE:
      return { ...state, isFetching: false };

    case C.GET_CONSULTATIONS_REQUEST:
      return { ...state, isFetching: true, list: [] };
    case C.GET_CONSULTATIONS_SUCCESS:
      obj = action as T.GetConsultsSuccessAction;
      return { ...state, isFetching: false, list: obj.payload };
    case C.GET_CONSULTATIONS_FAILURE:
      return { ...state, isFetching: false };

    case C.SELECT_CONSULT:
      obj = action as T.SelectConsultAction;
      return { ...state, ...obj.payload };

    case C.GET_CONSULTATION_REQUEST:
      return { ...unloadedState, isFetching: true, list: state.list };
    case C.GET_CONSULTATION_SUCCESS:
      obj = action as T.GetConsultSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.GET_CONSULTATION_FAILURE:
      return { ...state, isFetching: false };

    case C.UPDATE_CONSULTATION_REQUEST:
      return { ...state, isFetching: true };
    case C.UPDATE_CONSULTATION_SUCCESS:
      obj = action as T.UpdateConsultSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.UPDATE_CONSULTATION_FAILURE:
      return { ...state, isFetching: false };

    case C.DELETE_CONSULTATION_REQUEST:
      return { ...state, isFetching: true };
    case C.DELETE_CONSULTATION_SUCCESS:
      obj = action as T.DeleteConsultSuccessAction;
      const id = obj.payload;
      return { ...unloadedState, isFetching: false, list: state.list.filter((c) => c.id !== id) };
    case C.DELETE_CONSULTATION_FAILURE:
      return { ...state, isFetching: false };

    case C.CLEAR_CONSULTATION:
      return { ...unloadedState, list: state.list };
    case C.MODIFY_DATE:
      obj = action as T.ModifyDate;
      return { ...state, date: obj.payload };
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
