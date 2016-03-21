import Lockr from 'lockr';
import React from 'react';
import {env} from 'c0nfig';

export default class EmbedPage extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    const { user } = this.props;

    return (
      <div className="embed"
        ref={(c)=>this.viewerContainer=c}>
      </div>
    );
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  async componentDidMount() {

    const { id } = getUrlParams();

    var model = await getModel(id);

    var LMVDocument = await loadDocument(
      model.urn,
      () => getTokenSync('/api/lmv/token'));

    var pathCollection = await getViewablePath(
      LMVDocument);

    var path = pathCollection[0].path;

    this.loadViewable(model, path);
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  async loadViewable(model, path) {

    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(
      this.viewerContainer);

    viewer.initialize();

    var viewerToolbar = viewer.getToolbar(true);

    var ctrlGroup =  new Autodesk.Viewing.UI.ControlGroup(
      'LMV-React');

    viewerToolbar.addControl(ctrlGroup);

    const { extIds } = getUrlParams();

    var enabledExtensions = [
      '_Viewing.Extension.ControlSelector',
      ...(extIds ? extIds : '').split(';')
    ];

    var url = '/api/extensions/script/_Viewing.Extension.ExtensionManager';

    System.import(url).then(()=> {

      viewer.loadExtension('_Viewing.Extension.ExtensionManager', {
        waitEventsList: [
          Autodesk.Viewing.GEOMETRY_LOADED_EVENT
        ],
        enabledList: enabledExtensions,
        showHidden: env == 'development',
        parentControl: ctrlGroup,
        visible: false,
        apiUrl: '/api',
        model: model,
        storage:{
          enabled: false,
          Lockr: Lockr
        }
      });
    }, (error)=>{

      console.log(error);
    });

    viewer.load(path);
  }
}

/////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////
function loadDocument(urn, tokenFunc) {

  var promise = new Promise((resolve, reject)=> {

    try{

      var options = {
        env: 'AutodeskProduction',
        refreshToken: tokenFunc,
        getAccessToken: tokenFunc
      };

      Autodesk.Viewing.Initializer (options, ()=> {

        Autodesk.Viewing.Document.load(
          (urn.indexOf('urn:') == 0 ? '' : 'urn:') + urn,
          (LMVDocument)=> {

            return resolve(LMVDocument);
          });
      });
    }
    catch (ex){

      return reject('ex');
    }
  });

  return promise;
}

///////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////
function getViewablePath(LMVDocument) {

  var viewablePath = [];

  var rootItem = LMVDocument.getRootItem();

  var path3d = Autodesk.Viewing.Document.getSubItemsWithProperties(
    rootItem,
    { 'type': 'geometry', 'role': '3d' },
    true);

  path3d.forEach(function(path){
    viewablePath.push({
      type: '3d',
      name : path.name,
      path: LMVDocument.getViewablePath(path)
    });
  });

  var path2d = Autodesk.Viewing.Document.getSubItemsWithProperties(
    rootItem,
    { 'type': 'geometry', 'role': '2d' },
    true);

  path2d.forEach(function(path){
    viewablePath.push({
      type: '2d',
      name : path.name,
      path: LMVDocument.getViewablePath(path)
    });
  });

  return viewablePath;
}

///////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////
function getTokenSync(url) {

  var xhr = new XMLHttpRequest();

  xhr.open("GET", url, false);
  xhr.send(null);

  if(xhr.status != 200) {

    console.log('xrh error: ');
    console.log(xhr.statusText + ':' + xhr.status);
    return '';
  }

  var response = JSON.parse(
    xhr.responseText);

  return response.access_token;
}

///////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////
function getUrlParams() {

  var params = {};

  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function (str, key, value) {
      params[key] = value;
    });

  return params;
}

///////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////
function getModel(id){

  return new Promise((resolve, reject)=> {

    try {

      $.get(`/api/models/${id}`, (model)=>{

        return resolve(model);
      });
    }
    catch(ex){

      reject(ex);
    }
  });
}