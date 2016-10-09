'use strict';

const express = require(`express`);
const router = express.Router();
const knex = require(`../db/knex`);


/* GET contact page. */
/* list interactions--probably needs to go in router.get for contacts page */
router.get(`/:id`, (req, res, next) => {
  // const userId = req.session.id;
  // uncomment and change .where(`user_id`, 1) to userId
  const contactId = req.params.id;

  knex(`contacts`)
    .where(`user_id`, 1)
    .where(`id`, contactId)
    .then(contact => {
      res.send(contact);

      // res.render(`individual.hbs`, {{contact}})
    })
    .next(err => {
      if (err) { res.send(err); }
    });
});

/* update contact */
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

/* delete contact */
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


/* create interaction */


/* delete interaction */


module.exports = router;
