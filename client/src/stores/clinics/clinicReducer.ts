import { Reducer } from 'redux';
import * as T from './clinicTypes';

const { C } = T;

export const unloadedState: T.ClinicState = {
  isFetching: false,
  list: [],
  id: '',
  name: '',
  isActive: false,
  locations: []
};

const reducer: Reducer<T.ClinicState> = (
  state: T.ClinicState | undefined,
  incomingAction: T.KnownAction
): T.ClinicState => {
  if (state === undefined) return unloadedState;

  const action = incomingAction as T.KnownAction;
  let obj;
  switch (action.type) {
    case C.CREATE_CLINIC_REQUEST:
      return { ...state, isFetching: true };
    case C.CREATE_CLINIC_SUCCESS:
      obj = action as T.CreateClinicSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.CREATE_CLINIC_FAILURE:
      return { ...state, isFetching: false };

    case C.GET_CLINICS_REQUEST:
      return { ...state, isFetching: true, list: [] };
    case C.GET_CLINICS_SUCCESS:
      obj = action as T.GetClinicsSuccessAction;
      return { ...state, isFetching: false, list: obj.payload };
    case C.GET_CLINIC_FAILURE:
      return { ...state, isFetching: false, list: [] };

    case C.SELECT_CLINIC:
      obj = action as T.SelectClinicAction;
      return { ...state, ...obj.payload };

    case C.GET_CLINIC_REQUEST:
      return { ...unloadedState, list: state.list, isFetching: true };
    case C.GET_CLINIC_SUCCESS:
      obj = action as T.GetClinicSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.GET_CLINIC_FAILURE:
      return { ...state, isFetching: false };

    case C.UPDATE_CLINIC_REQUEST:
      return { ...state, isFetching: true };
    case C.UPDATE_CLINIC_SUCCESS:
      obj = action as T.UpdateClinicSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.UPDATE_CLINIC_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default reducer;
