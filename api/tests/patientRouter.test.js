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

describe('Patient Endpoints', () => {
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

  it('should return 201', async () => {
    const res = await request(app).post('/patients').send(patient);

    expect(res.statusCode).toBe(201);
  });

  it('should return the correct data', async () => {
    // jest.spyOn(Patient.prototype, 'save').mockImplementationOnce(() => Promise.resolve(patient));
    const res = await request(app).post('/patients').send(patient);

    expect(res.body).toEqual({ ...patient, id: res.body.id, updatedAt: res.body.updatedAt });
  });
});
