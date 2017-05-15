let express = require('express');
let router = express.Router();
let db = require('../db/connection.js');

/* GET books listing. */
// router.get('/', function(req, res, next) {
//   db('books')
//   .select(['id', 'title', 'genre', 'description', 'cover_url'])
//   .then(db('authors')
//     .select(['id']))
//   .then(books => {
//      res.render('books/index',
//      { books });
//   })
//   .catch(err => {
//     next(err);
//   });
// });

router.get('/', (req, res, next) => {
  db('books')
  .innerJoin('authors_books', 'books.id', 'authors_books.book_id')
  .innerJoin('authors', 'authors.id', 'authors_books.author_id')
  .distinct('books.id')
  .select('*')
  .orderBy('books.id')
  // .groupBy('authors_books.id', 'books.id', 'authors.id')
  .then(books => {
    res.render('books', {books});
  })
   .catch(err => {
      next(err);
    });
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  db('books')
  .where({ id })
  .first()
  .then((book) => {
    res.render('books/edit', { book });
  });
});

router.get('/add', (req, res, next) => {
  res.render('books/add');
});

router.post('/', (req, res, next) => {
  var book = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  };
  db('books')
    .insert(book, '*')
    .then(updatedBook => {
      let id = updatedBook[0].id;
      res.redirect(`/books/${id}`);
  }).catch(err => {
      console.log(err);
    });
});


router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var book = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  };
  db('books')
    .update(book, '*')
    .where({ id })
    .then(updatedBook => {
      let id = updatedBook[0].id;
      res.redirect(`/books/${id}`);
  }).catch(err => {
      console.log(err);
    });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  db('books')
  .select(['id', 'title', 'genre', 'description', 'cover_url'])
  .where('id', id)
  .first()
  .then(book => {
     res.render('books/show',
     { book });
  })
    .catch((error) => {
      next(error);
    });
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  db('books')
  .returning(['id', 'title', 'genre', 'description', 'cover_url'])
  .where('id', id)
  .del()
    .then((books) => {
      res.redirect('/books');
    })
    .catch((error) => {
      next(error);
    });
});


module.exports = router;
