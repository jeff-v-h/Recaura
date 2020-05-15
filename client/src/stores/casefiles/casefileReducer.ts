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
    case C.GET_CASEFILES_REQUEST:
      return { ...state, isFetching: true, list: [] };
    case C.GET_CASEFILES_SUCCESS:
      obj = action as T.GetCasefilesSuccessAction;
      return { ...state, isFetching: false, list: obj.payload };
    case C.GET_CASEFILE_FAILURE:
      obj = action as T.GetCasefilesFailureAction;
      return { ...state, isFetching: false, list: [] };

    case C.GET_CASEFILE_REQUEST:
      return { ...unloadedState, list: state.list, isFetching: true };
    case C.GET_CASEFILE_SUCCESS:
      obj = action as T.GetCasefileSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.GET_CASEFILE_FAILURE:
      obj = action as T.GetCasefileFailureAction;
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default reducer;
