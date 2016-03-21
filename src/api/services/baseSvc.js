import EventEmitter from 'events';

export default class BaseSvc extends EventEmitter {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(name, svcManager, opts) {

    super();

    this._name = name;

    this._config = opts.config;

    this._svcManager = svcManager;

    svcManager.registerService(this);
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name() {

    return this._name;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  config() {

    return this._config;
  }
}