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

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  db("books")
  .select(["id", "title", "genre", "description", "cover_url"])
  .where("id", id)
  .first()
  .then(book => {
     res.render('books/show',
     { book })
  })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  db("books")
  .returning(["id", "title", "genre", "description", "cover_url"])
  .where("id", id)
  .del()
    .then((books) => {
      res.redirect('/books')
    })
    .catch((error) => {
      next(error);
    });
});


module.exports = router;
