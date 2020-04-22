import React from 'react';
import Subjective from './Subjective';
import { shallow, ShallowWrapper } from 'enzyme';

describe('<Subjective />', () => {
  const wrapper: ShallowWrapper<undefined, undefined> = shallow(<Subjective consultId={1} />);

  // Check that component has been rendered
  it("should render without error", () =>
    expect(wrapper.length).toBe(1));

  // it('should have a Form', () => {
  //   expect(wrapper.find('Form').exists()).toBe(true);
  // });

})