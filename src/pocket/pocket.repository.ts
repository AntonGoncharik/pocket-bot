export const CREATE_QUERY = `
  INSERT INTO users
  (chat_id)
  VALUES ($1)
  RETURNING *;
`;
