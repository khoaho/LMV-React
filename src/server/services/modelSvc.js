/////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////
import mongo from 'mongodb';
import util from 'util';

class ModelSvc {

    constructor(database) {

        this.db = database;
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    getAll(fieldQuery, pageQuery) {

        var db = this.db;

        var _fieldQuery = fieldQuery || {};

        var _pageQuery = pageQuery || {
                name: 1,
                urn:1
            };

        var promise = new Promise((resolve, reject)=> {

            db.collection('gallery.models', (err, collection)=> {

                if (err) {
                    reject(err);
                    return;
                }

                collection.find(_fieldQuery, _pageQuery)
                    .sort({name: 1}).toArray((err, models)=> {

                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(models);
                    });
            });
        });

        return promise;
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    getById(modelId, pageQuery) {

        var db = this.db;

        var _pageQuery = pageQuery || {
                name: 1,
                urn:1
            };

        var promise = new Promise((resolve, reject)=> {

            if (modelId.length !== 24) {
                reject('Invalid model id: ' + modelId);
                return;
            }

            db.collection('gallery.models', (err, collection)=> {

                if (err) {
                    reject(err);
                    return;
                }

                collection.findOne(
                    {'_id': new mongo.ObjectId(modelId)},
                    _pageQuery,
                    (err, model)=> {

                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(model);
                    });
            });
        });

        return promise;
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////

}

export default ModelSvc;
