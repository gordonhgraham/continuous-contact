'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../db/knex`);

/* GET home page. */
router.get(`/`, (req, res, next) => {
  knex(`contacts`)
    .where(`user_id`, 1)
    .then(data => {
      console.log(data);
      res.render(`user_home.hbs`, data)
    });
});

module.exports = router;
