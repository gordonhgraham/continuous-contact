'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../knex`);
const camelizeKey = require(`humps`);
const decamelizeKeys = require(`humps`);
const passport = require(`passport`)
const localStrategy = require(`passport-local`).Strategy;

/* GET users listing. */
router.get(`/`, (req, res, next) => {
  res.send(`respond with a resource`);
});

module.exports = router;
