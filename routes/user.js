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
  // console.log('0-',req.body);
  // console.log(`1- route login`);
    knex(`users`)
        .where(`email`, req.body.email)
        .first()
        .then(function(results) {
          if (results) {
            // console.log(`2-`, results);
            let user = results;
            let passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password);
            // let passwordMatch = true;
            //  console.log(`3-password match`,passwordMatch);
            //  console.log('3.5-req.body.password',req.body.password,user.hashed_password);
            if (req.body.password == user.hashed_password) {
              // console.log(`4-authenticated user`,user);
              delete user.hashed_password;
              res.send(user);
              // console.log(`5-rendering`);
              // res.render('user',{user:user})
              // res.render('user');
            }
            else {
              // console.log(`6-throwing new error`);
              throw new Error(400, `Bad email or password`)
            }
          }
        })
        .catch((err) => {
            next(err);
        })
});

router.post(`/signup`, (req,res,next) => {
  console.log("1- SIGNUP ROUTE IS FIRING");
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const hashed_password = bcrypt.hashSync(req.body.password, 12)

  console.log("2-first name" + first_name);
  console.log("3-last name" + last_name);
  console.log("4-email" + email);
  console.log("5-password" + hashed_password);
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
