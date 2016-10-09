
'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../db/knex`);
const camelizeKey = require(`humps`);
const decamelizeKeys = require(`humps`);
const passport = require(`../config/passport`)
const LocalAPIKeyStrategy = require(`passport-localapikey`).Strategy;

/* GET users listing. */

// read--after a login, display contacts page...res.redirect
router.get(`/`, (req, res, next) => {
  // if req.session, res.render contacts.hbs
  // else, res.redirect to index.js
});

// user signup with email
router.post(`/`, (req, res, next) => {
  const newUser = req.body;

  // if anything is blank send error
  if (newUser.email && newUser.password) {
    // take info from newUser, put into passport localStrategy to create user
    // then use knex(`users`).insert() to add stuff to db
    // then save res.session
    // then render user's contats page
  } else {
    // revisit...dont know how to handle error of missing email or pass
    return err => { next(err); };
  }
});

module.exports = router;
