import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { unloadedState } from './consultationReducer';
import * as consultActions from './consultationActions';
import consultationService from '../../services/consultationService';
import { Consultation } from '../../models/consultationModels';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Consultation Redux Store', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {
    consultation: {
      ...unloadedState
    }
  };
  const mockConsultation = getReturnedConsultation();
  let store;
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    store = mockStore(initialState);
    mockAxios.onGet('/api/consultations/123').reply(200, mockConsultation);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('getConsult', () => {
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

function getReturnedConsultation(): Consultation {
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
