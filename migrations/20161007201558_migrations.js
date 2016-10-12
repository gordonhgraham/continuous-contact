'use strict'

/* eslint-disble max-statements, max-len */

exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable(`users`, table => {
      table.increments();
      table.string(`email`).notNullable().unique().index();
      // table.specificType(`hashed_password`, `char(60)`).notNullable();
      table.text(`hashed_password`).notNullable();
      table.string(`first_name`).defaultTo(``);
      table.string(`last_name`).defaultTo(``);
      table.text(`linkedin_url`).defaultTo(``);
      // table.text(`fb_url`).defaultTo(``);
      table.boolean(`is_admin`).notNullable().defaultTo(false);
      table.timestamps(true, true);
    }),

    knex.schema.createTable(`contacts`, table => {
      table.increments();
      table.integer(`user_id`).references(`users.id`).notNullable();
      table.string(`first_name`).notNullable();
      table.string(`last_name`).notNullable().index();
      table.string(`company`).defaultTo(``);
      table.string(`phone`).defaultTo(``);
      table.string(`email`).defaultTo(``).index();
      table.text(`address`).defaultTo(``);
      table.string(`city`).defaultTo(``);
      table.string(`state`).defaultTo(``);
      table.string(`zip`).defaultTo(``);
      table.text(`linkedin_url`).defaultTo(``);
      table.text(`fb_url`).defaultTo(``);
      table.text(`photo`).defaultTo(``);
      table.text(`notes`).defaultTo(``);
      table.timestamps(true, true);
    }),

    knex.schema.createTable(`interactions`, table => {
      table.increments();
      table.integer(`user_id`).references(`users.id`).notNullable();
      table.integer(`contact_id`).references(`contacts.id`).notNullable();
      table.text(`date`).notNullable();
      table.integer(`type_id`).references(`interaction_type.id`).notNullable();
      table.text(`notes`).defaultTo(``);
      table.timestamps(true, true);
    }),

    knex.schema.createTable(`interaction_type`, table => {
      table.integer(`id`).notNullable().unique();
      table.string(`type`).notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable(`interactions`),
    knex.schema.dropTable(`interaction_type`),
    knex.schema.dropTable(`contacts`),
    knex.schema.dropTable(`users`)
  ]);
};
