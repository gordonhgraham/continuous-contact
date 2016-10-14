'use strict';

const environment = process.env.NODE_ENV || `development`;
const knexConfig = require(`../knexfile`)[environment];
const knex = require(`knex`)(knexConfig);

module.exports.findOrCreate= function(profile, cb2) {
    knex('users')
    .where({email: JSON.parse(profile).email-address})
    .then(function (user){
        if (user.length > 0){
            cb2(null, user);
        }
        else {
            knex('users')
            .insert({
                first_name: profile.first-name,
                last_name: profile.last-name,
                email: JSON.parse(profile._raw).email-address,
                linkedin_url: profile.public-profile-url
            })
            .returning('*')
            .then(function (user){
                cb2(null, user);
            })
        }
    })
};

module.exports = knex;
