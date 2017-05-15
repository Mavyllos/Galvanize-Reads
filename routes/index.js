let express = require('express');
let router = express.Router();
let db = require('../db/connection.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Skill Up' });
});

module.exports = router;
