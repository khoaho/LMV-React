import express from 'express';
import mongo from 'mongodb';
import Debug from 'debug';
import fs from 'fs';

module.exports = function(svcManager) {

  var router = express.Router();

  var debug = Debug('ToolsAPI');

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/models', async (req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var pageQuery = {

      };

      if(req.query.skip)
        pageQuery.skip = req.query.skip;

      if(req.query.limit)
        pageQuery.limit = req.query.limit;

      var response = await modelSvc.getModels(
        {}, pageQuery);

      res.json(response);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  return router;
}
