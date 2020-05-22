import React from 'react';
import PatientsTable from './PatientsTable';
import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import { Patient } from '../../models/patientModels';
import { MemoryRouter } from 'react-router';
import { Honorific, Gender } from '../../models/enums';
import { RowData } from '../../components/patients/patientRowData';

describe('<PatientsTable />', () => {
  const patients: Patient[] = [
    {
      id: '111',
      honorific: Honorific.Mr,
      firstName: 'James',
      lastName: 'Bond',
      dob: '1981-01-01',
      email: 'test@example.com',
      countryCode: '+61',
      homePhone: '99998888',
      mobilePhone: '0444111222',
      gender: Gender.male,
      occupation: 'spy'
    },
    {
      id: '123',
      honorific: Honorific.Miss,
      firstName: 'Dorothy',
      lastName: 'Gale',
      dob: '1995-12-31',
      email: 'lost@oz.com',
      countryCode: '+61',
      homePhone: '99991111',
      mobilePhone: '0444111333',
      gender: Gender.female,
      occupation: 'student'
    }
  ];
  function onRowClick(patientRow: RowData) {
    return {};
  }
  let wrapper: ShallowWrapper;
  let mountedWrapper: ReactWrapper;
  let component: JSX.Element;

  beforeAll(() => {
    component = <PatientsTable patients={patients} onRowClick={onRowClick} />;
    wrapper = shallow(component);
    mountedWrapper = mount(<MemoryRouter>{component}</MemoryRouter>);
  });

  afterAll(() => {
    mountedWrapper.unmount();
  });

  describe('when mounted', () => {
    it('should have a table header', () => {
      expect(mountedWrapper.find('thead').exists()).toBe(true);
    });

    it('should only have table row for placeholder when no patients', () => {
      const noFilesWrapper = mount(
        <MemoryRouter>
          <PatientsTable patients={[]} onRowClick={onRowClick} />
        </MemoryRouter>
      );

      expect(noFilesWrapper.find('tbody').find('tr').length).toBe(1);
      noFilesWrapper.unmount();
    });

    it('should have the same number of table rows as patients', () => {
      expect(mountedWrapper.find('tbody').find('tr').length).toBe(patients.length);
    });
  });
});
