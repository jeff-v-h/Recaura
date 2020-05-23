import { Consultation } from '../../src/models/consultationModels';
import thunk from 'redux-thunk';
import { ApplicationState } from '../../src/stores/index';
import configureStore, { MockStore } from 'redux-mock-store';

export const generateMockStore = (
  state: ApplicationState | {}
): MockStore<ApplicationState | {}> => {
  const mockStore = configureStore([thunk]);
  const store = mockStore(state) as MockStore<ApplicationState | {}>;

  store.clearActions();
  return store;
};

export const mockConsult: Consultation = {
  id: '123',
  patientId: '',
  casefileId: '',
  practitionerId: '',
  date: '',
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
  },
  treatments: '',
  plans: ''
};
