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
  let pem = req.query.pem.replace(/\\n/g, '\n');
  if (!validations.validPEM(req.query.pem)){
    res.sendStatus(400);
  } else {
    let letters = database.getLetters();
    letters.forEach(function (letter) {
      if(letter.dest == pem) {
        ret.push(letter);
      }
    })
    res.json(ret);
  }
});

/* POST mail. */
router.post('/addLetters', function(req, res, next) {
  let letters = database.getLetters();
  let letter;
  JSON.parse(req.query.letters).forEach(function (letter) {
    if(newLetter = database.letter(letter)) {
      letters.push(newLetter);
    } else {
      res.sendStatus(400);
    }
  });
  database.putLetters(letters);
  res.sendStatus(200);
});

module.exports = router;
