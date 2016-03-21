import express from 'express';
import Debug from 'debug';

module.exports = function(svcManager) {

  var router = express.Router();

  var debug = Debug('ExtensionAPI');

  //////////////////////////////////////////////////////////////////////////////
  // return all extensions
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/', async (req, res)=> {

    try {

      var extensionSvc = svcManager.getService(
        'ExtensionSvc');

      var opts = {
        pageQuery:{
          id: 1,
          name: 1,
          options: 1
        },
        sort: {
          name: 1
        }
      }

      var response = await extensionSvc.getExtensions(opts);

      res.json(response);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  /////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////
  router.get('/script/:id', async(req, res)=> {

    try {

      var extensionSvc = svcManager.getService(
        'ExtensionSvc');

      var script = await extensionSvc.getScript(
        req.params.id);

      res.send(script);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  return router;
}
