var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET mail. */
router.get('/getLetters', function(req, res, next) {
  if(req.params.pem) {
    console.log("il avait des params")
    return JSON.stringify(["test", "ceci"]);
  }
  next();
});

module.exports = router;
