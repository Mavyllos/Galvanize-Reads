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

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  db("authors")
  .select(["id", "first_name", "last_name", "biography", "portrait_url"])
  .where("id", id)
  .first()
  .then(author => {
     res.render('authors/show',
     { author })
  })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  db("authors")
  .returning(["id", "first_name", "last_name", "biography", "portrait_url"])
  .where("id", id)
  .del()
    .then((author) => {
      res.redirect('/authors')
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
