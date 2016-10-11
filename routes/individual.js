'use strict';

const express = require(`express`);
const router = express.Router();

/* GET home page. */
router.get(`/`, (req, res, next) => {
  res.render(`individual_contact`, { first_name: `Craig`, last_name: `Quincy` });
});

module.exports = router;
