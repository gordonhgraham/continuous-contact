'use strict';

const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);
// const LocalStrategy = require(`passport-local`).Strategy;

/* GET users listing. */
router.get(`/`, passport.authenticate(`local`), (req, res, next) => {
  res.send(`LOGIN SUCCESS`);
});

// router.get(`/`, (req, res, next) => {
//   res.send(`respond with a resource`);
// });

module.exports = router;
