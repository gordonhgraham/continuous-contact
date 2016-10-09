'use strict'

/* eslint-disable camelcase, sort-keys */

exports.seed = (knex, Promise) => {
  return knex(`users`).del()
    .then(() => {
      return Promise.all([
        knex(`users`).insert({
          email: `gordon@gmail.com`,
          hashed_password: `password`,
          first_name: `Gordon`,
          last_name: `Graham`,
          linkedin_url: ``,
          is_admin: `true`
        })
      ]);
    });
};
