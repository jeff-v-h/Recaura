import React from 'react';
import Subjective from './Subjective';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as ConsultationStore from "../../store/Consultation";

describe('<Subjective />', () => {
  let component: JSX.Element;
  let wrapper: ShallowWrapper;
  let mountWrapper: ReactWrapper;
  const mockStore = configureStore([ /* middlewares */ ]);
  const initialState = {
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
  let store;

  describe('as a component', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      const props = {
        consultId: 1,
        ...initialState.consultation,
        ...ConsultationStore.actionCreators
      }
      wrapper = shallow(<Subjective {...props} />);
    })

    it("should render without error", () =>
      expect(wrapper.length).toBe(1));
  });

  describe('when mounted', () => {
    beforeAll(() => {
      store = mockStore(initialState);
      component = <MemoryRouter><Subjective consultId={1} /></MemoryRouter>;
      mountWrapper = mount(<Provider store={store}>{component}</Provider>);
    })

    afterAll(() => {
      mountWrapper.unmount();
    })

    it('should have at least one button', () => {
      expect(mountWrapper.find('button').exists()).toBe(true);
    });

    // it('should have a form', () => {
    //   expect(wrapper.find('form').exists()).toBe(true);
    // });
  })
})