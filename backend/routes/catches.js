const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

const router = express.Router();

// Get all public catches or user's catches
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { user_id, location_id, species, sort } = req.query;
    let query = 'SELECT * FROM catches WHERE is_public = true';
    const params = [];

    if (user_id) {
      query += ` AND user_id = $${params.length + 1}`;
      params.push(user_id);
    }

    if (location_id) {
      query += ` AND location_id = $${params.length + 1}`;
      params.push(location_id);
    }

    if (species) {
      query += ` AND fish_species ILIKE $${params.length + 1}`;
      params.push(`%${species}%`);
    }

    query += ' ORDER BY caught_at DESC LIMIT 100';

    const result = await db.query(query, params);
    res.json(result.rows);
  })
);

// Get user's catches (including private)
router.get(
  '/my-catches',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const result = await db.query('SELECT * FROM catches WHERE user_id = $1 ORDER BY caught_at DESC', [
      req.user.userId,
    ]);

    res.json(result.rows);
  })
);

// Get single catch
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const result = await db.query('SELECT * FROM catches WHERE id = $1', [req.params.id]);

    if (result.rows.length === 0) {
      throw new AppError('Catch not found', 404);
    }

    const catchRecord = result.rows[0];

    // Check permissions
    if (!catchRecord.is_public && catchRecord.user_id !== req.user?.userId) {
      throw new AppError('Not authorized', 403);
    }

    res.json(catchRecord);
  })
);

// Create catch
router.post(
  '/',
  authMiddleware,
  validate(schemas.createCatch),
  asyncHandler(async (req, res) => {
    const { fish_species, weight_lbs, length_inches, bait_type, catch_method, caught_at, notes, location_id, is_public } =
      req.validatedBody;

    const result = await db.query(
      `INSERT INTO catches
       (user_id, fish_species, weight_lbs, length_inches, bait_type, catch_method, caught_at, notes, location_id, is_public)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        req.user.userId,
        fish_species,
        weight_lbs,
        length_inches,
        bait_type,
        catch_method,
        caught_at,
        notes,
        location_id,
        is_public || false,
      ]
    );

    res.status(201).json(result.rows[0]);
  })
);

// Update catch
router.patch(
  '/:id',
  authMiddleware,
  validate(schemas.updateCatch),
  asyncHandler(async (req, res) => {
    // Check ownership
    const catchResult = await db.query('SELECT user_id FROM catches WHERE id = $1', [req.params.id]);

    if (catchResult.rows.length === 0) {
      throw new AppError('Catch not found', 404);
    }

    if (catchResult.rows[0].user_id !== req.user.userId) {
      throw new AppError('Not authorized', 403);
    }

    const updates = req.validatedBody;
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
    const query = `UPDATE catches SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`;

    const result = await db.query(query, [...values, req.params.id]);

    res.json(result.rows[0]);
  })
);

// Delete catch
router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const catchResult = await db.query('SELECT user_id FROM catches WHERE id = $1', [req.params.id]);

    if (catchResult.rows.length === 0) {
      throw new AppError('Catch not found', 404);
    }

    if (catchResult.rows[0].user_id !== req.user.userId) {
      throw new AppError('Not authorized', 403);
    }

    await db.query('DELETE FROM catches WHERE id = $1', [req.params.id]);

    res.status(204).send();
  })
);

module.exports = router;
