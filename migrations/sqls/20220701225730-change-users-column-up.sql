ALTER TABLE users
	ADD CONSTRAINT users_unique_telegram_id UNIQUE(telegram_id);