'use strict';

module.exports = {
  development: {
    client: `pg`,
    connection: `postgres://localhost/ccontact_dev`
  },

  test: {
    client: `pg`,
    connection: `postgres://localhost/ccontact_test`
  },

  production: {
    client: `pg`,
    connection: process.env.DATABASE_URL
  }
};
