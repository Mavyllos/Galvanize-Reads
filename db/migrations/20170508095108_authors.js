'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('authors', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.text('biography').notNullable();
    table.string('portrait_url').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('authors');
};
