import request from 'supertest';
import app from '../../src/app';

import Planet from '../../src/app/model/Planet';

describe('PLANETS', () => {
  // const defaultCategoryId = '5e6924dcd6704700476eff0c';

  const cleanDatabase = async () => {
    await Planet.deleteMany({});
  };

  beforeEach(async () => {
    await cleanDatabase();

    const planet = {
      name: 'Geonosis',
      climate: 'murky',
      terrain: 'swamp, jungles',
    };
    await Planet.insertMany([planet]);
  });

  afterEach(async () => cleanDatabase());

  describe('GET/', () => {
    it('Deve retornar todos os planetas', async () => {
      const response = await request(app).get('/planets');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
  });
});
