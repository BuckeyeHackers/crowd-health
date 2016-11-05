UPDATE users SET (first_name, last_name, email) = ($1, $2, $3)
  WHERE username = $4
  RETURNING id, username, first_name, last_name, email, created_at, updated_at;
