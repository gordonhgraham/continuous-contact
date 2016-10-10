'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../db/knex`);



// read contact
/* still need to list interactions
--probably needs to go in router.get for contacts page */
router.get(`/:id`, (req, res, next) => {
  // const userId = req.session.id;
  // uncomment and change .where(`user_id`, 1) to userId
  const contactId = req.params.id;
  let baldwin = {};

  knex(`contacts`)
    .where(`user_id`, 1)
    .where(`id`, contactId)
    .then(contact => {
      // baldwin was just a test, i have to go back and
      // fix this...can't remember what was going on --GG

      baldwin = contact[0];

      // res.send(contact);
      // res.render(`individual.hbs`, {{contact}})
    })
    .then(() => {
      knex(`interactions`)
        .where(`user_id`, 1)
        .where(`contact_id`, 1)
        .innerJoin(`type_id`, `interactions.type_id`, `interaction_type.id`)
        .then(data => {
          console.log(data);
          // console.log(baldwin);

          // res.send(true)
        })
    })
    .catch(err => { res.send(err);
    });
});

// update contact
router.patch(`/:id`, (req, res, next) => {
  // const userId = req.session.id;
  // uncomment and change .where(`user_id`, 1) to userId
  const contactId = req.params.id;
  const updates = req.body;

  knex(`contacts`)
  .where(`user_id`, 1)
  .where(`id`, contactId)
  .update(updates, `*`)
  .then(updatedContact => {
    // res.render the updated Contact object
    res.render(`individual.hbs`, updatedContact);
  })
  .catch(err => {
    if (err) { res.send(err); }
  });
});

// delete contact
router.delete(`/:id`, (req, res, next) => {
  // const userId = req.session.id;
  // uncomment and change .where(`user_id`, 1) to userId
  const contactId = req.params.id;

  knex(`contacts`)
  .where(`user_id`, 1)
  .where(`id`, contactId)
  .del()
  .then(() => {
    res.redirect(`/contacts`);
  })
  .catch(err => {
    if (err) { res.send(err); }
  });
});

// create interaction
router.post(`/int`, (req, res, next) => {
  //
});

// delete interaction
router.delete(`/int`, (req, res, next) => {
  //
});

module.exports = router;
