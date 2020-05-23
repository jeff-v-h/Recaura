import React from 'react';
import Casefiles from './Casefiles';
import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import { Casefile } from '../../models/casefileModels';
import { MemoryRouter } from 'react-router';
import moment from 'moment';

describe('<CaseFiles/>', () => {
  const date = moment().format();
  const files: Casefile[] = [
    {
      id: '1',
      name: 'An injury',
      createdAt: date,
      patientId: '111'
    },
    {
      id: '2',
      name: 'another injury',
      createdAt: date,
      patientId: '222'
    }
  ];
  let wrapper: ShallowWrapper;
  let mountedWrapper: ReactWrapper;

  beforeAll(() => {
    const component = <Casefiles files={files} patientId="1" isFetching={false} />;
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
    it('should only display one list item to explain this to user', () => {
      const noFilesWrapper = mount(
        <MemoryRouter>
          <Casefiles files={[]} patientId="1" isFetching={false} />
        </MemoryRouter>
      );

      expect(noFilesWrapper.find('Item').length).toBe(1);
      noFilesWrapper.unmount();
    });

    it('should have the same number of items for each file from props', () => {
      expect(mountedWrapper.find('Item').length).toBe(files.length);
    });
  });
});
