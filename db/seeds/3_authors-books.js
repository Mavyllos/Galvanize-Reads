exports.seed = (knex, Promise) => {
  return knex('authors_books').del()
    .then(() => {
      return knex('authors_books')
      .insert([
      {
        id: 1,
        book_id: 1,
        author_id: 1
        },
      {
        id: 2,
        book_id: 1,
        author_id: 5
        },
      {
        id: 3,
        book_id: 1,
        author_id: 6
        },
      {
        id: 4,
        book_id: 2,
        author_id: 2
        },
      {
        id: 5,
        book_id: 3,
        author_id: 3
        },
      {
        id: 6,
        book_id: 4,
        author_id: 4
        },
      {
        id: 7,
        book_id: 5,
        author_id: 4
        },
      {
        id: 8,
        book_id: 6,
        author_id: 4
      },
    ]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('authors_books_id_seq', (SELECT MAX(id) FROM authors_books));"
    );
  });
};
