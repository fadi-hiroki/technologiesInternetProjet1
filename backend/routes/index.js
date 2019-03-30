var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET mail. */
router.get('/getLetters', function(req, res, next) {
  ret = ["test", "patate"];
  if(req.params.pem) {
    console.log(req.params.pem);
  }
  res.write(JSON.stringify(ret));
  next();
});

module.exports = router;
