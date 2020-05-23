import { Casefile } from 'src/models/casefileModels';
import { Honorific, Gender } from '../../src/models/enums';
import { Patient } from '../../src/models/patientModels';
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

export const mockPatient: Patient = {
  id: '999',
  honorific: Honorific.Mr,
  firstName: 'Jack',
  lastName: 'Bauer',
  dob: '1970-05-05',
  email: 'fake@email.com',
  countryCode: '+61',
  homePhone: '90001111',
  mobilePhone: '0411222333',
  gender: Gender.male,
  occupation: 'developer'
};

export const mockCasefile: Casefile = {
  id: '555',
  name: 'injury',
  patientId: '',
  createdAt: ''
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
