/* enable CITEXT */
CREATE EXTENSION IF NOT EXISTS citext;

/* create users table */
CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  username CITEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email CITEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/* automatically update the updated_at timestamp */
CREATE OR REPLACE FUNCTION updated_stamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/* update the stamp every time a row is updated */
CREATE TRIGGER users_updated_stamp BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE updated_stamp();
