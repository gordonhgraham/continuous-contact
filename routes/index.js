'use strict';

const express = require(`express`);
const router = express.Router();

/* GET home page. */
router.get(`/:id`, (req, res, next) => {
  const userId = req.session.id;
  const contactId = req.params.id
  const contact = {};

  knex(`contacts`)
    .where(`user_id`, userId)
    .where(`id`, contactId)
    .then(contact => {
      contact.first_name = contact.first_name;

      res.render(`individual.hbs`, {{all the stuff}})
    })
});

module.exports = router;
