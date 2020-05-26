const request = require('supertest');
const app = require('../src/app');
const Consultation = require('../src/models/consultation.model');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { setupAuth, getMockConsultation } = require('./mocks');

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

const server = request(app);
let mongoServer;
let tokenString;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {}, (err) => {
    if (err) console.error(err);
  });

  tokenString = 'Bearer ' + (await setupAuth(server));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Consultation Router', () => {
  const consultation = getMockConsultation();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('post endpoint', () => {
    it('should return 201', async () => {
      const res = await server.post('/consultations').set('Authorization', tokenString).send(consultation);

      expect(res.statusCode).toBe(201);
    });

    it('should return the correct data', async () => {
      const res = await server.post('/consultations').set('Authorization', tokenString).send(consultation);
      const { id } = res.body;

      expect(res.body).toEqual({ ...consultation, id });
    });

    it('should return 400 when not valid', async () => {
      const res = await server.post('/consultations').set('Authorization', tokenString).send({});

      expect(res.statusCode).toBe(400);
    });
  });

  describe('get endpoint', () => {
    it('should return 200', async () => {
      const newConsultation = new Consultation(consultation);
      await newConsultation.save();
      const res = await server.get(`/consultations/${newConsultation.id}`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const newConsultation = new Consultation(consultation);
      await newConsultation.save();

      const res = await server.get(`/consultations/${newConsultation.id}`).set('Authorization', tokenString);
      const { id } = res.body;

      expect(res.body).toEqual({ ...consultation, id, practitioner: null });
    });

    it('should return 404 if not found', async () => {
      const res = await server.get(`/consultations/5eba8469b88f212f1012c357`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('patch endpoint', () => {
    it('should return 200', async () => {
      const savedConsultation = new Consultation(consultation);
      await savedConsultation.save();
      const patchedData = { treatments: 'some diff exercise' };
      const res = await server
        .patch(`/consultations/${savedConsultation.id}`)
        .set('Authorization', tokenString)
        .send(patchedData);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const savedConsultation = new Consultation(consultation);
      await savedConsultation.save();
      const patchedData = { treatments: 'some diff exercise' };

      const res = await server
        .patch(`/consultations/${savedConsultation.id}`)
        .set('Authorization', tokenString)
        .send(patchedData);
      const { id } = res.body;

      expect(res.body).toEqual({ ...consultation, id, treatments: patchedData.treatments });
    });

    it('should return 400 if invalid property', async () => {
      const res = await server.patch(`/consultations/1`).set('Authorization', tokenString).send({ fakeProp: 'test' });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('delete endpoint', () => {
    it('should return 200', async () => {
      const savedConsultation = new Consultation(consultation);
      await savedConsultation.save();
      const res = await server.delete(`/consultations/${savedConsultation.id}`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(200);
    });

    it('should return 404 if no existing consultation', async () => {
      const res = await server.delete(`/consultations/5eba8469b88f212f1012c357`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(404);
    });
  });
});
