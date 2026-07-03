-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations (fishing spots)
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  description TEXT,
  location_type VARCHAR(50), -- lake, river, ocean, pond
  is_public BOOLEAN DEFAULT TRUE,
  created_by_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Catches (fish logged by users)
CREATE TABLE IF NOT EXISTS catches (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location_id INTEGER REFERENCES locations(id),
  fish_species VARCHAR(100) NOT NULL,
  weight_lbs DECIMAL(8, 2),
  length_inches DECIMAL(8, 2),
  bait_type VARCHAR(100),
  catch_method VARCHAR(100), -- fly, spinning, baitcasting, etc.
  caught_at TIMESTAMP NOT NULL,
  notes TEXT,
  photo_url VARCHAR(500),
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tournament scores
CREATE TABLE IF NOT EXISTS tournament_scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tournament_name VARCHAR(255) NOT NULL,
  total_weight_lbs DECIMAL(10, 2),
  fish_count INTEGER,
  rank INTEGER,
  score DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_catches_user_id ON catches(user_id);
CREATE INDEX idx_catches_location_id ON catches(location_id);
CREATE INDEX idx_catches_caught_at ON catches(caught_at);
CREATE INDEX idx_locations_coordinates ON locations(latitude, longitude);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_tournament_scores_user_id ON tournament_scores(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER locations_updated_at BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER catches_updated_at BEFORE UPDATE ON catches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER tournament_scores_updated_at BEFORE UPDATE ON tournament_scores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
