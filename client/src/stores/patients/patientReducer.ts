import { Reducer } from 'redux';
import * as T from './patientTypes';
import { Honorific, Gender } from '../../models/enums';
import { ErrorAction } from '../common/types';

const { C } = T;

const unloadedState: T.PatientState = {
  isFetching: false,
  list: [],
  id: '',
  honorific: Honorific.NoTitle,
  firstName: '',
  lastName: '',
  dob: '',
  email: '',
  countryCode: '',
  homePhone: '',
  mobilePhone: '',
  gender: Gender.other,
  occupation: '',
  error: ''
};

const reducer: Reducer<T.PatientState> = (
  state: T.PatientState | undefined,
  incomingAction: T.KnownAction
): T.PatientState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction;
  let obj;
  switch (action.type) {
    case C.CREATE_PATIENT_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case C.CREATE_PATIENT_SUCCESS:
      obj = action as T.CreatePatientSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.CREATE_PATIENT_FAILURE:
      obj = action as ErrorAction;
      return { ...state, isFetching: false, error: obj.payload };

    case C.GET_PATIENTS_REQUEST:
      return { ...state, isFetching: true, list: [], error: '' };
    case C.GET_PATIENTS_SUCCESS:
      obj = action as T.GetPatientsSuccessAction;
      return { ...state, isFetching: false, list: obj.payload };
    case C.GET_PATIENTS_FAILURE:
      obj = action as ErrorAction;
      return { ...state, isFetching: false, error: obj.payload };

    case C.GET_PATIENT_REQUEST:
      return { ...unloadedState, isFetching: true, list: state.list, error: '' };
    case C.GET_PATIENT_SUCCESS:
      obj = action as T.GetPatientSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.GET_PATIENT_FAILURE:
      obj = action as ErrorAction;
      return { ...state, isFetching: false, error: obj.payload };

    case C.UPDATE_PATIENT_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case C.UPDATE_PATIENT_SUCCESS:
      obj = action as T.UpdatePatientSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.UPDATE_PATIENT_FAILURE:
      obj = action as ErrorAction;
      return { ...state, isFetching: false, error: obj.payload };

    case C.DELETE_PATIENT_REQUEST:
      return { ...state, isFetching: true, error: '' };
    case C.DELETE_PATIENT_SUCCESS:
      obj = action as T.DeletePatientSuccessAction;
      const id = obj.payload;
      return { ...unloadedState, isFetching: false, list: state.list.filter((c) => c.id !== id) };
    case C.DELETE_PATIENT_FAILURE:
      obj = action as ErrorAction;
      return { ...state, isFetching: false, error: obj.payload };

    case C.SELECT_PATIENT:
      obj = action as T.SelectPatientAction;
      return { ...state, ...obj.payload, error: '' };

    default:
      return state;
  }
};

export default reducer;
