
`use strict`;

const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);
const knex = require(`../db/knex`);
const bcrypt = require(`bcrypt-as-promised`);


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
    bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
        return knex(`users`)
            .insert({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                hashed_password: hashed_password,
            }, `*`)
    })
    .then((users) => {
        const user = users[0];
        delete user.hashed_password;
        req.session.user_id = users;
        res.send(user);
    })
    .catch((err) => {
        next(err);
    });
});


// user login with email (read user)
router.post(`/login`, (req, res, next) => {
    knex(`users`)
        .where(`email`, req.body.email)
        .first()
        .then(function(results) {
            if (!results) {
                throw new Error(400, `Bad email or password`)
            } else {
                let user = results;
                let passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password);
                if (passwordMatch === false) {
                    throw new Error(400, `Bad email or password`)
                } else {
                    delete user.hashed_password
                    req.session.userId = user
                    res.send(user)
                }
            }
        })
        .catch((err) => {
            next(err);
        })
});

//validation??

// MB: NO NEED FOR USER SIGNUP REDIRECT W/PASSPORT - I THINK IT AUTO-REDIRECTS
// // user signup with Linkedin (create user)
// router.post(`/signup`, (req, res, next) => {
//   // wait to see what passport needs with this
// });
//
// // user login with Linkedin (read user)
// router.get(`/login`, (req, res, next) => {
//   // wait to see what passport needs with this...
//   res.render(`linkedin`)
// });

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
