/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2016 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

import fs from 'fs';
import path from 'path';
import util from 'util';
import zlib from 'zlib';
import oboe from 'oboe';
import mkdirp from 'mkdirp';
import mongo from 'mongodb';
import stream from 'stream';
import crypto from 'crypto';

export default class MongoDbSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(svcManager, opts) {

    svcManager.registerService(this);

    this._svcManager = svcManager;

    this.config = opts.config;

    this._db = null;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name() {

    return 'MongoDbSvc';
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getConnectionURL() {

    var _thisSvc = this;

    if (_thisSvc.config.user.length &&
        _thisSvc.config.pwd.length) {

      return util.format('mongodb://%s:%s@%s:%d/%s',
        _thisSvc.config.user,
        _thisSvc.config.pwd,
        _thisSvc.config.host,
        _thisSvc.config.port,
        _thisSvc.config.database);
    }
    else {

      return util.format('mongodb://%s:%d/%s',
        _thisSvc.config.host,
        _thisSvc.config.port,
        _thisSvc.config.database);
    }
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  connect() {

    var _thisSvc = this;

    var promise = new Promise((resolve, reject)=> {

      var url = _thisSvc.getConnectionURL();

      var client = mongo.MongoClient;

      client.connect(url, (err, db)=> {

        if (err) {

          return reject(err);
        }
        else {

          _thisSvc._db = db;

          return resolve(db);
        }
      });
    });

    return promise;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getDb() {

    var _thisSvc = this;

    return new Promise((resolve, reject)=> {

      try{

        if(_thisSvc._db) {

          return resolve(_thisSvc._db);
        }
        else {

          return _thisSvc.connect();
        }
      }
      catch(ex){

        reject(ex);
      }
    });
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getCollection(collectionName) {

    var _thisSvc = this;

    return new Promise((resolve, reject)=> {

      try{

        _thisSvc._db.collection(collectionName,
          (err, collection)=> {

            if (err) {

              return reject(err);
            }

            return resolve(collection);
          });
      }
      catch(ex){

        reject(ex);
      }
    });
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  insert(collectionName, item) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try{

        var collection = await _thisSvc.getCollection(
          collectionName);

        collection.insert(item, {w:1}, (err, result)=>{

          if (err) {

            return reject(err);
          }

          return resolve(item);
        });
      }
      catch(ex){

        reject(ex);
      }
    });
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  findOne(collectionName, query, fields) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try{

        var collection = await _thisSvc.getCollection(
          collectionName);

        collection.findOne(query, fields || {}, (err, dbItem)=> {

          if(err){
            return reject(err);
          }

          if(!dbItem) {
            return reject('Not Found');
          }

          return resolve(dbItem);
        });
      }
      catch(ex){

        reject(ex);
      }
    });
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  findOrCreate(collectionName, item, query) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try{

        var collection = await _thisSvc.getCollection(
          collectionName);

        collection.findOne(query, {}, (err, dbItem)=> {

          if(err){
            return reject(err);
          }

          if(dbItem) {

            return resolve(dbItem);
          }

          return _thisSvc.insert(collectionName, item);
        });
      }
      catch(ex){

        reject(ex);
      }
    });
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  updateItem(collectionName, item) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try{

        if(typeof item._id == 'string') {
          item._id = new mongo.ObjectId(item._id);
        }

        var collection = await _thisSvc.getCollection(
          collectionName);

        collection.update(
          {_id: item._id},
          item, (err, res)=> {

          if(err){
            return reject(err);
          }

          return resolve(res);
        });
      }
      catch(ex){

        reject(ex);
      }
    });
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  distinct(collectionName, key) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try{

        var collection = await _thisSvc.getCollection(
          collectionName);

        collection.distinct(key, function(err, values) {

          if (err) {

            return reject(err);
          }

          return resolve(values);
        });
      }
      catch(ex){

        reject(ex);
      }
    });
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getCursor(collectionName, opts) {

    var _thisSvc = this;

    var promise = new Promise((resolve, reject)=> {

      opts = opts || {};

      var fieldQuery = opts.fieldQuery || {};

      var pageQuery = opts.pageQuery || {};

      var sort = opts.sort || {};

      _thisSvc._db.collection(collectionName, (err, collection)=> {

        if (err) {

          return reject(err);
        }

        var cursor = collection.find(
          fieldQuery,
          pageQuery).sort(sort);

        return resolve(cursor);
      });
    });

    return promise;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getItems(collectionName, opts) {

    var _thisSvc = this;

    var promise = new Promise(async(resolve, reject)=> {

      try {

        var cursor = await _thisSvc.getCursor(
          collectionName, opts);

        cursor.toArray((err, items)=> {

          if (err) {

            return reject(err);
          }

          return resolve(items);
        });
      }
      catch(ex){

        return reject(ex);
      }
    });

    return promise;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  removeCollection(name, opts) {

    var _thisSvc = this;

    var promise = new Promise((resolve, reject)=> {

      _thisSvc._db.collection(name, (err, collection)=> {

        if (err) {
          return reject(err);
        }

        collection.remove({}, (err, result)=> {

            if (err) {
              return reject(err);
            }

            return resolve(result);
          });
      });
    });

    return promise;
  }
}

/////////////////////////////////////////////////////////////////////
// create if not exists
//
/////////////////////////////////////////////////////////////////////
async function createDirectory(path, opts){

  var promise = new Promise(async(resolve, reject)=>{

    try {

      mkdirp(path, opts || {}, (err)=>{

        if (err) {
          return reject(err);
        }
        return resolve();
      });
    }
    catch (ex){

     return reject(ex);
    }
  });

  return promise;
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function writeCursorToFile(cursor, filename) {

  var promise = new Promise((resolve, reject)=> {

    try {

      var wstream = fs.createWriteStream(filename);

      wstream.write('[');

      var cursorStream = cursor.stream();

      cursorStream.on('error', (err)=> {
        return reject(err);
      });

      var separator = '';

      cursorStream.on('data', function (item) {
        wstream.write(separator + JSON.stringify(
          item, null, 2));
        separator = ',';
      });

      cursorStream.on('end', function() {
        wstream.write(']');
        wstream.end();
        return resolve();
      });
    }
    catch(ex){

      return reject(ex);
    }
  });

  return promise;
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function guid(size) {

  size = size || 14;

  var pattern = '';

  for(var i=1; i <= size; ++i)
    pattern += (i%5 ? 'x' : '-');

  var d = new Date().getTime();

  var guid = pattern.replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });

  return guid;
}