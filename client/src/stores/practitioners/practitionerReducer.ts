import { Reducer } from 'redux';
import * as T from './practitionerTypes';
import { ErrorAction } from '../common/types';
import { emptyPractitioner } from '../common/objects';

const { C } = T;

export const unloadedState: T.PractitionerState = {
  isFetching: false,
  list: [],
  ...emptyPractitioner,
  error: ''
};

const reducer: Reducer<T.PractitionerState> = (
  state: T.PractitionerState | undefined,
  incomingAction: T.KnownAction
): T.PractitionerState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction;
  let obj;
  switch (action.type) {
    case C.LOGIN_PRACTITIONER_REQUEST:
      return getStandardRequestState(state);
    case C.LOGIN_PRACTITIONER_SUCCESS:
      obj = action as T.LoginPractitionerSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.LOGIN_PRACTITIONER_FAILURE:
      obj = action as ErrorAction;
      return getStandardErrorState(state, obj.payload);

    case C.LOGOUT_PRACTITIONER_REQUEST:
      return getStandardRequestState(state);
    case C.LOGOUT_PRACTITIONER_SUCCESS:
      return { ...unloadedState, isFetching: false, list: state.list };
    case C.LOGOUT_PRACTITIONER_FAILURE:
      obj = action as ErrorAction;
      return getStandardErrorState(state, obj.payload);

    case C.CREATE_PRACTITIONER_REQUEST:
      return getStandardRequestState(state);
    case C.CREATE_PRACTITIONER_SUCCESS:
      obj = action as T.CreatePractitionerSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.CREATE_PRACTITIONER_FAILURE:
      obj = action as ErrorAction;
      return getStandardErrorState(state, obj.payload);

    case C.GET_PRACTITIONERS_REQUEST:
      return { ...state, isFetching: true, list: [], error: '' };
    case C.GET_PRACTITIONERS_SUCCESS:
      obj = action as T.GetPractitionersSuccessAction;
      return { ...state, isFetching: false, list: obj.payload };
    case C.GET_PRACTITIONERS_FAILURE:
      obj = action as ErrorAction;
      return getStandardErrorState(state, obj.payload);

    case C.GET_PRACTITIONER_REQUEST:
      return { ...unloadedState, isFetching: true, list: state.list, error: '' };
    case C.GET_PRACTITIONER_SUCCESS:
      obj = action as T.GetPractitionerSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.GET_PRACTITIONER_FAILURE:
      obj = action as ErrorAction;
      return getStandardErrorState(state, obj.payload);

    case C.UPDATE_PRACTITIONER_REQUEST:
      return getStandardRequestState(state);
    case C.UPDATE_PRACTITIONER_SUCCESS:
      obj = action as T.UpdatePractitionerSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.UPDATE_PRACTITIONER_FAILURE:
      obj = action as ErrorAction;
      return getStandardErrorState(state, obj.payload);

    case C.DELETE_PRACTITIONER_REQUEST:
      return getStandardRequestState(state);
    case C.DELETE_PRACTITIONER_SUCCESS:
      obj = action as T.DeletePractitionerSuccessAction;
      const id = obj.payload;
      return { ...unloadedState, isFetching: false, list: state.list.filter((c) => c.id !== id) };
    case C.DELETE_PRACTITIONER_FAILURE:
      obj = action as ErrorAction;
      return getStandardErrorState(state, obj.payload);

    default:
      return state;
  }
};

function getStandardRequestState(state: T.PractitionerState) {
  return { ...state, isFetching: true, error: '' };
}

function getStandardErrorState(state: T.PractitionerState, error: string) {
  return { ...state, isFetching: false, error };
}

export default reducer;
