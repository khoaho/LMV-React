import mongo from 'mongodb';

export default class ModelSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(svcManager, opts) {

    svcManager.registerService(this);

    this._svcManager = svcManager;

    this._config = opts.config;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name() {

    return 'ModelSvc';
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  getById(modelId, pageQuery = {}) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var fieldQuery = {
          _id: new mongo.ObjectId(modelId)
        };

        var model = await dbSvc.findOne(
          _thisSvc._config.collections.models,
          fieldQuery,
          pageQuery);

        return resolve(model);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  getModels(opts) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var models = await dbSvc.getItems(
          _thisSvc._config.collections.models, opts);

        return resolve(models);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  download(modelId, path) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var fieldQuery = {
          _id: new mongo.ObjectId(modelId)
        };

        var pageQuery = {
          urn: 1
        };

        var model = await dbSvc.findOne(
          _thisSvc._config.collections.models,
          fieldQuery,
          pageQuery);

        return resolve(model);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  ///////////////////////////////////////////////////////////////////
  // returns states sequence
  //
  ///////////////////////////////////////////////////////////////////
  getSequence(modelId) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var query = {
          _id: new mongo.ObjectId(modelId)
        };

        var fields = {
          sequence: 1
        };

        var model = await dbSvc.findOne(
          _thisSvc._config.collections.models,
          query,
          fields);

        return resolve(model.sequence);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  ///////////////////////////////////////////////////////////////////
  // set states sequence
  //
  ///////////////////////////////////////////////////////////////////
  setSequence(modelId, sequence) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var query = {
          _id: new mongo.ObjectId(modelId)
        };

        var opts = {
          $set: {
            sequence: sequence
          }
        };

        await dbSvc.update(
          _thisSvc._config.collections.models,
          query,
          opts);

        return resolve(sequence);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  ///////////////////////////////////////////////////////////////////
  // returns states
  //
  ///////////////////////////////////////////////////////////////////
  getStates(modelId) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var query = {
          _id: new mongo.ObjectId(modelId)
        };

        var fields = {
          states: 1
        };

        var model = await dbSvc.findOne(
          _thisSvc._config.collections.models,
          query,
          fields);

        return resolve(model.states);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  ///////////////////////////////////////////////////////////////////
  // adds new state
  //
  ///////////////////////////////////////////////////////////////////
  addState(modelId, state) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var query = {
          _id: new mongo.ObjectId(modelId)
        };

        var opts = {
          $push: {
            states: state,
            sequence: state.guid
          }
        };

        await dbSvc.update(
          _thisSvc._config.collections.models,
          query,
          opts);

        return resolve(state);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  ///////////////////////////////////////////////////////////////////
  // remove state
  //
  ///////////////////////////////////////////////////////////////////
  removeState(modelId, stateId) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var query = {
          _id: new mongo.ObjectId(modelId)
        };

        var opts = {
          $pull: {
            sequence: stateId,
            states: {guid: stateId}
          }
        };

      await dbSvc.update(
        _thisSvc._config.collections.models,
        query,
        opts);

        return resolve(stateId);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }
}
