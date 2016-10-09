'use strict'

/* eslint-disable camelcase, sort-keys */

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex(`users`).del(),
    knex(`contacts`).del(),
    knex(`interactions`).del(),
    knex(`interaction_type`).del()
  ])
  .then(() => {
    return Promise.all([
      knex(`users`).insert({
        email: `gordon@gmail.com`,
        hashed_password: `password`,
        first_name: `Gordon`,
        last_name: `Graham`,
        linkedin_url: ``,
        is_admin: `true`
      }),
      knex(`contacts`).insert({
        user_id: 1,
        first_name: `James`,
        last_name: `Graham`,
        company: `Bromley Group`,
        phone: `2173690500`,
        email: `jgg@bromco.com`,
        address: `5610 W Bloomington Rd.`,
        city: `Champaign`,
        state: `IL`,
        zip: `61820`,
        linkedin_url: ``,
        fb_url: ``,
        photo: ``,
        notes: `James is my father. He's great.`
      }),
      knex(`interaction_type`).insert([
        { id: 1, type: `phone` },
        { id: 2, type: `email` },
        { id: 3, type: `in person` },
        { id: 4, type: `other` }
      ]),
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
