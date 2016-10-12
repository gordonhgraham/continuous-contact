'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../db/knex`);

/* GET home page. */
router.get(`/`, (req, res, next) => {
  knex(`contacts`)
    .where(`user_id`, 1)
    .then(contacts => {
      console.log(contacts);
      res.render(`user`, { contacts: contacts });
    });
});

router.post(`/addContact` (req, res, next) => {
  /* adds info from form to db */
});

module.exports = router;
