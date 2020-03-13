import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../../src/app';

const planetWithFilms = {
  name: 'Geonosis',
  climate: 'seco',
  terrain: 'plano',
};

const planetNull = {
  name: '',
  climate: '',
  terrain: '',
};

const planetWithoutFilm = {
  name: 'Terra',
  climate: 'seco',
  terrain: 'plano',
};

const invalidPlanet = {
  name: 'Terra',
  climate: 'seco',
  terrain: 'plano',
  id: '5e694ed53603f00555a748bf',
};

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

  it('# Deverá criticar um planeta com os campos inválidos', async () => {
    const response = await request(app)
      .post('/planets')
      .send(planetNull);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('# Deverá criar um novo planeta com a quantidade de aparições em filmes >= 1', async () => {
    const response = await request(app)
      .post('/planets')
      .send(planetWithFilms);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.numberOfMovies).toBeGreaterThanOrEqual(1);
  });

  it('# Deverá criar um novo planeta com a quantidade de aparições em filmes = 0', async () => {
    const response = await request(app)
      .post('/planets')
      .send(planetWithoutFilm);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.numberOfMovies).toBe(0);
  });

  it('# Tentando criar um planeta já existente', async () => {
    await request(app)
      .post('/planets')
      .send(planetWithFilms);

    const response = await request(app)
      .post('/planets')
      .send(planetWithFilms);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('# Consultando planeta pelo nome', async () => {
    await request(app)
      .post('/planets')
      .send(planetWithFilms);

    const response = await request(app).get(
      `/planets/search/${planetWithFilms.name}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('# Consultando planeta pelo nome que não está existe no BD', async () => {
    const response = await request(app).get(
      `/planets/search/${planetWithFilms.name}`
    );

    expect(response.status).toBe(404);
  });

  it('# Consultando planeta sem informar o nome', async () => {
    const response = await request(app).get('/planets/search/');

    expect(response.status).toBe(500);
  });

  it('# Consultando planeta com ID inválido', async () => {
    const response = await request(app).get(`/planets/${invalidPlanet.id}`);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: 'ID não cadastrado.',
    });
  });

  it('# Deverá retornar a lista de todos os planetas cadastrados', async () => {
    const response = await request(app).get('/planets');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('# Deverá remover um planeta válido', async () => {
    await request(app)
      .post('/planets')
      .send(planetWithFilms);

    const response = await request(app).delete(
      `/planets/${planetWithFilms.name}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'Planeta removido com sucesso',
    });
  });

  it('# Tentando remover um planeta não cadastrado', async () => {
    const response = await request(app).delete(
      `/planets/${planetWithoutFilm.name}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: 'Planeta não encontrado',
    });
  });
});
