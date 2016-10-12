'use strict';

/* eslint-disable camelcase, sort-keys */

exports.seed = (knex, Promise) => {
  return knex(`contacts`).del()
    .then(() => {
      return knex(`contacts`).insert([{
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
      }, {
        user_id: 1,
        first_name: `Kevin`,
        last_name: `Connolly`,
        company: `Entourage Group`,
        phone: `2173690500`,
        email: `kevin.connolly@hbo.com`,
        address: `5610 W Bloomington Rd.`,
        city: `Champaign`,
        state: `IL`,
        zip: `61820`,
        linkedin_url: ``,
        fb_url: ``,
        photo: ``,
        notes: `Kevin is a great manager.`
      }, {
        user_id: 1,
        first_name: `Kevin`,
        last_name: `Dillon`,
        company: `Entourage Group`,
        phone: `2173690500`,
        email: `kevin.connolly@hbo.com`,
        address: `5610 W Bloomington Rd.`,
        city: `Champaign`,
        state: `IL`,
        zip: `61820`,
        linkedin_url: ``,
        fb_url: ``,
        photo: ``,
        notes: `Kevin is a great party animal.`
      }, {
        user_id: 1,
        first_name: `Jessica`,
        last_name: `Alba`,
        company: `Entourage Group`,
        phone: `2173690500`,
        email: `jessica.alba@hbo.com`,
        address: `5610 W Bloomington Rd.`,
        city: `Champaign`,
        state: `IL`,
        zip: `61820`,
        linkedin_url: ``,
        fb_url: ``,
        photo: ``,
        notes: `Jessica is a great business woman.`
      }]);
    });
};
