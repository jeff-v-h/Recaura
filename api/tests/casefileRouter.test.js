const request = require('supertest');
const app = require('../src/app');
const Casefile = require('../src/models/casefile.model');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { setupAuth } = require('./mocks');

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

  // Create user, login and get the auth token string
  tokenString = 'Bearer ' + (await setupAuth(server));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Casefile Router', () => {
  const casefile = {
    patientId: '5ebf23451164b9832416419a',
    name: 'Knee Injury',
    clinicId: '5ecb1231f595f456542b4af6'
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('post endpoint', () => {
    it('should return 201', async () => {
      const res = await server.post('/casefiles').set('Authorization', tokenString).send(casefile);

      expect(res.statusCode).toBe(201);
    });

    it('should return the correct data', async () => {
      const res = await server.post('/casefiles').set('Authorization', tokenString).send(casefile);
      const { id, createdAt } = res.body;

      expect(res.body).toEqual({ ...casefile, id, createdAt });
    });

    it('should return 400 when not valid', async () => {
      const res = await server.post('/casefiles').set('Authorization', tokenString).send({});

      expect(res.statusCode).toBe(400);
    });
  });

  describe('get endpoint', () => {
    it('should return 200', async () => {
      const newCasefile = new Casefile(casefile);
      await newCasefile.save();
      const res = await server.get(`/casefiles/${newCasefile.id}`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const newCasefile = new Casefile(casefile);
      await newCasefile.save();

      const res = await server.get(`/casefiles/${newCasefile.id}`).set('Authorization', tokenString);
      const { id, createdAt } = res.body;

      expect(res.body).toEqual({ ...casefile, id, createdAt });
    });

    it('should return 404 if not found', async () => {
      const res = await server.get(`/casefiles/5eba8469b88f212f1012c357`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('patch endpoint', () => {
    it('should return 200', async () => {
      const savedCasefile = new Casefile(casefile);
      await savedCasefile.save();
      const patchedData = { name: 'new name' };
      const res = await server
        .patch(`/casefiles/${savedCasefile.id}`)
        .set('Authorization', tokenString)
        .send(patchedData);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const savedCasefile = new Casefile(casefile);
      await savedCasefile.save();
      const patchedData = { name: 'new name' };

      const res = await server
        .patch(`/casefiles/${savedCasefile.id}`)
        .set('Authorization', tokenString)
        .send(patchedData);
      const { id, createdAt } = res.body;

      expect(res.body).toEqual({ ...casefile, id, createdAt, name: patchedData.name });
    });

    it('should return 400 if invalid property', async () => {
      const res = await server.patch(`/casefiles/1`).set('Authorization', tokenString).send({ fakeProp: 'test' });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('delete endpoint', () => {
    it('should return 200', async () => {
      const savedCasefile = new Casefile(casefile);
      await savedCasefile.save();
      const res = await server.delete(`/casefiles/${savedCasefile.id}`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(200);
    });

    it('should return 404 if no existing casefile', async () => {
      const res = await server.delete(`/casefiles/5eba8469b88f212f1012c357`).set('Authorization', tokenString);

      expect(res.statusCode).toBe(404);
    });
  });
});
