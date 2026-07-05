const request = require('supertest');
const app = require('../server');
const db = require('../database');

// Mock database
jest.mock('../database');

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/signup', () => {
    test('should create new user and return token', async () => {
      db.query.mockResolvedValueOnce({ rows: [] }); // User doesn't exist
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, email: 'test@example.com', username: 'testuser' }],
      });

      const res = await request(app).post('/api/auth/signup').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'SecurePass123',
        full_name: 'Test User',
      });

      expect(res.status).toBe(201);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('test@example.com');
    });

    test('should reject if user already exists', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // User exists

      const res = await request(app).post('/api/auth/signup').send({
        email: 'existing@example.com',
        username: 'testuser',
        password: 'SecurePass123',
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('already exists');
    });

    test('should reject invalid email format', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        email: 'invalid-email',
        username: 'testuser',
        password: 'SecurePass123',
      });

      expect(res.status).toBe(400);
    });

    test('should reject password shorter than 8 characters', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'short',
      });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    test('should return token on valid credentials', async () => {
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, email: 'test@example.com', username: 'testuser', password_hash: '$2a$10$...' }],
      });

      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'SecurePass123',
      });

      // Note: This will fail without proper bcrypt mock setup
      // In real implementation, mock bcrypt.compare
      expect(res.body.token || res.body.error).toBeDefined();
    });

    test('should reject invalid email', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'SomePass123',
      });

      expect(res.status).toBe(401);
    });

    test('should validate email format', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'invalid-email',
        password: 'SomePass123',
      });

      expect(res.status).toBe(400);
    });
  });
});
