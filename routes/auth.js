/*
  login and signup route
*/

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send("hey there");
});

module.exports = router;