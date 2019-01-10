var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool(require('../database/config').pool);

/* GET users listing. */
router.get('/', function(req, res, next) {
	let query = 'SELECT * FROM groups';
	pool.query(query,(err,rows) => {
		console.log(err)
		res.send(rows)
	})
  //res.send('respond with a resource');
});

router.get('/participants/:groupId', function(req,res,next) {
	let groupId = req.params.groupId;
	let query = `
	SELECT user.id as id, user.name as name, user.email as email 
	FROM group_users join (user,groups) 
	ON (user.id = group_users.user_id and groups.id = group_users.groups_id )
    WHERE groups.id = ? and group_users.status = 2
	`;

	pool.query(query,[groupId],function(err,rows) {
		if (err || !rows) {
			res.send('[]');
			console.log(err)
			return;
		} 
		res.send(rows);
	});	
});


router.post('/new',function(req, res, next) {
	const { name, user_id } = req.body;

	let query = ` 
	INSERT INTO groups 
		(name)
	values
		(?)`;
	pool.query(query,[name],(err,result) => {
		if (err || !result) {
			res.send('false');
			return;
		}
		let group_id = result.insertId;
		let query = `
		INSERT INTO group_users
			(groups_id,user_id,status) 
		VALUES 
			(?,?,?)`;

		pool.query(query, [group_id,user_id,2], (err,result) => {
			if (err || !result) {
				console.log(err)
				res.send('false');
				return;
			}
			res.send('true');
		});
	});
});

router.post('/invite/:groupId',function(req,res,next) {
	let groupId = req.params.groupId;
	const { email } = req.body;
	console.log(groupId);
	console.log(email)
	let query = `
		SELECT id
		FROM user
		WHERE email = ?
	`;
	pool.query(query,[email],function(err,rows) {
		if (err || !rows || rows.length == 0 ) {
			console.log(err);
			res.status(400).send({
				message: 'invalid email',
			});
			return;
		}
		let userId = rows[0].id;
		// VALID EMAIL
		query = `
		SELECT * 
		FROM group_users
		WHERE groups_id = ? AND user_id = ?
		`;
		pool.query(query,[groupId,userId],function(err,rows) {
			console.log('rows');
			console.log(rows);
			if (err || !rows || rows.length != 0) {
				console.log(err);
				res.status(400).send({
					message: 'user already invited',
				})
				return;
			}
			// UNINVITED USER
			query = `
			INSERT INTO group_users
			(groups_id,user_id,status)
			VALUES
			(?,?,1)
			`;
			pool.query(query,[groupId,userId], function(err,result) {
				if (err) {
					res.status(400).send({ message: 'unkown error'});
					return;
				}
				res.send('success');
			})
		});

	});
});	

router.post('/invite/accept/:groupId',function(req,res,next) {
	const groupId = req.params.groupId;
	const userId = req.body.user_id;
	let query = `
	UPDATE group_users
	SET status = 2
	WHERE groups_id = ? and user_id = ?
	`;

	pool.query(query,[groupId,userId],function(err,result) {
		if (err) {
			console.log(err)
			res.status(400).send({ message: 'internal error'});
			return;
		} 
		res.send('success');
	});
});

router.post('/invite/cancel/:groupId',function(req,res,next) {
	const groupId = req.params.groupId;
	const userId = req.body.user_id;
	let query = `
	DELETE FROM group_users
	WHERE groups_id = ? and user_id = ?
	`;

	pool.query(query,[groupId,userId],function(err,result) {
		if (err) {
			console.log(err)
			res.status(400).send({ message: 'internal error'});
			return;
		} 
		res.send('success');
	});
});


module.exports = router;

