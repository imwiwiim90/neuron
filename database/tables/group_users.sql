CREATE TABLE group_users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	created_at datetime not null default current_timestamp,
	groups_id INT,
	user_id INT,
	status INT,
	FOREIGN KEY (groups_id)
		REFERENCES groups(id),
	FOREIGN KEY (user_id)
		REFERENCES user(id)
);
/*
STATUS
1 - pending invitation
2 - accepted
*/