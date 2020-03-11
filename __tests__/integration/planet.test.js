import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../../src/app';
// import Planet from '../../src/app/model/Planet';

describe('Planet', () => {
  let mongoServer;
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const URI = await mongoServer.getUri();

    mongoose.connect(URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  afterAll(async done => {
    mongoose.disconnect(done);
    await mongoServer.stop();
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany();
    }
  });

  it('Deverá criar um novo planeta', async () => {
    const response = await request(app)
      .post('/planets')
      .send({
        name: 'Teste',
        climate: 'Teste',
        terrain: 'Teste',
      });

    expect(response.status).toBe(201);
  });
});
