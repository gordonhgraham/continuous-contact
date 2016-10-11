'use strict';

const express = require(`express`);
const router = express.Router();

/* GET home page. */
router.get(`/`, (req, res, next) => {
  res.send(`this doesn't work`);
});

module.exports = router;
