import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { unloadedState } from './consultationReducer';
import * as consultActions from './consultationActions';
import consultationService from '../../services/consultationService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { C } from './consultationTypes';
import { mockConsult } from '../../../__tests__/setup/reduxMock';

describe('Consultation Redux Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {
    consultation: {
      ...unloadedState
    }
  };
  let store: any;
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('createConsult', () => {
    beforeEach(() => {
      mockAxios.onPost('/api/consultations/123').reply(201, mockConsult);
    });

    it(`creates ${C.CREATE_CONSULTATION_SUCCESS} when successsfully completed`, async () => {
      const spy = jest.spyOn(consultationService, 'createConsultation');
      spy.mockReturnValue(Promise.resolve(mockConsult));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.CREATE_CONSULTATION_REQUEST },
        { type: C.CREATE_CONSULTATION_SUCCESS, payload: mockConsult }
      ];

      await consultActions.createConsult(mockConsult)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`creates ${C.CREATE_CONSULTATION_FAILURE} when it fails`, async () => {
      const spy = jest.spyOn(consultationService, 'createConsultation');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.CREATE_CONSULTATION_FAILURE };

      await consultActions.createConsult(mockConsult)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });

  describe('getConsult', () => {
    it('should dispatch a get consult success', async () => {
      mockAxios.onGet('/api/consultations/123').reply(200, mockConsult);
      const spy = jest.spyOn(consultationService, 'getConsultation');
      spy.mockReturnValue(Promise.resolve(mockConsult));

      const dispatch = jest.fn();
      await consultActions.getConsult('123')(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(consultActions.getConsultRequest());
      expect(dispatch).toHaveBeenLastCalledWith(consultActions.getConsultSuccess(mockConsult));

      spy.mockRestore();
    });

    it('should dispatch a get consult failure when error occurs', async () => {
      mockAxios.onGet('/api/consultations/123').reply(500);
      const spy = jest.spyOn(consultationService, 'getConsultation');
      spy.mockReturnValue(Promise.reject());

      const dispatch = jest.fn();
      await consultActions.getConsult('123')(dispatch, jest.fn());

      expect(dispatch).toHaveBeenLastCalledWith(consultActions.getConsultFailure());

      spy.mockRestore();
    });
  });

  describe('updateConsult', () => {
    const updatedConsult = { ...mockConsult, treatments: 'exercise', plans: 'new plans' };

    it(`creates ${C.UPDATE_CONSULTATION_SUCCESS} when update completed`, async () => {
      mockAxios.onPatch('/api/consultations/123').reply(200, updatedConsult);
      const spy = jest.spyOn(consultationService, 'updateConsultation');
      spy.mockReturnValue(Promise.resolve(updatedConsult));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.UPDATE_CONSULTATION_REQUEST },
        { type: C.UPDATE_CONSULTATION_SUCCESS, payload: updatedConsult }
      ];

      await consultActions.updateConsult(updatedConsult.id, updatedConsult)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`creates ${C.UPDATE_CONSULTATION_FAILURE} when it fails`, async () => {
      mockAxios.onPatch('/api/consultations/123').reply(500);
      const spy = jest.spyOn(consultationService, 'updateConsultation');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.UPDATE_CONSULTATION_FAILURE };

      await consultActions.updateConsult('1', updatedConsult)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });

  describe('deleteConsult', () => {
    it(`creates ${C.DELETE_CONSULTATION_SUCCESS} when delete completed`, async () => {
      mockAxios.onDelete('/api/consultations/123').reply(200, mockConsult);
      const spy = jest.spyOn(consultationService, 'deleteConsultation');
      spy.mockReturnValue(Promise.resolve(mockConsult));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.DELETE_CONSULTATION_REQUEST },
        { type: C.DELETE_CONSULTATION_SUCCESS, payload: mockConsult.id }
      ];

      await consultActions.deleteConsult(mockConsult.id)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`creates ${C.DELETE_CONSULTATION_FAILURE} when it fails`, async () => {
      mockAxios.onDelete('/api/consultations/123').reply(500);
      const spy = jest.spyOn(consultationService, 'deleteConsultation');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.DELETE_CONSULTATION_FAILURE };

      await consultActions.deleteConsult(mockConsult.id)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });
});
