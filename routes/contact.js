'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../db/knex`);

/* GET home page. */
router.get(`/`, (req, res, next) => {
  res.render(`contact`, { first_name: `Craig`, last_name: `Quincy`,
    company: `Galvanize`, phone: `217-493-0549`, email: `craig@thebomb.com`,
    notes:`Craig is allergic to shellfish, do NOT go to jax`,
    address: `1023 Walnut Ave`, city: `Boulder`, co: `CO`, zip: `80302`});
});

/* read contact info, list interactions */
// router.get(`/:id`, (req, res, next) => {
//   // change true to req.session
//   if (true) {
//     let contact = new Object();
//
//     knex(`contacts`)
//       .where(`id`, req.params.id)
//       .first()
//       .then(data => {
//         contact = data;
//       })
//       .then(() => {
//         knex(`interactions`)
//           .where(`user_id`, 1) /* add req.sesion.id for integer */
//           .where(`contact_id`, req.params.id)
//           .innerJoin(`interaction_type`, `interactions.type_id`, `interaction_type.id`)
//           .then(data => {
//
//             res.render(`contact`, { contact: contact, interaction: data } )
//           })
//       })
//       .catch(err => { return err; });
//   } else {
//     // res.redirect(`/`);
//   }
// });

/* update contact---patch vs post, different routes, can i use .patch */
router.patch(`/`, (req, res, next) => {

});

/* delete contact */
router.delete(`/`, (req, res, next) => {

});

/* create new interaction */
router.post(`/interaction`, (req, res, next) => {

});

/* delete interaction */
router.delete(`/interaction`, (req, res, next) => {

});

module.exports = router;
