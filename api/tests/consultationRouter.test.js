const request = require('supertest');
const app = require('../src/app');
const Consultation = require('../src/models/consultation.model');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {}, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Consultation Router', () => {
  const consultation = {
    patientId: '5ebf23451164b9832416419a',
    casefileId: '5ebf23971164b9832416419b',
    date: '2020-04-23T10:53:54.347Z',
    practitionerId: '5ebf24321164b9832416419c',
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('post endpoint', () => {
    it('should return 201', async () => {
      const res = await request(app).post('/consultations').send(consultation);

      expect(res.statusCode).toBe(201);
    });

    it('should return the correct data', async () => {
      const res = await request(app).post('/consultations').send(consultation);
      const { id } = res.body;

      expect(res.body).toEqual({ ...consultation, id });
    });

    it('should return 400 when not valid', async () => {
      const res = await request(app).post('/consultations').send({});

      expect(res.statusCode).toBe(400);
    });
  });

  describe('get endpoint', () => {
    it('should return 200', async () => {
      const newConsultation = new Consultation(consultation);
      await newConsultation.save();
      const res = await request(app).get(`/consultations/${newConsultation.id}`);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const newConsultation = new Consultation(consultation);
      await newConsultation.save();

      const res = await request(app).get(`/consultations/${newConsultation.id}`);
      const { id } = res.body;

      expect(res.body).toEqual({ ...consultation, id, practitioner: null });
    });

    it('should return 404 if not found', async () => {
      const res = await request(app).get(`/consultations/5eba8469b88f212f1012c357`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('patch endpoint', () => {
    it('should return 200', async () => {
      const savedConsultation = new Consultation(consultation);
      await savedConsultation.save();
      const patchedData = { treatments: 'some diff exercise' };
      const res = await request(app).patch(`/consultations/${savedConsultation.id}`).send(patchedData);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const savedConsultation = new Consultation(consultation);
      await savedConsultation.save();
      const patchedData = { treatments: 'some diff exercise' };

      const res = await request(app).patch(`/consultations/${savedConsultation.id}`).send(patchedData);
      const { id } = res.body;

      expect(res.body).toEqual({ ...consultation, id, treatments: patchedData.treatments });
    });

    it('should return 400 if invalid property', async () => {
      const res = await request(app).patch(`/consultations/1`).send({ fakeProp: 'test' });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('delete endpoint', () => {
    it('should return 200', async () => {
      const savedConsultation = new Consultation(consultation);
      await savedConsultation.save();
      const res = await request(app).delete(`/consultations/${savedConsultation.id}`);

      expect(res.statusCode).toBe(200);
    });

    it('should return 404 if no existing consultation', async () => {
      const res = await request(app).patch(`/consultations/5eba8469b88f212f1012c357`);

      expect(res.statusCode).toBe(404);
    });
  });
});
