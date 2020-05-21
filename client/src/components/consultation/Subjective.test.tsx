import React from 'react';
import Subjective from './Subjective';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import * as consultActions from '../../stores/consultations/consultationActions';
import { ConsultationState } from '../../stores/consultations/consultationTypes';
import { unloadedState } from '../../stores/consultations/consultationReducer';
import { generateMockStore } from '../../../__tests__/setup/mockStore';
import { MockStore } from 'redux-mock-store';

describe('<SubjectiveForm />', () => {
  let component: JSX.Element;
  let wrapper: ShallowWrapper;
  let mountWrapper: ReactWrapper;

  const mockState = {
    consultation: {
      ...unloadedState,
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
    }
  };
  let store: MockStore;

  describe('as a component', () => {
    beforeEach(() => {
      store = generateMockStore(mockState);
      const props = {
        consultId: '1',
        ...mockState.consultation,
        ...consultActions
      };
      wrapper = shallow(<Subjective {...props} />);
    });

    it('should render without error', () => expect(wrapper.length).toBe(1));
  });

  describe('when mounted', () => {
    beforeEach(async () => {
      store = generateMockStore(mockState);
      component = (
        <MemoryRouter>
          <Subjective consultId={'1'} />
        </MemoryRouter>
      );
      mountWrapper = mount(<Provider store={store}>{component}</Provider>);
    });

    afterEach(() => {
      mountWrapper.unmount();
    });

    it('should have at least one button when subjectiveAssessment is available', () => {
      expect(mountWrapper.find('button').exists()).toBe(true);
    });

    // it('should have a form', () => {
    //   expect(wrapper.find('form').exists()).toBe(true);
    // });
  });
});
