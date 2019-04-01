var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");

const validations = require("../public/javascripts/validations.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET mail. */
router.get('/getLetters', function(req, res, next) {
  // let pemRegex = new RegExp("^-----BEGIN PUBLIC KEY-----(.|\n|\r)*-----END PUBLIC KEY-----\r?\n?$");
  let ret = [];

  if (validations.validPEM(req.query.pem)) {
    // if (pemRegex.test(req.query.pem)) {
    let RawLetters = fs.readFileSync(path.resolve(__dirname, '../public/database/messages.json'));  
    let letters = JSON.parse(RawLetters); 
    letters.messages.forEach(function (letter) {
      if(letter.dest == req.query.pem) {
        ret.push(letter);
      }
    })
    res.json(ret);
  } else {
    res.status(400).send('Invalid pem!');
  }
});

/* POST mail. */
router.post('/addLetters', function(req, res, next) {
  let pemRegex = new RegExp("^-----BEGIN PUBLIC KEY-----(.|\n|\r)*-----END PUBLIC KEY-----\r?\n?$");
  let ret = [];

  if (pemRegex.test(req.query.pem)) {
    let RawLetters = fs.readFileSync(path.resolve(__dirname, '../public/database/messages.json'));  
    let letters = JSON.parse(RawLetters); 
    letters.messages.forEach(function (letter) {
      if(letter.dest == req.query.pem) {
        ret.push(letter);
      }
    })
    res.json(ret);
  } else {
    res.status(400).send('Invalid pem!');
  }
});

module.exports = router;
