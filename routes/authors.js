var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

/* GET authors listing. */
router.get('/', function(req, res, next) {
  db("authors")
  .select(["id", "first_name", "last_name", "biography", "portrait_url"])
  .then(authors => {
     res.render('authors/index',
     { authors })
  })
  .catch(err => {
    next(err)
  })
});

module.exports = router;
