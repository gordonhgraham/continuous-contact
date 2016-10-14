'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../db/knex`);
const bcrypt = require(`bcrypt`);

/* GET home page. */
router.get(`/`, (req, res, next) => {
  knex(`contacts`)
    .where(`user_id`, 1)
    .orderBy(`first_name`)
    .then(contacts => {
      res.render(`user`, { contacts: contacts });
    });
});

router.post(`/login`, (req, res, next) => {
    knex(`users`)
        .where(`email`, req.body.email)
        .first()
        .then(function(results) {
          console.log(`2-`, results);
          if (results) {
            let user = results;
            let passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password);
            if (passwordMatch) {
              delete user.hashed_password;
              res.send(user);
            }
            else {
              throw new Error(400, `Bad email or password`)
            }
          }
        })
        .catch((err) => {
            next(err);
        })
});

router.post(`/signup`, (req,res,next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const hashed_password = bcrypt.hashSync(req.body.password, 12)

  knex(`users`)
    .insert({
      first_name: first_name,
      last_name: last_name,
      hashed_password : hashed_password,
      email : email
    }, '*')
  .then((users) => {
    const user = users[0];
    console.log("6-user " + user);
    delete user.hashed_password;
    req.session = users;
    res.send(user);
  })
  .catch((err) => {
    next(err);
});
});

// router.post(`/addContact` (req, res, next) => {
//   /* adds info from form to db */
// });

module.exports = router;
