exports.up = function(knex) {
  return knex.schema.createTable('authors-books', (table) => {
    table.increments();
    table.integer('authors_id').references('authors.id');
    table.integer('books_id').references('books.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('authors-books');
};
