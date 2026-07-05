const request = require('supertest');
const app = require('../server');
const db = require('../database');

jest.mock('../database');
jest.mock('../middleware/auth', () => ({
  authMiddleware: (req, res, next) => {
    req.user = { userId: 1, email: 'test@example.com' };
    next();
  },
  generateToken: () => 'mock-token',
}));

describe('Catches Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/catches', () => {
    test('should return public catches', async () => {
      db.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            user_id: 1,
            fish_species: 'bass',
            weight_lbs: 3.5,
            caught_at: '2024-01-15T10:30:00Z',
            is_public: true,
          },
        ],
      });

      const res = await request(app).get('/api/catches');

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0].fish_species).toBe('bass');
    });

    test('should filter by species', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app).get('/api/catches?species=trout');

      expect(res.status).toBe(200);
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining('fish_species ILIKE'),
        expect.arrayContaining(['%trout%'])
      );
    });
  });

  describe('POST /api/catches', () => {
    test('should create a catch for authenticated user', async () => {
      db.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            user_id: 1,
            fish_species: 'bass',
            weight_lbs: 3.5,
            caught_at: '2024-01-15T10:30:00Z',
          },
        ],
      });

      const res = await request(app).post('/api/catches').send({
        fish_species: 'bass',
        weight_lbs: 3.5,
        caught_at: '2024-01-15T10:30:00Z',
      });

      expect(res.status).toBe(201);
      expect(res.body.fish_species).toBe('bass');
    });

    test('should reject missing required fields', async () => {
      const res = await request(app).post('/api/catches').send({
        weight_lbs: 3.5,
      });

      expect(res.status).toBe(400);
    });

    test('should reject invalid weight', async () => {
      const res = await request(app).post('/api/catches').send({
        fish_species: 'bass',
        weight_lbs: -5, // negative weight
        caught_at: '2024-01-15T10:30:00Z',
      });

      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /api/catches/:id', () => {
    test('should update catch for owner', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ user_id: 1 }] }); // Ownership check
      db.query.mockResolvedValueOnce({ rows: [{ id: 1, weight_lbs: 4.5 }] }); // Update result

      const res = await request(app).patch('/api/catches/1').send({
        weight_lbs: 4.5,
      });

      expect(res.status).toBe(200);
      expect(res.body.weight_lbs).toBe(4.5);
    });

    test('should reject update from non-owner', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ user_id: 2 }] }); // Different owner

      const res = await request(app).patch('/api/catches/1').send({
        weight_lbs: 4.5,
      });

      expect(res.status).toBe(403);
    });
  });

  describe('DELETE /api/catches/:id', () => {
    test('should delete catch for owner', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ user_id: 1 }] }); // Ownership check
      db.query.mockResolvedValueOnce({ rows: [] }); // Delete result

      const res = await request(app).delete('/api/catches/1');

      expect(res.status).toBe(204);
    });

    test('should reject delete from non-owner', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ user_id: 2 }] }); // Different owner

      const res = await request(app).delete('/api/catches/1');

      expect(res.status).toBe(403);
    });
  });
});
