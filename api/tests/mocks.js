const Practitioner = require('../src/models/practitioner.model');

function getMockPractitioner(accessLevel) {
  return new Practitioner({
    honorific: 'Mr',
    gender: 'male',
    accessLevel: 1,
    firstName: 'Physiooo',
    lastName: 'Person',
    dob: '1991-09-07T00:00:00.000Z',
    email: 'p@dev.com',
    countryCode: '+61',
    homePhone: '99991111',
    mobilePhone: '0424123456',
    profession: 'physiotherapist',
    jobLevel: 'senior',
    clinicId: '5ecb1231f595f456542b4af6',
    password: 'testpw123',
    accessLevel
  });
}

module.exports = {
  getMockPractitioner
};
