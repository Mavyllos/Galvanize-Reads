'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('genre').notNullable();
    table.text('description').notNullable();
    table.string('cover_url').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('books');
};
