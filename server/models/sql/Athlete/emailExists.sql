SELECT COUNT(email) > 0 AS result FROM users WHERE email = $1;
