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


module.exports = router;

