import React from 'react';
import Subjective from './Subjective';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import * as ConsultationStore from "../../store/Consultation";
import { generateMockStore } from "../../../__tests__/setup/mockStore";
import { MockStore } from "redux-mock-store";

describe('<Subjective />', () => {
  let component: JSX.Element;
  let wrapper: ShallowWrapper;
  let mountWrapper: ReactWrapper;
  
  const mockState = {
    consultation: {
      ...ConsultationStore.unloadedState,
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
  let store: MockStore;

  describe('as a component', () => {
    beforeEach(() => {
      store = generateMockStore(mockState);
      const props = {
        consultId: '1',
        ...mockState.consultation,
        ...ConsultationStore.actionCreators
      }
      wrapper = shallow(<Subjective {...props} />);
    })

    it("should render without error", () =>
      expect(wrapper.length).toBe(1));
  });

  describe('when mounted', () => {
    beforeEach(async () => {
      store = generateMockStore(mockState);
      component = <MemoryRouter><Subjective consultId={'1'} /></MemoryRouter>;
      mountWrapper = mount(<Provider store={store}>{component}</Provider>);
    })

    afterEach(() => {
      mountWrapper.unmount();
    })

    it('should have at least one button when subjectiveAssessment is available', () => {
      expect(mountWrapper.find('button').exists()).toBe(true);
    });

    // it('should have a form', () => {
    //   expect(wrapper.find('form').exists()).toBe(true);
    // });
  })
})