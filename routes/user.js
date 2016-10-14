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

// router.post(`/`, (req, res, next) => {
//   console.log('0-',req.body);
//   console.log(`1- route login`);
//     knex(`users`)
//         .where(`email`, req.body.email)
//         .first()
//         .then(function(results) {
//           if (results) {
//             console.log(`2-`, results);
//             let user = results;
//             let passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password);
//             // let passwordMatch = true;
//              console.log(`3-password match`,passwordMatch);
//              console.log('3.5-req.body.password',req.body.password,user.hashed_password);
//             if (req.body.password == user.hashed_password) {
//               console.log(`4-authenticated user`,user);
//               delete user.hashed_password;
//               res.send(user);
//               console.log(`5-rendering`);
//               // res.render('user',{user:user})
//               // res.render('user');
//             }
//             else {
//               console.log(`6-throwing new error`);
//               throw new Error(400, `Bad email or password`)
//             }
//           }
//         })
//         .catch((err) => {
//             next(err);
//         })
// });

// router.post(`/addContact` (req, res, next) => {
//   /* adds info from form to db */
// });

module.exports = router;
