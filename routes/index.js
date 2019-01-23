var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/views/index.html');
});

router.post('/signup', function(req, res, next) {
	console.log(req.body);
	res.send('ok')
})

module.exports = router;
