var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET mail. */
router.get('/getLetters', function(req, res, next) {
  let pemRegex = new RegExp("^-----BEGIN PUBLIC KEY-----(.|\n|\r)*-----END PUBLIC KEY-----\r?\n?$");
  let ret = [];

  if (pemRegex.test(req.query.pem)) {
    let RawLetters = fs.readFileSync(path.resolve(__dirname, '../public/database/messages.json'));  
    let letters = JSON.parse(RawLetters); 
    ret = letters.messages.map(a => a.dest == req.query.pem);
    res.json(ret);
  } else {
    res.status(400).send('Invalid pem!');
  }
});

module.exports = router;
