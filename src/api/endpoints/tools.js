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

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/models/:modelId', async (req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var response = await modelSvc.getById(
        req.params.modelId);

      res.json(response);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/models/save/:modelId', async (req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var model = await modelSvc.getById(
        req.params.modelId);

      fs.writeFile('tmp/' + model._id + '.json',
        JSON.stringify(model, null, 2), (err)=>{

          res.json(model);
        });
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/models/load/:modelId', async (req, res)=> {

    try {


    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  return router;
}
