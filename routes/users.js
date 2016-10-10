'use strict';

const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);
const knex = require(`../db/knex`);

// display contacts page...res.redirect (list contacts)
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

// user signup with email (create user)
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

// user login with email (read user)
router.post(`/login`, (req, res, next) => {
  // wait to see what passport needs with this
});

// user signup with Linkedin (create user)
router.post(`/signup`, (req, res, next) => {
  // wait to see what passport needs with this
});

// user login with Linkedin (read user)
router.get(`/login`, (req, res, next) => {
  // wait to see what passport needs with this...
  res.render(`linkedin`)
});

// update user info (update user)
router.patch(`/update`, (req, res, next) => {
  if (req.session) {
    const userId = req.session.id;
    const update = req.body;

    knex(`users`)
      .where(`id`, userId)

      // update is object of what was update, return all users saved settings
      .update(update, [`email`, `first_name`, `last_name`, `linkedin_url`])
      .then(data => {
        // data is an arry with an object
        res.render(`contacts.hbs`, data);
      })
      .catch(err => { res.send(err); });
  } else { res.redirect(`/`); }
});

// delete user (delete user)
router.delete(`/delete`, (req, res, next) => {
  if (req.session) {
    const userId = req.session.id;

    knex(`users`)
      .where(`id`, userId)
      .del()
      .then(() => { res.redirect(`/`); })
      .catch(err => { res.send(err); });
  } else { res.redirect(`/`); }
});

module.exports = router;
