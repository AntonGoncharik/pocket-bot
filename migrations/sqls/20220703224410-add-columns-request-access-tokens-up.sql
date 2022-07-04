ALTER TABLE users 
  ADD COLUMN request_token VARCHAR(300);

ALTER TABLE users 
  ADD COLUMN access_token VARCHAR(300);
