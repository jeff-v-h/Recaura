const request = require('supertest');
const app = require('../src/app');
const Casefile = require('../src/models/casefile.model');
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

describe('Casefile Router', () => {
  const casefile = {
    patientId: '5ebf23451164b9832416419a',
    name: 'Knee Injury'
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('post endpoint', () => {
    it('should return 201', async () => {
      const res = await request(app).post('/casefiles').send(casefile);

      expect(res.statusCode).toBe(201);
    });

    it('should return the correct data', async () => {
      const res = await request(app).post('/casefiles').send(casefile);
      const { id, createdAt } = res.body;

      expect(res.body).toEqual({ ...casefile, id, createdAt });
    });

    it('should return 400 when not valid', async () => {
      const res = await request(app).post('/casefiles').send({});

      expect(res.statusCode).toBe(400);
    });
  });

  describe('get endpoint', () => {
    it('should return 200', async () => {
      const newCasefile = new Casefile(casefile);
      await newCasefile.save();
      const res = await request(app).get(`/casefiles/${newCasefile.id}`);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const newCasefile = new Casefile(casefile);
      await newCasefile.save();

      const res = await request(app).get(`/casefiles/${newCasefile.id}`);
      const { id, createdAt } = res.body;

      expect(res.body).toEqual({ ...casefile, id, createdAt });
    });

    it('should return 404 if not found', async () => {
      const res = await request(app).get(`/casefiles/5eba8469b88f212f1012c357`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('patch endpoint', () => {
    it('should return 200', async () => {
      const savedCasefile = new Casefile(casefile);
      await savedCasefile.save();
      const patchedData = { name: 'new name' };
      const res = await request(app).patch(`/casefiles/${savedCasefile.id}`).send(patchedData);

      expect(res.statusCode).toBe(200);
    });

    it('should return the correct data', async () => {
      const savedCasefile = new Casefile(casefile);
      await savedCasefile.save();
      const patchedData = { name: 'new name' };

      const res = await request(app).patch(`/casefiles/${savedCasefile.id}`).send(patchedData);
      const { id, createdAt } = res.body;

      expect(res.body).toEqual({ ...casefile, id, createdAt, name: patchedData.name });
    });

    it('should return 400 if invalid property', async () => {
      const res = await request(app).patch(`/casefiles/1`).send({ fakeProp: 'test' });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('delete endpoint', () => {
    it('should return 200', async () => {
      const savedCasefile = new Casefile(casefile);
      await savedCasefile.save();
      const res = await request(app).delete(`/casefiles/${savedCasefile.id}`);

      expect(res.statusCode).toBe(200);
    });

    it('should return 404 if no existing casefile', async () => {
      const res = await request(app).patch(`/casefiles/5eba8469b88f212f1012c357`);

      expect(res.statusCode).toBe(404);
    });
  });
});
