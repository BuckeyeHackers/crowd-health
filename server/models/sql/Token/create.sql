INSERT INTO tokens (user_username, expires_at)
  VALUES ($1, $2)
  RETURNING id, user_username, expires_at, last_accessed_at;
