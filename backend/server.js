require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const catchesRoutes = require('./routes/catches');
const locationsRoutes = require('./routes/locations');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Fishing App API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Fishing App API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      catches: '/api/catches',
      locations: '/api/locations',
    },
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/catches', catchesRoutes);
app.use('/api/locations', locationsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Fishing App API running on port ${PORT}`);
  });
}

module.exports = app;
