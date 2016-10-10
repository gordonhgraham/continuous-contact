'use strict';

const express = require(`express`);
const exphbs = require(`express-handlebars`);
const path = require(`path`);
const logger = require(`morgan`);
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);
const passport = require('passport');
const cookieSession = require('cookie-session');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const routes = require(`./routes/index`);
const users = require(`./routes/users`);
const contacts = require(`./routes/contacts`);
const individual = require(`./routes/individual`);
const auth = require('./routes/auth');


const app = express();

// view engine setup
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `jade`);

app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));

app.use(`/`, routes);
app.use(`/users`, users);
app.use(`/contacts`, contacts);
app.use(`/individual`, individual);

//passport stuff
app.use(cookieSession({
  name: 'session',
  keys: [process.env['SECRET_KEY']]
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
  done(null, obj);
});

passport.use(new LinkedInStrategy({
    clientID: '78l9gagfa8y1e4',
    clientSecret: 'tebeZ6mNZqOrZOxd',
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true,
  },
  function(token, tokenSecret, profile, done) {
    console.log('Log1');
    process.nextTick(function () {
      console.log('Log2');
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
}));

//mount auth.js middleware
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Not Found`);
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get(`env`) === `development`) {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render(`error`, {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render(`error`, {
    message: err.message,
    error: {}
  });
});

module.exports = app;
