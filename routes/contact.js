'use strict';

const express = require(`express`);
const router = express.Router();

/* GET home page. */
router.get(`/`, (req, res, next) => {
  res.render(`contact`, { first_name: `Craig`, last_name: `Quincy`, company: `Galvanize`, phone: `217-493-0549`, email: `craig@thebomb.com`, notes:`Craig is allergic to shellfish, do NOT go to jax`, address: `1023 Walnut Ave`, city:`Boudler`, co:`CO`, zip:`80302`});
});

module.exports = router;
