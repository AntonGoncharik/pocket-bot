export const CREATE_QUERY = `
  INSERT INTO users
  (chat_id, request_token)
  VALUES ($1, $2)
  RETURNING *;
`;

export const UPDATE_QUERY = `
  UPDATE users
  SET access_token = $1
  WHERE chat_id = $2
  RETURNING *;
`;

export const GET_USER_BY_CHAT_ID_QUERY = `
  SELECT * FROM users
  WHERE chat_id=$1;
`;
