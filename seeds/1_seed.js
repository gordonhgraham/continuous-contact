'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex(`users`).del(),
    knex(`contacts`).del(),
    knex(`interactions`).del(),
    knex(`interaction_type`).del(),
  ])
  .then(() => {
    return Promise.all([
      knex(`users`).insert({
        email: `gordon@gmail.com`,
        hashed_password: `password`,
        first_name: `Gordon`,
        last_name: `Graham`,
        linkedin_url: `linkedin_url`,
        fb_url: `fb_url`,
        is_admin: `true`,
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
        notes: `James is my father. He's great.`,
      }),

      /* ================i stopped here================ */

      knex(`interactions`).insert({
        contact_id: contact_id,
        date: date,
        type_id: type_id,
        notes: notes,
      }),
      knex(`interaction_type`).insert({id: 3, colName: `rowValue3`}),
    ]);
  });
};
