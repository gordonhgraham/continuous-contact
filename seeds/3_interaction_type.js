'use strict'

/* eslint-disable camelcase, sort-keys */

exports.seed = (knex, Promise) => {
  return knex(`interaction_type`).del()
    .then(() => {
      return Promise.all([
        knex(`interaction_type`).insert([
          { id: 1, type: `phone` },
          { id: 2, type: `email` },
          { id: 3, type: `in person` },
          { id: 4, type: `other` }
        ])
      ]);
    });
};
