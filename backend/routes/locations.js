const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

const router = express.Router();

// Get public locations
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { latitude, longitude, radius_miles } = req.query;

    let query = 'SELECT * FROM locations WHERE is_public = true';
    const params = [];

    // Simple distance filter (rough approximation)
    if (latitude && longitude && radius_miles) {
      query += ` AND
        (latitude BETWEEN $${params.length + 1} AND $${params.length + 2})
        AND (longitude BETWEEN $${params.length + 3} AND $${params.length + 4})`;

      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const rad = parseFloat(radius_miles) / 69; // 1 degree ≈ 69 miles

      params.push(lat - rad, lat + rad, lon - rad, lon + rad);
    }

    query += ' LIMIT 100';

    const result = await db.query(query, params);
    res.json(result.rows);
  })
);

// Get single location
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const result = await db.query(
      `SELECT l.*, COUNT(c.id) as catch_count
       FROM locations l
       LEFT JOIN catches c ON l.id = c.location_id
       WHERE l.id = $1
       GROUP BY l.id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      throw new AppError('Location not found', 404);
    }

    res.json(result.rows[0]);
  })
);

// Create location (authenticated users)
router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { name, latitude, longitude, description, location_type, is_public } = req.body;

    if (!name || !latitude || !longitude) {
      throw new AppError('Name, latitude, and longitude are required', 400);
    }

    const result = await db.query(
      `INSERT INTO locations (name, latitude, longitude, description, location_type, is_public, created_by_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, latitude, longitude, description, location_type, is_public !== false, req.user.userId]
    );

    res.status(201).json(result.rows[0]);
  })
);

// Update location (owner only)
router.patch(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const locResult = await db.query('SELECT created_by_id FROM locations WHERE id = $1', [req.params.id]);

    if (locResult.rows.length === 0) {
      throw new AppError('Location not found', 404);
    }

    if (locResult.rows[0].created_by_id !== req.user.userId) {
      throw new AppError('Not authorized', 403);
    }

    const { name, description, location_type, is_public } = req.body;
    const updates = { name, description, location_type, is_public };
    const fields = Object.keys(updates).filter((k) => updates[k] !== undefined);
    const values = fields.map((k) => updates[k]);

    if (fields.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
    const query = `UPDATE locations SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`;

    const result = await db.query(query, [...values, req.params.id]);

    res.json(result.rows[0]);
  })
);

module.exports = router;
