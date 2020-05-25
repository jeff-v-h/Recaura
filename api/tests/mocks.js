const Practitioner = require('../src/models/practitioner.model');

async function setupAuth(server) {
  const practitioner = getMockPractitioner(2);
  const { email, password } = practitioner;
  await practitioner.save();
  const response = await server.post('/practitioners/login').send({ email, password });
  return response.body.token;
}

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

function getMockConsultation() {
  return {
    patientId: '5ebf23451164b9832416419a',
    casefileId: '5ebf23971164b9832416419b',
    date: '2020-04-23T10:53:54.347Z',
    practitionerId: '5ebf24321164b9832416419c',
    clinicId: '5ecb1231f595f456542b4af6',
    subjectiveAssessment: {
      moi: 'going for a run and started to ache from mid run onwards when turned a corner',
      currentHistory: 'pain in left knee by about 2km in. Swollen by evening',
      bodyChart: 'www.charts.com',
      aggravatingFactors: 'stairs, long runs',
      easingFactors: 'resting, ice',
      vas: 4,
      pastHistory: 'none for left knee. rolled right ankle 6 weeks ago.',
      socialHistory: 'sit down desk job. runs 2-3x/week',
      imaging: 'nil for knee',
      generalHealth: 'healthy'
    },
    objectiveAssessment: {
      observation: 'L knee swollen. walks with slight limp.',
      active: '-20 deg L knee flex, -10 deg knee ext',
      passive: '-10 deg L knee flex, -5 deg knee ext',
      resistedIsometric: 'L knee ext 4+/5. flex 4+/5',
      functionalTests: 'compensatory step ups',
      neurologicalTests: 'nil',
      specialTests: 'McMurrays +ve. Lachmans -ve. MCL, LCL stress -ve, patella compress +ve',
      palpation: 'tender joint lines. slightly more lateral side',
      additional: ''
    },
    treatments:
      'patella mobs, exercises - VMO quad contractions 3x8, side lying glut med leg raises 3x8, prone glut ext 3x8, ice with I/T compression 5mins 30on:15off, home exercise program, advice',
    plans: 'rv within 5 days'
  };
}

module.exports = {
  getMockPractitioner,
  setupAuth,
  getMockConsultation
};
