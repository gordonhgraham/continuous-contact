'use strict'

/* eslint-disable camelcase, sort-keys */

exports.seed = (knex, Promise) => {
  return knex(`interactions`).del()
    .then(() => {
      return knex(`interactions`).insert([{
        user_id: 1,
        contact_id: 1,
        date: `07/07/16`,
        type_id: 1,
        notes: `We chatted. On the telephone. It was my birthday.`
      }, {
        user_id: 2,
        contact_id: 1,
        date: `07/07/16`,
        type_id: 1,
        notes: `Sent an email. We need to pick up some groceries.`
      }, {
        user_id: 3,
        contact_id: 4,
        date: `07/07/16`,
        type_id: 1,
        notes: `Spoke with G. We need to grab a pint after work.`
      }]);
    });
};
