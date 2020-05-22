import React from 'react';
import PatientsPage from './PatientsPage';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import * as consultActions from '../../stores/patients/patientActions';
import { PatientState } from '../../stores/patients/patientTypes';
import { unloadedState } from '../../stores/patients/patientReducer';
import { generateMockStore } from '../../../__tests__/setup/mockStore';
import { MockStore } from 'redux-mock-store';

describe('<PatientsPage />', () => {
  let component: JSX.Element;
  let wrapper: ShallowWrapper;
  let mountWrapper: ReactWrapper;

  const mockState = {
    patient: {
      ...unloadedState
    }
  };
  let store: MockStore;

  describe('as a component', () => {
    beforeEach(() => {
      store = generateMockStore(mockState);
      // const props = {
      //   ...mockState.patient,
      //   ...consultActions
      // };
      wrapper = shallow(<PatientsPage />);
    });

    it('should render without error', () => expect(wrapper.length).toBe(1));
  });

  describe('when mounted', () => {
    beforeEach(async () => {
      store = generateMockStore(mockState);
      component = (
        <MemoryRouter>
          <PatientsPage />
        </MemoryRouter>
      );
      mountWrapper = mount(<Provider store={store}>{component}</Provider>);
    });

    afterEach(() => {
      mountWrapper.unmount();
    });

    it('should have at least a button to create a new patient', () => {
      expect(mountWrapper.find('button').exists()).toBe(true);
    });
  });
});
