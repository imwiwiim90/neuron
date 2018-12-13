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


router.post('/signup',function(req, res, next) {
	const { user, pass } = req.body;

	let query = 'SELECT * FROM user WHERE NAME = ?';
	pool.query(query,[user],(err,rows) => {
		if (err || rows.length != 0) {
			res.send('false');
			return;
		}

		let query = 'INSERT INTO user (name,password) VALUES (?,?)';
		pool.query(query, [user,pass], (err,result) => {
			res.send('true');
		});
	});

	
});

router.post('/login',function(req,res,next) {
	const {user, pass} = req.body;

	let query = 'SELECT * FROM user WHERE NAME = ?';
	pool.query(query,[user],(err,rows) => {
		if (rows.length == 0) res.send('false');
		else if (rows[0].password == pass) res.send('true');
		else res.send('false');
	});
})
module.exports = router;

