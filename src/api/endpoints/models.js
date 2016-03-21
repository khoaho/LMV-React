import express from 'express';
import Debug from 'debug';

module.exports = function(svcManager) {

  var router = express.Router();

  var debug = Debug('ModelAPI');

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/', async (req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var pageQuery = {
        viewablePath: 1,
        name: 1,
        urn: 1
      };

      if(req.query.skip)
        pageQuery.skip = req.query.skip;

      if(req.query.limit)
        pageQuery.limit = req.query.limit;

      var response = await modelSvc.getModels({
          fieldQuery:{},
          pageQuery: pageQuery
        });

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
  router.get('/:modelId', async (req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var pageQuery = {
        viewablePath: 1,
        name: 1,
        urn: 1
      };

      var response = await modelSvc.getById(
        req.params.modelId, pageQuery);

      res.json(response);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  // return all sequences and all states (only for debug)
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/:modelId/states/sequences/all', async (req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var response = await modelSvc.getSequences(
        req.params.modelId, true);

      res.json(response);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  // returns sequence map
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/:modelId/states/sequences', async (req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var sequences = await modelSvc.getSequences(
        req.params.modelId
      );

      res.json(sequences);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  // returns sequence and associated states
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/:modelId/states/sequences/:sequenceId', async (req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var sequences = await modelSvc.getSequence(
        req.params.modelId,
        req.params.sequenceId
      );

      res.json(sequences);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  return router;
}
