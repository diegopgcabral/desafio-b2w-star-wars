import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../../src/app';
// import Planet from '../../src/app/model/Planet';

const planetWithFilms = {
  name: 'Geonosis',
  climate: 'seco',
  terrain: 'plano',
};

// const planetWithoutFilm = {
//   name: 'Terra',
//   climate: 'seco',
//   terrain: 'plano',
// };

// const invalidPlanet = {
//   name: 'Terra',
//   climate: 'seco',
//   terrain: 'plano',
//   planetId: '5e694ed53603f00555a748bf',
// };

describe('Desafio B2W - Teste API', () => {
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

  afterAll(async () => {
    mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany();
    }
  });

  it('# Deverá criar um novo planeta', async () => {
    const response = await request(app)
      .post('/planets')
      .send(planetWithFilms);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.numberOfMovies).toBeGreaterThanOrEqual(1);
  });
});
