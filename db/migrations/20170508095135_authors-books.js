exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors_books', (table) => {
    table.increments();
    table.integer('author_id').notNullable();
    table.integer('book_id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('authors_books');
};
