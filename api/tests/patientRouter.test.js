const request = require('supertest');
const app = require('../src/app');
const Patient = require('../src/models/patient.model');
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

describe('Patient Router', () => {
  const patient = {
    honorific: 'Miss',
    firstName: 'Jane',
    lastName: 'Smith',
    dob: '1985-11-01T00:00:00.000Z',
    email: 'jane@example.com',
    countryCode: 'AU',
    homePhone: '98765432',
    mobilePhone: '0424333555',
    gender: 'female',
    occupation: 'designer'
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('post endpoint', () => {
    it('should return 201', async () => {
      const res = await request(app).post('/patients').send(patient);

      expect(res.statusCode).toBe(201);
    });

    it('should return the correct data', async () => {
      // jest.spyOn(Patient.prototype, 'save').mockImplementationOnce(() => Promise.resolve(patient));
      const res = await request(app).post('/patients').send(patient);

      expect(res.body).toEqual({ ...patient, id: res.body.id, updatedAt: res.body.updatedAt });
    });

    it('should return 400 when not valid', async () => {
      const res = await request(app).post('/patients').send({});

      expect(res.statusCode).toBe(400);
    });
  });

  describe('get endpoint', () => {
    it('should return 200', async () => {
      const res = await request(app).get('/patients').send(patient);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const newPatient = new Patient(patient);
      await newPatient.save();

      const res = await request(app).get(`/patients/${newPatient.id}`);
      const { id, updatedAt } = res.body;

      expect(res.body).toEqual({ ...patient, id, updatedAt });
    });

    it('should return 404 if not found', async () => {
      const res = await request(app).get(`/patients/5eba8469b88f212f1012c357`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('patch endpoint', () => {
    it('should return 200', async () => {
      const savedPatient = new Patient(patient);
      await savedPatient.save();
      const patchedData = { firstName: 'new name' };
      const res = await request(app).patch(`/patients/${savedPatient.id}`).send(patchedData);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const savedPatient = new Patient(patient);
      await savedPatient.save();
      const patchedData = { firstName: 'new name' };

      const res = await request(app).patch(`/patients/${savedPatient.id}`).send(patchedData);
      const { id, updatedAt } = res.body;

      expect(res.body).toEqual({ ...patient, id, updatedAt, firstName: patchedData.firstName });
    });

    it('should return 400 if invalid property', async () => {
      const res = await request(app).patch(`/patients/1`).send({ fakeProp: 'test' });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('delete endpoint', () => {
    it('should return 200', async () => {
      const savedPatient = new Patient(patient);
      await savedPatient.save();
      const res = await request(app).delete(`/patients/${savedPatient.id}`);

      expect(res.statusCode).toBe(200);
    });

    it('should return 404 if no existing patient', async () => {
      const res = await request(app).patch(`/patients/5eba8469b88f212f1012c357`);

      expect(res.statusCode).toBe(404);
    });
  });
});
