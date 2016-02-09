import express from 'express';
import ModelSvc from '../services/modelSvc'

module.exports = function(db) {

    var router = express.Router();

    var modelSvc = new ModelSvc(db);

    ///////////////////////////////////////////////////////////////////////////////
    // api/models - Get all models
    //
    ///////////////////////////////////////////////////////////////////////////////
    router.get('/', async function(req, res) {

        try {

            var response = await modelSvc.getAll();

            res.json(response);
        }
        catch (error) {

            res.status(error.statusCode || 404);
            res.json(error);
        }
    });

    ///////////////////////////////////////////////////////////////////////////////
    // api/models - Get all models with all fields
    //
    ///////////////////////////////////////////////////////////////////////////////
    router.get('/all', async function(req, res) {

        try {

            var response = await modelSvc.getAll(
                {}, {});

            res.json(response);
        }
        catch (error) {

            res.status(error.statusCode || 404);
            res.json(error);
        }
    });

    /////////////////////////////////////////////////////////////////////
    // api/models/{modelId} - Get model by id
    //
    /////////////////////////////////////////////////////////////////////
    router.get('/:modelId', async function(req, res) {

        try {

            var response = await modelSvc.getById(
                req.params.modelId);

            res.json(response);
        }
        catch (error) {

            res.status(error.statusCode || 404);
            res.json(error);
        }
    });

    /////////////////////////////////////////////////////////////////////
    // api/models/{modelId} - Get model by id with all fields
    //
    /////////////////////////////////////////////////////////////////////
    router.get('/:modelId/all', async function(req, res) {

        try {

            var response = await modelSvc.getById(
                req.params.modelId, {});

            res.json(response);
        }
        catch (error) {

            res.status(error.statusCode || 404);
            res.json(error);
        }
    });

    return router;
}
