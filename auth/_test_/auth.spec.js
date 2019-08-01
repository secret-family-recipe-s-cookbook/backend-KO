const server = require('../../server');
const db = require('../../database/dbConfig');
const request = require('supertest');
let token;

beforeAll(async () => {
  await db.raw('truncate users cascade');
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
      .post('/api/auth/register')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toEqual(201);
        expect(res.body.message).toBe('user created successfully');
        expect(res.body.user).toHaveProperty('firstname');
        expect(res.body.user).toHaveProperty('lastname');
        expect(res.body.user).toHaveProperty('username');
        expect(res.body.user).toHaveProperty('email');
      });
  });
  it('it returns a 400 error if user details is incomplete', () => {
    const user = {
      firstname: 'kelechi',
      lastname: 'ogbonna',
      username: 'kays',
      email: 'kellsy@example.com'
    };
    return request(server)
      .post('/api/auth/register')
      .send(user)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toEqual(400);
      });
  });
});

describe('login', () => {
  it('returns a 200 if login is successful', () => {
    const user = {
      usernameoremail: 'kays',
      password: '1234'
    };
    return request(server)
      .post('/api/auth/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        token = res.body.token;
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('token');
      });
  });

  it('returns a 400 if user details is invalid', () => {
    const user = {
      usernameoremail: '',
      password: ''
    };
    return request(server)
      .post('/api/auth/login')
      .send(user)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe(
          'Invalid details, please input a username or email'
        );
      });
  });
});
module.export = token;
