
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var express = require('express');

module.exports = function(svcManager) {

  var router = express.Router();

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  passport.use('user', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    }, async(username, password, done)=> {

    try {

      var userSvc = svcManager.getService('UserSvc');

      var user = await userSvc.getUser(
        username,
        password);

      return done(null, user);
    }
    catch(ex){

      return done(null, false, {
        message: 'Incorrect Credentials'
      });
    }
  }));

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  router.post('/login', passport.authenticate('user'), (req, res)=> {

    if (req.user) {

      res.json('success');
    }
    else {

      res.status(401);
      res.json('Unauthorized');
    }
  });

  router.post('/logout', (req, res)=> {

    req.logout();
    res.send('logged out');
  });

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  passport.serializeUser((user, done)=> {

    done(null, user);
  });

  passport.deserializeUser((user, done)=> {

    done(null, user);
  });

  return router;
}