import React from 'react';
import CaseFiles from './CaseFiles';
import { mount, shallow } from 'enzyme';
import { IPatientCaseFileVm } from 'src/api/generated';
import { MemoryRouter } from 'react-router';

const files: IPatientCaseFileVm[] = [
  {
    id: 1,
    name: "An injury"
  },
  {
    id: 2,
    name: "another injury"
  }
]
const component = <CaseFiles files={files} />;
const wrapper = shallow(component);
const mountedWrapper = mount(<MemoryRouter>{component}</MemoryRouter>);

afterAll(() => {
  mountedWrapper.unmount();
})

describe('<CaseFiles/>', () => {
  it('should have a header', () => {
    expect(wrapper.find('h3').exists()).toBe(true);
  });

  describe('when mounted', () => {
    it('should not have a list item when no files exist', () => {
      const noFilesWrapper = mount(<MemoryRouter><CaseFiles files={[]} /></MemoryRouter>);
  
      expect(noFilesWrapper.find('Item').exists()).toBe(false);
      noFilesWrapper.unmount();
    });

    it('should have a list when files exist', () => {
      expect(mountedWrapper.find('List').exists()).toBe(true);
    });

    it('should have the same number of items for each file from props', () => {
      expect(mountedWrapper.find('Item').length).toBe(files.length);
    });
  })
});
