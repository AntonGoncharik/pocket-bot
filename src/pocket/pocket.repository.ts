export const CREATE_QUERY = `
  INSERT INTO users
  (telegram_id)
  VALUES ($1)
  RETURNING *;
`;
