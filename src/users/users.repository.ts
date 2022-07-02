export const CREATE_QUERY = `
  INSERT INTO users
  (telegram_id)
  VALUES ($1)
  RETURNING *;
`;

export const GET_USER_BY_TELEGRAM_ID_QUERY = `
  SELECT * FROM users
  WHERE telegram_id=$1;
`;
