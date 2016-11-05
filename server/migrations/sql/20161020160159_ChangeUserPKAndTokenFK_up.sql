/* change token PK and FK */
ALTER TABLE tokens
  RENAME COLUMN token_id TO id;
ALTER TABLE tokens
  DROP CONSTRAINT tokens_user_id_fkey;
ALTER TABLE tokens
  DROP COLUMN user_id;
ALTER TABLE tokens
  ADD COLUMN user_username CITEXT REFERENCES users(username) ON DELETE CASCADE;

/* change users PK to username */
ALTER TABLE users
  DROP CONSTRAINT users_pkey;
ALTER TABLE users
  RENAME COLUMN user_id TO id;
ALTER TABLE users
  ADD PRIMARY KEY (username);
