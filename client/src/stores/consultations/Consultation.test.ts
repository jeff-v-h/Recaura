import { AppThunkAction } from './../index';
import configureStore, { MockStoreEnhanced, MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { unloadedState } from './consultationReducer';
import * as consultActions from './consultationActions';
import consultationService from '../../services/consultationService';
import { Consultation } from '../../models/consultationModels';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { C } from './consultationTypes';
import { AnyAction } from 'redux';

describe('Consultation Redux Store', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {
    consultation: {
      ...unloadedState
    }
  };
  const mockConsultation = getMockConsultation();
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
      mockAxios.onPost('/api/consultations/123').reply(201, mockConsultation);
    });

    it(`creates ${C.CREATE_CONSULTATION_SUCCESS} when successsfully completed`, async () => {
      const spy = jest.spyOn(consultationService, 'createConsultation');
      spy.mockReturnValue(Promise.resolve(mockConsultation));
      const dispatch = jest.fn();
      const expectedActions = [
        { type: C.CREATE_CONSULTATION_REQUEST },
        { type: C.CREATE_CONSULTATION_SUCCESS, payload: mockConsultation }
      ];

      await consultActions.createConsult(mockConsultation)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
      expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);

      spy.mockRestore();
    });

    it(`creates ${C.CREATE_CONSULTATION_FAILURE} when it fails`, async () => {
      const spy = jest.spyOn(consultationService, 'createConsultation');
      spy.mockReturnValue(Promise.reject());
      const dispatch = jest.fn();
      const expectedAction = { type: C.CREATE_CONSULTATION_FAILURE };

      await consultActions.createConsult(mockConsultation)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenCalledWith(expectedAction);

      spy.mockRestore();
    });
  });

  describe('getConsult', () => {
    beforeEach(() => {
      mockAxios.onGet('/api/consultations/123').reply(200, mockConsultation);
    });

    it('should dispatch a get consult request', async () => {
      // Use jest to create spies for the dispatch and getState parameter functions
      const dispatch = jest.fn();
      const getState = jest.fn();
      await consultActions.getConsult('1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(consultActions.getConsultRequest());
    });

    it('should dispatch a get consult success', async () => {
      const spy = jest.spyOn(consultationService, 'getConsultation');
      spy.mockReturnValue(Promise.resolve(mockConsultation));

      const dispatch = jest.fn();
      await consultActions.getConsult('123')(dispatch, jest.fn());

      expect(dispatch).toHaveBeenLastCalledWith(await consultActions.getConsultSuccess('123'));

      spy.mockRestore();
    });

    it('should dispatch a get consult failure when error occurs', async () => {
      const spy = jest.spyOn(consultationService, 'getConsultation');
      spy.mockReturnValue(Promise.reject());

      const dispatch = jest.fn();
      await consultActions.getConsult('123')(dispatch, jest.fn());

      expect(dispatch).toHaveBeenLastCalledWith(consultActions.getConsultFailure());

      spy.mockRestore();
    });
  });
});

function getMockConsultation(): Consultation {
  return {
    ...unloadedState,
    id: '123',
    practitioner: {
      id: '0',
      firstName: '',
      lastName: ''
    },
    objectiveAssessment: {
      observation: '',
      active: '',
      passive: '',
      resistedIsometric: '',
      functionalTests: '',
      neurologicalTests: '',
      specialTests: '',
      palpation: '',
      additional: ''
    },
    subjectiveAssessment: {
      moi: '',
      currentHistory: '',
      bodyChart: '',
      aggravatingFactors: '',
      easingFactors: '',
      vas: 7,
      pastHistory: '',
      socialHistory: '',
      imaging: '',
      generalHealth: ''
    }
  };
}
