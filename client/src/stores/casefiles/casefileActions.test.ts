import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { unloadedState } from './casefileReducer';
import * as casefileActions from './casefileActions';
import casefileService from '../../services/casefileService';
import cookieService from '../../services/cookieService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { C } from './casefileTypes';
import { mockCasefile } from '../../../__tests__/setup/reduxMock';

describe('Casefile Redux Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {
    casefile: {
      ...unloadedState
    }
  };
  let store: any;
  const mockAxios = new MockAdapter(axios);

  beforeAll(() => {
    const cookieSpy = jest.spyOn(cookieService, 'getUserToken');
    cookieSpy.mockReturnValue('faketoken');
  });

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('createCasefile', () => {
    beforeEach(() => {
      mockAxios.onPost('/api/casefiles/123').reply(201, mockCasefile);
    });

    it(`creates ${C.CREATE_CASEFILE_SUCCESS} when successsfully completed`, async () => {
      const spy = jest.spyOn(casefileService, 'createCasefile');
      spy.mockReturnValue(Promise.resolve(mockCasefile));

      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.CREATE_CASEFILE_REQUEST },
        { type: C.CREATE_CASEFILE_SUCCESS, payload: mockCasefile }
      ];

      await casefileActions.createCasefile(mockCasefile)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`creates ${C.CREATE_CASEFILE_FAILURE} when it fails`, async () => {
      const spy = jest.spyOn(casefileService, 'createCasefile');
      spy.mockReturnValue(Promise.reject());

      const dispatch = jest.fn();
      const expectedAction = { type: C.CREATE_CASEFILE_FAILURE };

      await casefileActions.createCasefile(mockCasefile)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });

  describe('getCasefile', () => {
    it('should dispatch a get consult success', async () => {
      mockAxios.onGet('/api/casefiles/123').reply(200, mockCasefile);
      const spy = jest.spyOn(casefileService, 'getCasefile');
      spy.mockReturnValue(Promise.resolve(mockCasefile));

      const dispatch = jest.fn();
      await casefileActions.getCasefile('123')(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith({ type: C.GET_CASEFILE_REQUEST });
      expect(dispatch).toHaveBeenLastCalledWith({
        type: C.GET_CASEFILE_SUCCESS,
        payload: mockCasefile
      });

      spy.mockRestore();
    });

    it('should dispatch a get consult failure when error occurs', async () => {
      mockAxios.onGet('/api/casefiles/123').reply(500);
      const spy = jest.spyOn(casefileService, 'getCasefile');
      spy.mockReturnValue(Promise.reject());

      const dispatch = jest.fn();
      await casefileActions.getCasefile('123')(dispatch, jest.fn());

      expect(dispatch).toHaveBeenLastCalledWith({ type: C.GET_CASEFILE_FAILURE });

      spy.mockRestore();
    });
  });

  describe('updateCasefile', () => {
    const updatedCasefile = { ...mockCasefile, treatments: 'exercise', plans: 'new plans' };

    it(`creates ${C.UPDATE_CASEFILE_SUCCESS} when update completed`, async () => {
      mockAxios.onPatch('/api/casefiles/123').reply(200, updatedCasefile);
      const spy = jest.spyOn(casefileService, 'updateCasefile');
      spy.mockReturnValue(Promise.resolve(updatedCasefile));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.UPDATE_CASEFILE_REQUEST },
        { type: C.UPDATE_CASEFILE_SUCCESS, payload: updatedCasefile }
      ];

      await casefileActions.updateCasefile(updatedCasefile.id, updatedCasefile)(
        dispatch,
        jest.fn()
      );

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`creates ${C.UPDATE_CASEFILE_FAILURE} when it fails`, async () => {
      mockAxios.onPatch('/api/casefiles/123').reply(500);
      const spy = jest.spyOn(casefileService, 'updateCasefile');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.UPDATE_CASEFILE_FAILURE };

      await casefileActions.updateCasefile('1', updatedCasefile)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });

  describe('deleteCasefile', () => {
    it(`creates ${C.DELETE_CASEFILE_SUCCESS} when delete completed`, async () => {
      mockAxios.onDelete('/api/casefiles/123').reply(200, mockCasefile);
      const spy = jest.spyOn(casefileService, 'deleteCasefile');
      spy.mockReturnValue(Promise.resolve(mockCasefile));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.DELETE_CASEFILE_REQUEST },
        { type: C.DELETE_CASEFILE_SUCCESS, payload: mockCasefile.id }
      ];

      await casefileActions.deleteCasefile(mockCasefile.id)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`creates ${C.DELETE_CASEFILE_FAILURE} when it fails`, async () => {
      mockAxios.onDelete('/api/casefiles/123').reply(500);
      const spy = jest.spyOn(casefileService, 'deleteCasefile');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.DELETE_CASEFILE_FAILURE };

      await casefileActions.deleteCasefile(mockCasefile.id)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });
});
