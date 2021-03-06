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
  // return states sequence
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/:modelId/states/sequence', async(req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var response = await modelSvc.getSequence(
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
  // save states sequence
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.post('/:modelId/states/sequence', async(req, res)=> {

    try {

      var sequence = req.body.sequence;

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var response = await modelSvc.setSequence(
        req.params.modelId,
        sequence);

      res.json(response);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  // return all states
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/:modelId/states', async(req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var response = await modelSvc.getStates(
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
  // remove state
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.post('/:modelId/states/:stateId/remove', async(req, res)=> {

    try {

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var response = await modelSvc.removeState(
        req.params.modelId,
        req.params.stateId);

      res.json(response);
    }
    catch (error) {

      debug(error);

      res.status(error.statusCode || 404);
      res.json(error);
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  // adds new state
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.post('/:modelId/states', async(req, res)=> {

    try {

      var state = req.body.state;

      var modelSvc = svcManager.getService(
        'ModelSvc');

      var response = await modelSvc.addState(
        req.params.modelId,
        state);

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
