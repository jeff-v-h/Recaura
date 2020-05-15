import { Reducer } from 'redux';
import * as T from './patientTypes';
import { Honorific, Gender } from '../../models/enums';

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
  gender: Gender.preferNotToSay,
  occupation: '',
  casefiles: []
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
    case C.GET_PATIENTS_REQUEST:
      return { ...state, isFetching: true, list: [] };
    case C.GET_PATIENTS_SUCCESS:
      obj = action as T.GetPatientsSuccessAction;
      return { ...state, isFetching: false, list: obj.payload };
    case C.GET_PATIENTS_FAILURE:
      return { ...state, isFetching: false, list: [] };

    case C.SELECT_PATIENT:
      obj = action as T.SelectPatientAction;
      return { ...state, ...obj.payload };

    case C.GET_PATIENT_REQUEST:
      return { ...unloadedState, isFetching: true, list: state.list };
    case C.GET_PATIENT_SUCCESS:
      obj = action as T.GetPatientSuccessAction;
      return { ...state, isFetching: false, ...obj.payload };
    case C.GET_PATIENT_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default reducer;
