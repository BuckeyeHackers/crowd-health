/* change users PK to username */
ALTER TABLE users
  DROP CONSTRAINT users_pkey;
ALTER TABLE users
  RENAME COLUMN id TO user_id;
ALTER TABLE users
  ADD PRIMARY KEY (user_id);

/* change token PK and FK */
ALTER TABLE tokens
  RENAME COLUMN id TO token_id;
ALTER TABLE tokens
  DROP CONSTRAINT tokens_user_username_fkey;
ALTER TABLE tokens
  DROP COLUMN user_username;
ALTER TABLE tokens
  ADD COLUMN user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE;
