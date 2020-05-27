import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { unloadedState } from './patientReducer';
import * as patientActions from './patientActions';
import patientService from '../../services/patientsService';
import cookieService from '../../services/cookieService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { C } from './patientTypes';
import { mockPatient } from '../../../__tests__/setup/reduxMock';

describe('Patient Redux Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {
    patient: {
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

  describe('createPatient', () => {
    it(`should dispatch ${C.CREATE_PATIENT_SUCCESS} when completed`, async () => {
      mockAxios.onPost('/api/patients/123').reply(201, mockPatient);
      const spy = jest.spyOn(patientService, 'createPatient');
      spy.mockReturnValue(Promise.resolve(mockPatient));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.CREATE_PATIENT_REQUEST },
        { type: C.CREATE_PATIENT_SUCCESS, payload: mockPatient }
      ];

      await patientActions.createPatient(mockPatient)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`should dispatch ${C.CREATE_PATIENT_FAILURE} when it fails`, async () => {
      mockAxios.onPost('/api/patients/123').reply(500);
      const spy = jest.spyOn(patientService, 'createPatient');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.CREATE_PATIENT_FAILURE };

      await patientActions.createPatient(mockPatient)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });

  describe('getPatient', () => {
    it(`should dispatch ${C.GET_PATIENT_SUCCESS} when completed`, async () => {
      mockAxios.onGet('/api/patients/999').reply(200, mockPatient);
      const spy = jest.spyOn(patientService, 'getPatient');
      spy.mockReturnValue(Promise.resolve(mockPatient));

      const dispatch = jest.fn();
      await patientActions.getPatient('999')(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith({ type: C.GET_PATIENT_REQUEST });
      expect(dispatch).toHaveBeenLastCalledWith({
        type: C.GET_PATIENT_SUCCESS,
        payload: mockPatient
      });

      spy.mockRestore();
    });

    it(`should dispatch ${C.GET_PATIENT_FAILURE} when error occurs`, async () => {
      mockAxios.onGet('/api/patients/123').reply(500);
      const spy = jest.spyOn(patientService, 'getPatient');
      spy.mockReturnValue(Promise.reject());

      const dispatch = jest.fn();
      await patientActions.getPatient('123')(dispatch, jest.fn());

      expect(dispatch).toHaveBeenLastCalledWith({ type: C.GET_PATIENT_FAILURE });

      spy.mockRestore();
    });
  });

  describe('updatePatient', () => {
    const updatedPatient = { ...mockPatient, treatments: 'exercise', plans: 'new plans' };

    it(`should dispatch ${C.UPDATE_PATIENT_SUCCESS} when update completed`, async () => {
      mockAxios.onPatch('/api/patients/123').reply(200, updatedPatient);
      const spy = jest.spyOn(patientService, 'updatePatient');
      spy.mockReturnValue(Promise.resolve(updatedPatient));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.UPDATE_PATIENT_REQUEST },
        { type: C.UPDATE_PATIENT_SUCCESS, payload: updatedPatient }
      ];

      await patientActions.updatePatient(updatedPatient.id, updatedPatient)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`should dispatch ${C.UPDATE_PATIENT_FAILURE} when it fails`, async () => {
      mockAxios.onPatch('/api/patients/123').reply(500);
      const spy = jest.spyOn(patientService, 'updatePatient');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.UPDATE_PATIENT_FAILURE };

      await patientActions.updatePatient('1', updatedPatient)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });

  describe('deletePatient', () => {
    it(`should dispatch ${C.DELETE_PATIENT_SUCCESS} when delete completed`, async () => {
      mockAxios.onDelete('/api/patients/123').reply(200, mockPatient);
      const spy = jest.spyOn(patientService, 'deletePatient');
      spy.mockReturnValue(Promise.resolve(mockPatient));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.DELETE_PATIENT_REQUEST },
        { type: C.DELETE_PATIENT_SUCCESS, payload: mockPatient.id }
      ];

      await patientActions.deletePatient(mockPatient.id)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`should dispatch ${C.DELETE_PATIENT_FAILURE} when it fails`, async () => {
      mockAxios.onDelete('/api/patients/123').reply(500);
      const spy = jest.spyOn(patientService, 'deletePatient');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.DELETE_PATIENT_FAILURE };

      await patientActions.deletePatient(mockPatient.id)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });
});
