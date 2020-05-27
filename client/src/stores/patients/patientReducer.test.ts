import reducer, { unloadedState } from './patientReducer';
import { C } from './patientTypes';
import { mockPatient } from '../../../__tests__/setup/reduxMock';

describe('Patient reducer', () => {
  const patient = { ...mockPatient, id: '222', occupation: 'manager' };
  const patient2 = { ...mockPatient, id: '111', occupation: 'designer' };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'any' })).toEqual(unloadedState);
  });

  it(`should handle ${C.CREATE_PATIENT_SUCCESS}`, () => {
    const action = { type: C.CREATE_PATIENT_SUCCESS, payload: patient };
    const expectedState = { ...unloadedState, ...patient };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.GET_PATIENT_SUCCESS}`, () => {
    const action = { type: C.GET_PATIENT_SUCCESS, payload: patient2 };
    const expectedState = { ...unloadedState, ...patient2 };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.UPDATE_PATIENT_SUCCESS}`, () => {
    const action = { type: C.UPDATE_PATIENT_SUCCESS, payload: patient };
    const expectedState = { ...unloadedState, ...patient };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.DELETE_PATIENT_SUCCESS}`, () => {
    const list = [patient, patient2];
    const initialState = { ...unloadedState, list, ...patient2 };
    const action = { type: C.DELETE_PATIENT_SUCCESS, payload: patient2.id };
    const expectedState = { ...unloadedState, list: [patient] };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
