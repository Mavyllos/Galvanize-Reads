var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

/* GET authors listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;