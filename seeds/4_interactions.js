'use strict'

/* eslint-disable camelcase, sort-keys */

exports.seed = (knex, Promise) => {
  return knex(`interactions`).del()
    .then(() => {
      return Promise.all([
        knex(`interactions`).insert({
          user_id: 1,
          contact_id: 1,
          date: `07/07/16`,
          type_id: 1,
          notes: `We chatted. On the telephone. It was my birthday.`
        })
      ]);
    });
};
