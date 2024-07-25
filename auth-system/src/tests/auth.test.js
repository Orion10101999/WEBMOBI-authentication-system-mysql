const request = require('supertest');
const express = require('express');
const sequelize = require('../config/database');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should login the user and return a JWT', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should retrieve the user profile with a valid JWT', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    const token = loginRes.body.token;

    const profileRes = await request(app).get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(profileRes.statusCode).toEqual(200);
    expect(profileRes.body).toHaveProperty('username', 'testuser');
  });
});
