'use strict'

/* eslint-disable camelcase, sort-keys */

exports.seed = (knex, Promise) => {
  return knex(`contacts`).del()
    .then(() => {
      return Promise.all([
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
        })
      ]);
    });
};

/* ============= YO, all this info came from the seed file

in the proj dir, check there for more ================= */
