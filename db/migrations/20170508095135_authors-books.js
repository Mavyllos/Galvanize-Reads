exports.up = function(knex) {
  return knex.schema.createTable('authors-books', (table) => {
    table.increments();
    table.integer('authors_id').notNullable();
    table.integer('books_id').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('authors-books');
};
