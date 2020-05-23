import { Casefile } from '../../models/casefileModels';
import reducer, { unloadedState } from './casefileReducer';
import { C } from './casefileTypes';
import { mockCasefile } from '../../../__tests__/setup/reduxMock';

describe('Patient reducer', () => {
  const casefile2: Casefile = { ...mockCasefile, id: '111', name: 'lower back injury' };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'any' })).toEqual(unloadedState);
  });

  it(`should handle ${C.CREATE_CASEFILE_SUCCESS}`, () => {
    const action = { type: C.CREATE_CASEFILE_SUCCESS, payload: mockCasefile };
    const expectedState = { ...unloadedState, ...mockCasefile };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.GET_CASEFILE_SUCCESS}`, () => {
    const action = { type: C.GET_CASEFILE_SUCCESS, payload: casefile2 };
    const expectedState = { ...unloadedState, ...casefile2 };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.UPDATE_CASEFILE_SUCCESS}`, () => {
    const action = { type: C.UPDATE_CASEFILE_SUCCESS, payload: mockCasefile };
    const expectedState = { ...unloadedState, ...mockCasefile };

    expect(reducer(unloadedState, action)).toEqual(expectedState);
  });

  it(`should handle ${C.DELETE_CASEFILE_SUCCESS}`, () => {
    const list = [mockCasefile, casefile2];
    const initialState = { ...unloadedState, list, ...casefile2 };
    const action = { type: C.DELETE_CASEFILE_SUCCESS, payload: casefile2.id };
    const expectedState = { ...unloadedState, list: [mockCasefile] };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
