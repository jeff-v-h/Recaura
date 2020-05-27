import { Honorific, Gender, AccessLevel } from '../../models/enums';

export const emptyPractitioner = {
  id: '',
  honorific: Honorific.NoTitle,
  firstName: '',
  lastName: '',
  dob: '',
  email: '',
  countryCode: '',
  homePhone: '',
  mobilePhone: '',
  gender: Gender.other,
  profession: '',
  jobLevel: '',
  accessLevel: AccessLevel.normal,
  clinicId: ''
};
