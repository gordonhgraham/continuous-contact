'use strict';

const passport = require(`passport`)
const LocalAPIKeyStrategy = require(`passport-localapikey`).Strategy;
const LinkedInStrategy = require(`passport-linkedin`).Strategy;

// use passport
passport.use(new LocalAPIKeyStrategy(
  function(apikey, done) {
    User.findOne({ apikey: apikey }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(new LinkedInStrategy({
    consumerKey: `78l9gagfa8y1e4`,
    consumerSecret: `tebeZ6mNZqOrZOxd`,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));



module.exports = passport;
