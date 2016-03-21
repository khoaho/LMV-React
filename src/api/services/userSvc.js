import BaseSvc from './baseSvc'

export default class UserSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(svcManager, opts) {

    super('UserSvc', svcManager, opts);
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  usernameField() {

    return this._config.usernameField;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  adminField() {

    return this._config.adminField;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  loginField() {

    return this._config.loginField;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getUser(login, password) {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var query = {};

        query[_thisSvc._config.passwordField] =
          password;

        if(login){

          query[_thisSvc._config.loginField] =
            new RegExp('^' + login + '$', 'i');
        }
        else {
          return reject('Invalid credentials');
        }

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var user = await dbSvc.findOne(
          _thisSvc._config.collections.users,
          query);

        return resolve(user);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getUsers() {

    var _thisSvc = this;

    return new Promise(async(resolve, reject)=> {

      try {

        var dbSvc = _thisSvc._svcManager.getService(
          'MongoDbSvc');

        var users = await dbSvc.getItems(
          _thisSvc._config.collections.users);

        return resolve(users);
      }
      catch(ex){

        return reject(ex);
      }
    });
  }
}


function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}