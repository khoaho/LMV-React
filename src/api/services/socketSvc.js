import io from 'socket.io';
import EventEmitter from 'events';

export default class SocketSvc extends EventEmitter {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor(svcManager, opts) {

    super();

    svcManager.registerService(this);

    this._svcManager = svcManager;

    this._connections = {};

    this.handleConnection =
      this.handleConnection.bind(this);

    this.handleDisconnection =
      this.handleDisconnection.bind(this);

    this._io = io(opts.server);

    this._io.sockets.on(
      'connection',
      this.handleConnection);
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  name() {

    return 'SocketSvc';
  }

  ///////////////////////////////////////////////////////////////////
  // Socket Connection handler
  //
  ///////////////////////////////////////////////////////////////////
  handleConnection(socket) {

    var _thisSvc = this;

    _thisSvc._connections[socket.id] = socket;

    socket.on('disconnect', ()=> {

      _thisSvc.handleDisconnection(socket.id);
    });

    _thisSvc.emit('SocketSvc.Connection', {
      id: socket.id
    });

    console.log('Socket connected: ' + socket.id);
  }

  ///////////////////////////////////////////////////////////////////
  // Socket Disconnection handler
  //
  ///////////////////////////////////////////////////////////////////
  handleDisconnection(id) {

    var _thisSvc = this;

    _thisSvc.emit('SocketSvc.Disconnection', {
      id: id
    });

    if(_thisSvc._connections[id]){

      delete _thisSvc._connections[id];

      console.log('Socket disconnected: ' + id);
    }
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  broadcast(msgId, msg, filter) {

    var _thisSvc = this;

    for(var socketId in _thisSvc._connections){

      var socket = _thisSvc._connections[socketId];

      socket.emit(msgId, msg);
    }
  }
}