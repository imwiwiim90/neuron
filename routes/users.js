var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool(require('../database/config').pool);

/* GET users listing. */
router.get('/', function(req, res, next) {
	let query = 'SELECT * FROM user';
	pool.query(query,(err,rows) => {
		console.log(err)
		res.send(rows)
	})
  //res.send('respond with a resource');
});

router.get('/groups/:userId', function(req,res,next) {
	let user_id = req.params.userId;
	console.log(user_id)
	let query = `
		SELECT groups.id as id, groups.name as name, group_users.status as status FROM group_users JOIN (groups, user)
		ON (group_users.user_id = user.id AND group_users.groups_id = groups.id)
		WHERE user.id = ?
	`;

	pool.query(query,[user_id],(err,rows) => {
		console.log(err)
		res.send(rows)
	})
});	


router.post('/signup',function(req, res, next) {
	const { user, pass, email } = req.body;
	console.log(req.body)
	let query = 'SELECT * FROM user WHERE email = ?';
	pool.query(query,[email],(err,rows) => {
		if (err || rows.length != 0) {
			console.log(err);
			res.status(400).send({
				message: 'email already exist',
			});
			return;
		}

		let query = 'INSERT INTO user (name,password,email) VALUES (?,?,?)';
		pool.query(query, [user,pass,email], (err,result) => {
			res.send('success');
		});
	});

	
});

router.post('/login',function(req,res,next) {
	const {email, pass} = req.body;
	console.log(req.body);
	let query = 'SELECT * FROM user WHERE email = ?';
	pool.query(query,[email],(err,rows) => {
		if (!rows || rows.length == 0) res.status(400).send({ message: 'invalid email'});
		else if (rows[0].password == pass) res.send(String(rows[0].id));
		else res.status(400).send({ message: 'invalid password'});
	});
});

module.exports = router;

