'use strict';

const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const LinkedInStrategy = require(`passport-linkedin-oauth2`).Strategy;

const knex = require(`../db/knex`);

// passport config--localStrategy
passport.use(new LocalStrategy({
  usernameField: `email`,
  passwordField: `password`,
  passReqToCallback: true
}, (email, password, done) => {
    console.log(`initiate callback of LocalStrategy`);
    knex(`users`).where(`email`, email).first().then((user) => {
      console.log(user);

      if (err) { return done(err); }
      // if (!user) {
      //   console.log(`user not found`);
      //   return done(null, false);
      // }
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: `Incorrect password.` });
      // }
      if (req.body.password === user.hashed_password) {
        console.log(user);
        return done(null, user);
      }
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


// // passport config--LinkedinStrategy
// passport.use(new LinkedInStrategy({
//   clientID: `	78l9gagfa8y1e4`,
//   clientSecret: `tebeZ6mNZqOrZOxd`,
//   callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
//   scope: [`r_emailaddress`, `r_basicprofile`],
// }, function(accessToken, refreshToken, profile, done) {
//   // asynchronous verification, for effect...
//   process.nextTick(function () {
//     // To keep the example simple, the user's LinkedIn profile is returned to
//     // represent the logged-in user. In a typical application, you would want
//     // to associate the LinkedIn account with a user record in your database,
//     // and return that user instead.
//     return done(null, profile);
//   });
// }));

module.export = passport;
