const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');
const { generateToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

const router = express.Router();

// Signup
router.post(
  '/signup',
  validate(schemas.signup),
  asyncHandler(async (req, res) => {
    const { email, username, password, full_name } = req.validatedBody;

    // Check if user exists
    const userExists = await db.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userExists.rows.length > 0) {
      throw new AppError('Email or username already exists', 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.query(
      'INSERT INTO users (email, username, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING id, email, username',
      [email, username, passwordHash, full_name]
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  })
);

// Login
router.post(
  '/login',
  validate(schemas.login),
  asyncHandler(async (req, res) => {
    const { email, password } = req.validatedBody;

    // Find user
    const result = await db.query('SELECT id, email, username, password_hash FROM users WHERE email = $1', [
      email,
    ]);

    if (result.rows.length === 0) {
      throw new AppError('Invalid credentials', 401);
    }

    const user = result.rows[0];

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken(user.id, user.email);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  })
);

module.exports = router;
