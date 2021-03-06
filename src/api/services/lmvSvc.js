import Lmv from 'view-and-data'
import BaseSvc from './baseSvc'

export default class LmvSvc extends BaseSvc {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(svcManager, opts) {

    super('LmvSvc', svcManager, opts);

    this._Lmv = new Lmv(opts.config);

    this._Lmv.initialize();
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  getLmv() {

    return this._Lmv;
  }
}
