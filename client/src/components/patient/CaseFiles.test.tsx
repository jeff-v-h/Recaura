import React from 'react';
import CaseFiles from './CaseFiles';
import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import { PatientCasefile } from 'src/models/patientModels';
import { MemoryRouter } from 'react-router';

describe('<CaseFiles/>', () => {
  const files: PatientCasefile[] = [
    {
      id: '1',
      name: 'An injury'
    },
    {
      id: '2',
      name: 'another injury'
    }
  ];
  let wrapper: ShallowWrapper;
  let mountedWrapper: ReactWrapper;

  beforeAll(() => {
    const component = <CaseFiles files={files} />;
    wrapper = shallow(component);
    mountedWrapper = mount(<MemoryRouter>{component}</MemoryRouter>);
  });

  afterAll(() => {
    mountedWrapper.unmount();
  });

  it('should have a header', () => {
    expect(wrapper.find('h3').exists()).toBe(true);
  });

  describe('when mounted', () => {
    it('should not have a list item when no files exist', () => {
      const noFilesWrapper = mount(
        <MemoryRouter>
          <CaseFiles files={[]} />
        </MemoryRouter>
      );

      expect(noFilesWrapper.find('Item').exists()).toBe(false);
      noFilesWrapper.unmount();
    });

    it('should have a list when files exist', () => {
      expect(mountedWrapper.find('List').exists()).toBe(true);
    });

    it('should have the same number of items for each file from props', () => {
      expect(mountedWrapper.find('Item').length).toBe(files.length);
    });
  });
});
