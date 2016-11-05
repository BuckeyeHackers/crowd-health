CREATE TABLE tokens (
  token_id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  expires_at TIMESTAMPTZ NOT NULL,
  last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
