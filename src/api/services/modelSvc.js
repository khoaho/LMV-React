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

  //////////////////////////////////////////////////////////////////////////////
  // returns sequence map
  //
  ///////////////////////////////////////////////////////////////////////////////
  getSequences(modelId, full = false) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var query = {
          _id: new mongo.ObjectId(modelId)
        };

        var fields = {
          sequenceMap: 1
        };

        if(full){
          fields['stateMap'] = 1;
        }

        var model = await dbSvc.findOne(
          _thisSvc._config.collections.models,
          query,
          fields);

        if(full) {

          var response = {
            stateMap: model.stateMap,
            sequenceMap: model.sequenceMap
          };

          return resolve(response);
        }

        return resolve(model.sequenceMap);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // returns sequence and associated states
  //
  ///////////////////////////////////////////////////////////////////////////////
  getSequence(modelId, sequenceId) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var query = {
          _id: new mongo.ObjectId(modelId)
        };

        var fields = {
          stateMap: 1,
          sequenceMap: 1
        };

        var model = await dbSvc.findOne(
          _thisSvc._config.collections.models,
          query,
          fields);

        if(!model.sequenceMap[sequenceId]){
          return reject('Not found');
        }

        var sequence = model.sequenceMap[sequenceId];

        var response = {
          stateMap: {},
          sequence: sequence
        };

        sequence.stateIds.forEach(function(stateId) {

          response.stateMap[stateId] =
            model.stateMap[stateId];
        });

        return resolve(response);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }
}
