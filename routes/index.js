var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log('GET /');
	res.render('index');
});

module.exports = router;
