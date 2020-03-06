import request from 'supertest';
import app from '../../src/app';

describe('Planet', () => {
  it('should be able to register new planet', async () => {
    const response = await request(app)
      .post('/planets')
      .send({
        name: 'Kamino',
        climate: 'temperate',
        terrain: 'ocean',
      });

    expect(response.body).toHaveProperty('_id');
  });
});
