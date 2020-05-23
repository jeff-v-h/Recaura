import reducer, { unloadedState } from './consultationReducer';
import { C } from './consultationTypes';
import { mockConsult } from '../../../__tests__/setup/reduxMock';

describe('Consultation Reducer', () => {
  const newConsult = { ...mockConsult, id: '222', date: '1980-05-21', treatments: 'exercise' };
  const newConsult2 = { ...mockConsult, id: '111', treatments: 'ex' };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'any' })).toEqual(unloadedState);
  });

  it(`should handle ${C.CREATE_CONSULTATION_SUCCESS}`, () => {
    const action = { type: C.CREATE_CONSULTATION_SUCCESS, payload: newConsult };
    const expectedState = { ...unloadedState, ...newConsult };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.GET_CONSULTATION_SUCCESS}`, () => {
    const action = { type: C.GET_CONSULTATION_SUCCESS, payload: newConsult2 };
    const expectedState = { ...unloadedState, ...newConsult2 };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.UPDATE_CONSULTATION_SUCCESS}`, () => {
    const action = { type: C.UPDATE_CONSULTATION_SUCCESS, payload: newConsult };
    const expectedState = { ...unloadedState, ...newConsult };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.DELETE_CONSULTATION_SUCCESS}`, () => {
    const list = [newConsult, newConsult2];
    const initialState = { ...unloadedState, list, ...newConsult2 };
    const action = { type: C.DELETE_CONSULTATION_SUCCESS, payload: newConsult2.id };
    const expectedState = { ...unloadedState, list: [newConsult] };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
