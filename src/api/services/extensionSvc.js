import fs from 'fs';
import path from 'path';
import mongo from 'mongodb';
import BaseSvc from './baseSvc.js'

export default class ExtensionSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(svcManager, opts) {

    super('ExtensionSvc', svcManager, opts);
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  getExtensions(opts = {}) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var extensions = await dbSvc.getItems(
          this._config.collections.extensions,
          opts);

        return resolve(extensions);
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
  getScript(extensionId) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var query = {
          id: extensionId
        }

        var extension = await dbSvc.findOne(
          this._config.collections.extensions,
          query);

        var scriptExt = this._config.env == 'development' ?
          '.js' : '.min.js';

        var filename = path.resolve(
          this._config.extensionsFolder,
          extension.id + '/' + extension.id + scriptExt);

        fs.readFile(filename, 'utf8', (err, data)=> {

          if (err) {
            return reject(err);
          }

          return resolve(data);
        });
      }
      catch(ex){

        return reject(ex);
      }
    });
  }
}
