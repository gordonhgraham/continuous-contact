require(`dotenv`).load()
const express = require(`express`);
const session = require(`express-session`);
const exphbs = require(`express-handlebars`);
const path = require(`path`);
// const favicon = require(`serve-favicon`);
const logger = require(`morgan`);
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);

const bcrypt = require(`bcrypt`);

const routes = require(`./routes/index`);
const user = require(`./routes/user`);
const contact = require(`./routes/contact`);
// const users = require(`./routes/users`);

const LinkedInStrategy = require(`passport-linkedin-oauth2`).Strategy;
const passport = require(`passport`);
const app = express();

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: [`r_emailaddress`, `r_basicprofile`],
  state: true
}, (accessToken, refreshToken, profile, done) => {
  console.log("passport LinkedIN, profile: " + profile);
  // process.nextTick(function() {
  //   if (!req.user) {
  //     knex('users')
  //       .where('link')
  //   }
  // })
  done(null, profile)
}));

app.engine(`handlebars`, exphbs({defaultLayout: `main`}));
app.set(`view engine`, `handlebars`);

app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));
app.use(session({
  secret: `keyboard cat`,
  resave: false,
  saveUninitialized: false
}));

// init passport
app.use(passport.initialize());

// passport session
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user)
});
app.get(`/auth/linkedin`,
  passport.authenticate(`linkedin`),
  (req, res) => {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });
app.get(`/auth/linkedin/callback`, passport.authenticate(`linkedin`, {
  successRedirect: `/user`,
  failureRedirect: `./views/error`
}));
app.use((req, res, next) => {
  if (!req.session.passport) {
    app.locals.user = null;
  } else {
    app.locals.user = req.session.passport.user;
  }
  next();
});

app.use(`/`, routes);
app.use(`/user`, user);
app.use(`/contact`, contact);
// app.use(`/users`, users);

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
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render(`error`, {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render(`error`, {
    message: err.message,
    error: {}
  });
});

module.exports = app;
