import React from 'react';
import Subjective from './Subjective';
import { shallow, ShallowWrapper} from 'enzyme';

describe('<Subjective />', () => {
  const wrapper: ShallowWrapper = shallow(<Subjective consultId={1} />);

  it("should render without error", () =>
    expect(wrapper.length).toBe(1));
})