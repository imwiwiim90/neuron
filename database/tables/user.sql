CREATE TABLE user (
	id INT AUTO_INCREMENT PRIMARY KEY,
	created_at datetime not null default current_timestamp,
	email VARCHAR(100),
	name VARCHAR(100),
	password VARCHAR(100)
);