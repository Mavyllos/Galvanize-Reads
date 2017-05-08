var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

/* GET books listing. */
router.get('/', function(req, res, next) {
  db("books")
  .select(["id", "title", "genre", "description", "cover_url"])
  .then(db("authors")
    .select(["id"]))
  .then(books => {
     res.render('books/index',
     { books })
  })
  .catch(err => {
    next(err)
  })
});



module.exports = router;
