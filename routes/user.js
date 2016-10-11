'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../db/knex`);

/* GET home page. */
router.get(`/`, (req, res, next) => {
  knex(`users`)
    .then(data => {
      res.render(`user`, { users: data });
    });
});

module.exports = router;
