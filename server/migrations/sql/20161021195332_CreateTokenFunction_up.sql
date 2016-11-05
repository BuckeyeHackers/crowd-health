CREATE OR REPLACE FUNCTION delete_or_update_token_by_accessed_at(token_id int) RETURNS int AS $$
DECLARE
  token tokens%ROWTYPE;
  result int;
  two_weeks_ago TIMESTAMPTZ;
BEGIN
  two_weeks_ago := NOW() - INTERVAL '2 weeks';

  SELECT * INTO token FROM tokens WHERE id = token_id;

  IF token IS NULL THEN
    /* token doesn't exist */
    result := 2;
  ELSIF token.last_accessed_at < two_weeks_ago THEN
    /* token hasn't been used for two weeks */
    DELETE FROM tokens WHERE id = token_id;
    result := 1;
  ELSE
    /* token has been used within the last two weeks */
    UPDATE tokens SET last_accessed_at = NOW() WHERE id = token_id;
    result := 0;
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql;
