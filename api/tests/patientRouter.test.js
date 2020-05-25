const request = require('supertest');
const app = require('../src/app');
const Patient = require('../src/models/patient.model');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { getMockPractitioner } = require('./mocks');

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
let tokenString;
const server = request(app);

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {}, (err) => {
    if (err) console.error(err);
  });

  // Create user, login and set the auth token string
  const practitioner = getMockPractitioner(2);
  const { email, password } = practitioner;
  await practitioner.save();
  const response = await server.post('/practitioners/login').send({ email, password });
  tokenString = 'Bearer ' + response.body.token;
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
    occupation: 'designer',
    clinicId: '5ecb1231f595f456542b4af6'
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('post endpoint', () => {
    it('should return 201', async () => {
      const res = await server.post('/patients').set('Authorization', tokenString).send(patient);

      expect(res.statusCode).toBe(201);
    });

    it('should return the correct data', async () => {
      // jest.spyOn(Patient.prototype, 'save').mockImplementationOnce(() => Promise.resolve(patient));
      const res = await server.post('/patients').set('Authorization', tokenString).send(patient);

      expect(res.body).toEqual({ ...patient, id: res.body.id, updatedAt: res.body.updatedAt });
    });

    it('should return 400 when not valid', async () => {
      const res = await server.post('/patients').set('Authorization', tokenString).send({});

      expect(res.statusCode).toBe(400);
    });
  });

  describe('get endpoint', () => {
    it('should return 200', async () => {
      const savedPatient = new Patient(patient);
      await savedPatient.save();
      const res = await server.get(`/patients/${savedPatient.id}`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const newPatient = new Patient(patient);
      await newPatient.save();

      const res = await server.get(`/patients/${newPatient.id}`).set('Authorization', tokenString);
      const { id, updatedAt } = res.body;

      expect(res.body).toEqual({ ...patient, id, updatedAt });
    });

    it('should return 404 if not found', async () => {
      const res = await server.get(`/patients/5eba8469b88f212f1012c357`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('patch endpoint', () => {
    it('should return 200', async () => {
      const savedPatient = new Patient(patient);
      await savedPatient.save();
      const patchedData = { firstName: 'new name' };
      const res = await server
        .patch(`/patients/${savedPatient.id}`)
        .set('Authorization', tokenString)
        .send(patchedData);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const savedPatient = new Patient(patient);
      await savedPatient.save();
      const patchedData = { firstName: 'new name' };

      const res = await server
        .patch(`/patients/${savedPatient.id}`)
        .set('Authorization', tokenString)
        .send(patchedData);
      const { id, updatedAt } = res.body;

      expect(res.body).toEqual({ ...patient, id, updatedAt, firstName: patchedData.firstName });
    });

    it('should return 400 if invalid property', async () => {
      const res = await server.patch(`/patients/1`).set('Authorization', tokenString).send({ fakeProp: 'test' });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('delete endpoint', () => {
    it('should return 200', async () => {
      const savedPatient = new Patient(patient);
      await savedPatient.save();
      const res = await server.delete(`/patients/${savedPatient.id}`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(200);
    });

    it('should return 404 if no existing patient', async () => {
      const res = await server.delete(`/patients/5eba8469b88f212f1012c357`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(404);
    });
  });
});
