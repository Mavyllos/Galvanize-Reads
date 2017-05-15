let express = require('express');
let router = express.Router();
let db = require('../db/connection.js');

/* GET authors listing. */
router.get('/', function(req, res, next) {
  db('authors')
  .select(['id', 'first_name', 'last_name', 'biography', 'portrait_url'])
  .then(authors => {
     res.render('authors/index',
     { authors });
  })
  .catch(err => {
    next(err);
  });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  db('authors')
  .where({ id })
  .first()
  .then((author) => {
    res.render('authors/edit', { author });
  });
});

router.get('/add', (req, res, next) => {
  res.render('authors/add');
});

router.post('/', (req, res, next) => {
  var author = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait_url: req.body.portrait_url
  };
  db('authors')
    .insert(author, '*')
    .then(newAuthor => {
      let id = newAuthor[0].id;
      res.redirect(`/authors/${id}`);
  }).catch(err => {
      console.log(err);
    });
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var author = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait_url: req.body.portrait_url
  };
  db('authors')
    .update(author, '*')
    .where({ id })
    .then(updatedAuthor => {
      let id = updatedAuthor[0].id;
      res.redirect(`/authors/${id}`);
  }).catch(err => {
      console.log(err);
    });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  db('authors')
  .select(['id', 'first_name', 'last_name', 'biography', 'portrait_url'])
  .where({ id })
  .first()
  .then(author => {
     res.render('authors/show',
     { author });
  })
    .catch((error) => {
      next(error);
    });
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  db('authors')
  .returning(['id', 'first_name', 'last_name', 'biography', 'portrait_url'])
  .where('id', id)
  .del()
    .then((author) => {
      res.redirect('/authors');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
