var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET mail. */
router.get('/getLetters', function(req, res, next) {
  var pemRegex = new RegExp("-----BEGIN PUBLIC KEY-----(.|\n|\r)*-----END PUBLIC KEY-----\r?\n?$");

  ret = ["test", "patate"];

  if(re2.test(req.query.pem)) {
    res.json(ret);
  }
});

module.exports = router;
