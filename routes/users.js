'use strict';

const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);
const knex = require(`../db/knex`);

// const LocalStrategy = require(`passport-local`).Strategy;
/* GET users listing. */
router.get(`/`, (req, res) => {
/* this currently queries database for users, not contacts,
it works though. we can switch it tomorrow */
  knex(`users`)
    .then(users => {
      res.render(`user`, {
        users: users
      });
    });
});

// read--after a login, display contacts page...res.redirect
router.get(`/`, (req, res, next) => {
  if (req.session) {
    const userId = req.session.id;

    knex(`contacts`)
      .where(`user_id`, 1)
      .select(`first_name`, `last_name`, `company`)
      .then(contacts => {
        // contacts should be an array of objects
        // res.render(`contacts.hbs`, contacts)
        res.send(contacts);
      })
      .catch(err => { res.send(err); });
  } else { res.redirect(`/`); }
});

// user signup with email
router.post(`/signup`, (req, res, next) => {
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

// user login with email
router.post(`/login`, (req, res, next) => {

});

// user signup with Linkedin
router.post(`/signup`, (req, res, next) => {
  // wait to see what passport needs with this
});

// user login with Linkedin
router.get(`/login`, (req, res, next) => {
  // wait to see what passport needs with this...
  res.render(`linkedin`)
});



module.exports = router;
