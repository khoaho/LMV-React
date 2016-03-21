import express from 'express';
import Debug from 'debug';

module.exports = function(svcManager) {

  var router = express.Router();

  var debug = Debug('UserAPI');

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  router.get('/current', (req, res)=> {

    try {

      var userSvc = svcManager.getService('UserSvc');

      if (req.user) {

        var user = {
          name: req.user[userSvc.usernameField()],
          isAdmin: req.user[userSvc.adminField()],
          login: req.user[userSvc.loginField()]
        };

        return res.json(user);
      }

      if (userSvc.config().env == 'development') {

        var user = {
          name: 'Dev User',
          login: 'dev',
          isAdmin: true
        };

        return res.json(user);
      }

      res.status(401);
      return res.send('Unauthorized');
    }
    catch(error) {

      debug(error);

      res.status(404);
      res.send('Error');
    }
  });

  return router;
}
