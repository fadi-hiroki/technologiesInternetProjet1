var express = require('express');
var router = express.Router();

const validations = require("../public/javascripts/validations.js");
const database = require("../public/javascripts/database.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET mail. */
router.get('/getLetters', function(req, res, next) {
  let ret = [];

  if (!validations.validPEM(req.query.pem)){
    res.status(400).send('Invalid pem!');
  } else {
    let letters = database.getLetters();
    letters.messages.forEach(function (letter) {
      if(letter.dest == req.query.pem) {
        ret.push(letter);
      }
    })
    res.json(ret);
  }
});

/* POST mail. */
router.post('/addLetters', function(req, res, next) {
  let letter;

  if (!validations.validPEM(req.query.dest.pem)){
    res.status(400).send('Invalid pem!');
  } else {
    let letters = database.getLetters();
    letter = {
      dest: req.query.dest.pem,
      msg: req.query.dest.msg
    }
    letters.push(letter);
  }
});

module.exports = router;
