'use strict'

/* eslint-disable camelcase, sort-keys */

exports.seed = (knex, Promise) => {
  return knex(`users`).del()
    .then(() => {
      return knex(`users`).insert([{
          email: `gordon.graham@gmail.com`,
          hashed_password: `password`,
          first_name: `Gordon`,
          last_name: `Graham`,
          linkedin_url: ``,
          is_admin: `true`
        }, {
          email: `cole.chambers@gmail.com`,
          hashed_password: `password`,
          first_name: `Cole`,
          last_name: `Chambers`,
          linkedin_url: ``,
          is_admin: `true`
        }, {
          email: `maria.bogomaz@gmail.com`,
          hashed_password: `password`,
          first_name: `Maria`,
          last_name: `Bogomaz`,
          linkedin_url: ``,
          is_admin: `true`

        }, {
          email: `matt.gardner@gmail.com`,
          hashed_password: `password`,
          first_name: `Matt`,
          last_name: `Works`,
          linkedin_url: ``,
          is_admin: `true`
        }, {
          email: `craig.quincy@gmail.com`,
          hashed_password: `password`,
          first_name:  `Craig`,
          last_name:  `Quincy`,
          linkedin_url: ``,
          is_admin: `true`
        }, {
          email: `ali.hobbs@gmail.com`,
          hashed_password: `password`,
          first_name:  `Ali`,
          last_name:  `Hobbs`,
          linkedin_url: ``,
          is_admin: `true`

        }, {
          email: `adrian.grenier@gmail.com`,
          hashed_password: `password`,
          first_name:  `Adrian`,
          last_name:  `Grenier`,
          linkedin_url: ``,
          is_admin: `true`
        }, {
          email: `jeremy.piven@gmail.com`,
          hashed_password: `password`,
          first_name:  `Jeremy`,
          last_name:  `Piven`,
          linkedin_url: ``,
          is_admin: `true`
        }
      ]);
    });
};
