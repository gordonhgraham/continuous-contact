
`use strict`;

const express = require(`express`);
const router = express.Router();

router.get('/', function(req, res, next){
  console.log("Fired");
  res.render('error')
})
const passport = require(`passport`);
const knex = require(`../db/knex`);
const bcrypt = require(`bcrypt`);


router.get(`/`, (req,res,next) => {
  console.log(`USER RENDER IS FIRING`);
  res.render(`user`)
})

// display contacts page...res.redirect (list contacts)
router.get(`/`, (req, res, next) => {
  console.log(`CONTACTS RENDER IS FIRING AND IT SHOULD NOT BE`);
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
  console.log('0-',req.body);
  console.log(`1- route login`);
    knex(`users`)
        .where(`email`, req.body.email)
        .first()
        .then(function(results) {
          if (results) {
            console.log(`2-`, results);
            let user = results;
            let passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password);
            // let passwordMatch = true;
             console.log(`3-password match`,passwordMatch);
             console.log('3.5-req.body.password',req.body.password,user.hashed_password);
            if (req.body.password == user.hashed_password) {
              console.log(`4-authenticated user`,user);
              delete user.hashed_password;
              // res.send(user);
              console.log(`5-rendering`);
              // res.render('user',{user:user})
              res.render('user');
            }
            else {
              console.log(`6-throwing new error`);
              throw new Error(400, `Bad email or password`)
            }
          }


            // if (!results) {
            //     throw new Error(400, `Bad email or password`)
            // } else {
            //   console.log(`2-`,results);
            //     let user = results;
            //     let passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password);
            //     if (passwordMatch === false) {
            //         throw new Error(400, `Bad email or password`)
            //     } else {
            //       console.log(`3-`,user);
            //         delete user.hashed_password
            //         req.session.userId = user
            //         // knex('contacts')
            //         //   .where(`user_id`, user.id)
            //         res.send(user)
            //     }
            // }
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
