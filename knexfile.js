'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/continuous_contact_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/continuous_contact_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
