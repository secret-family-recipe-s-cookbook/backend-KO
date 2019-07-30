const server = require('../../server');
const db = require('../../database/dbConfig');
const request = require('supertest');

beforeAll(async () => {
  await db('users').truncate();
});

describe('register', () => {
  it('it registers a user', () => {
    const user = {
      firstname: 'kelechi',
      lastname: 'ogbonna',
      username: 'kays',
      email: 'kellsy@example.com',
      password: '1234',
      confirmPassword: '1234'
    };
    return request(server)
      .post('/auth/register')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        console.log(res.body);
        expect(res.status).toEqual(201);
        expect(res.body.message).toBe('user created successfully');
        expect(res.body.user).toHaveProperty('firstname');
        expect(res.body.user).toHaveProperty('lastname');
        expect(res.body.user).toHaveProperty('username');
        expect(res.body.user).toHaveProperty('email');
      });
  });
});
