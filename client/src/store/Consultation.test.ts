import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ConsultationStore from './Consultation';
import { consultationService } from '../api/consultationService';
import { IGetConsultationVm } from 'src/api/generated';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Consultation Redux Store', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {
    consultation: {
      ...ConsultationStore.unloadedState
    }
  }
  const mockConsultation = getReturnedConsultation();
  let store;
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    store = mockStore(initialState);
    mockAxios.onGet("/api/consultations/123").reply(200, mockConsultation);
  })

  afterEach(() => {
    mockAxios.restore();
  })

  describe('getConsult', () => {
    it('should dispatch a get consult request', async () => {
      // Use jest to create spies for the dispatch and getState parameter functions
      const dispatch = jest.fn();
      const getState = jest.fn();
      await ConsultationStore.actionCreators.getConsult(1)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(ConsultationStore.getConsultRequest())
    })

    it('should dispatch a get consult success', async () => {
      const spy = jest.spyOn(consultationService, 'getConsultation');
      spy.mockReturnValue(Promise.resolve(mockConsultation));

      const dispatch = jest.fn();
      await ConsultationStore.actionCreators.getConsult(123)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenLastCalledWith(await ConsultationStore.getConsultSuccess(123))
      
      spy.mockRestore();
    })

    it('should dispatch a get consult failure when error occurs', async () => {
      const spy = jest.spyOn(consultationService, 'getConsultation');
      spy.mockReturnValue(Promise.reject());

      const dispatch = jest.fn();
      await ConsultationStore.actionCreators.getConsult(123)(dispatch, jest.fn());

      expect(dispatch).toHaveBeenLastCalledWith(ConsultationStore.getConsultFailure())
      
      spy.mockRestore();
    })
  })
  
})

function getReturnedConsultation(): IGetConsultationVm {
  return {
    ...ConsultationStore.unloadedState,
    id: 123,
    practitioner: {
      id: 0,
      firstName: "",
      lastName: "",
      jobLevel: ""
    },
    objectiveAssessment: {
      id: 0,
      consultationId: 0,
      observation: "",
      active: "",
      passive: "",
      resistedIsometric: "",
      functionalTests: "",
      neurologicalTests: "",
      specialTests: "",
      palpation: "",
      additional: ""
    },
    subjectiveAssessment: {
      id: 1,
      consultationId: 1,
      moi: "",
      currentHistory: "",
      bodyChart: "",
      aggravatingFactors: "",
      easingFactors: "",
      vas: 7,
      pastHistory: "",
      socialHistory: "",
      imaging: "",
      generalHealth: "",
    }
  }
}