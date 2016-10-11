const Joi = require('joi');

module.exports = {
  session: {
    body: {
      email: Joi.string().required(),
    }
  }
}
