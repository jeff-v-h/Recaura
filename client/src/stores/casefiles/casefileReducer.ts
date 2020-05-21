import { Reducer } from 'redux';
import * as T from './casefileTypes';

const { C } = T;

const unloadedState: T.CasefileState = {
  isFetching: false,
  list: [],
  id: '',
  name: '',
  createdAt: '',
  patientId: '',
  consultations: [],
  patient: undefined
};

const reducer: Reducer<T.CasefileState> = (
  state: T.CasefileState | undefined,
  incomingAction: T.KnownAction
): T.CasefileState => {
  if (state === undefined) return unloadedState;

  const action = incomingAction as T.KnownAction;
  let obj;
  switch (action.type) {
    case C.CREATE_CASEFILE_REQUEST:
      return { ...state, isFetching: true };
    case C.CREATE_CASEFILE_SUCCESS:
      obj = action as T.CreateCasefileSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.CREATE_CASEFILE_FAILURE:
      return { ...state, isFetching: false };

    case C.GET_CASEFILES_REQUEST:
      return { ...state, isFetching: true, list: [] };
    case C.GET_CASEFILES_SUCCESS:
      obj = action as T.GetCasefilesSuccessAction;
      return { ...state, isFetching: false, list: obj.payload };
    case C.GET_CASEFILE_FAILURE:
      return { ...state, isFetching: false, list: [] };

    case C.SELECT_CASEFILE:
      obj = action as T.SelectCasefileAction;
      return { ...state, ...obj.payload };

    case C.GET_CASEFILE_REQUEST:
      return { ...unloadedState, list: state.list, isFetching: true };
    case C.GET_CASEFILE_SUCCESS:
      obj = action as T.GetCasefileSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.GET_CASEFILE_FAILURE:
      return { ...state, isFetching: false };

    case C.UPDATE_CASEFILE_REQUEST:
      return { ...state, isFetching: true };
    case C.UPDATE_CASEFILE_SUCCESS:
      obj = action as T.UpdateCasefileSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.UPDATE_CASEFILE_FAILURE:
      return { ...state, isFetching: false };

    case C.DELETE_CASEFILE_REQUEST:
      return { ...state, isFetching: true };
    case C.DELETE_CASEFILE_SUCCESS:
      obj = action as T.DeleteCasefileSuccessAction;
      const id = obj.payload;
      return { ...unloadedState, isFetching: false, list: state.list.filter((c) => c.id !== id) };
    case C.DELETE_CASEFILE_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default reducer;
