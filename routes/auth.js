const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieSession = require('cookie-session');

router.get('*', function(req,res,next) {
  console.log('AUTH ROUTE FIRED');
  next();
})

router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/contacts',
  failureRedirect: '/individual'
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
