CREATE TABLE groups (
	id INT AUTO_INCREMENT PRIMARY KEY,
	created_at datetime not null default current_timestamp,
	name VARCHAR(100)
);