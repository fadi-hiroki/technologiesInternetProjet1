var express = require('express');
var path = require('path');
var router = express.Router();

const validations = require("../public/javascripts/validations.js");
const database = require("../public/javascripts/database.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../../interface/mailbox.html'));
});

/* GET mail.
@params pem A string representing a valid pem for which one wishes to receive destined letters.
@return mail with pem as destinator.
*/
router.get('/getLetters', function(req, res, next) {
  let ret = [];
  let pem = req.body.pem.replace(/\\n/g, '\n');
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

/* POST mail.
@params letters A JSON array containing letter objects.
@post mail from array is added to database.
*/
router.post('/addLetters', function(req, res, next) {
  letter=req.body;
  let letters = database.getLetters();
  let newLetter;

  if(newLetter = database.letter(letter)) {
    letters.push(newLetter);
  } else {
    res.sendStatus(400);
  }
  database.putLetters(letters);
  res.sendStatus(200);
});

/* GET peers.
@return list of peers from the database.
*/
router.get('/getPeers', function(req, res, next) {
    let peers = database.getPeers();
    res.json(peers);
});

module.exports = router;
