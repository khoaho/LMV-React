import express from 'express';
import Debug from 'debug';

module.exports = function(svcManager) {

  var router = express.Router();

  var debug = Debug('LMVAPI');

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  router.get('/token', async(req, res)=> {

    try {

      var lmvSvc = svcManager.getService(
        'LmvSvc');

      var lmv = lmvSvc.getLmv();

      var token = await lmv.getToken();

      return res.json(token);
    }
    catch(error) {

      debug(error);

      res.status(404);
      res.send('Error');
    }
  });

  return router;
}
