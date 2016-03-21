import Lockr from 'lockr';
import React from 'react';
import {env} from 'c0nfig';

export default class ViewerPage extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    const { user } = this.props;

    return (
        <div className="viewer"
             ref={(c)=>this.viewerContainer=c}>
        </div>
    );
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  async componentDidMount() {

    var urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLTMwLjA3LjIwMTUtMTUuNTIuNTIvTEhDLmR3Zng=';

    var pathCollection = await getViewablePathFromUrn(urn, '/api/lmv/token');
    var path = pathCollection[0].path;
    this.loadViewable(path);

    //var path = '/models/prelude/prelude.svf';
    //Autodesk.Viewing.Initializer ({env: 'Local'}, ()=> {
    //  this.loadViewable(path);
    //});
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  async loadViewable(path) {

    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(
      this.viewerContainer);

    viewer.initialize();

    var viewerToolbar = viewer.getToolbar(true);

    var ctrlGroup =  new Autodesk.Viewing.UI.ControlGroup(
      'Prelude');

    viewerToolbar.addControl(ctrlGroup);

    var enabledExtensions = [
      '_Viewing.Extension.ControlSelector'
    ];

    var defaultOptions = {

      '_Viewing.Extension.ControlSelector': {
        waitEvents: [Autodesk.Viewing.GEOMETRY_LOADED_EVENT],
        storageKey: 'prelude',
        Lockr: Lockr
      }
    }

    var url = '/api/extensions/script/_Viewing.Extension.ExtensionManager';

    System.import(url).then(()=> {

      viewer.loadExtension('_Viewing.Extension.ExtensionManager', {
        waitEventsList: [
          Autodesk.Viewing.GEOMETRY_LOADED_EVENT
        ],
        defaultOptions: defaultOptions,
        enabledList: enabledExtensions,
        parentControl: ctrlGroup,
        showHidden: env == 'development',
        visible: env == 'development',
        apiUrl: '/api',
        storage:{
          key: 'ExtensionManager.' + this.props.user.login,
          enabled: true,
          Lockr:  Lockr
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
function getViewablePathFromUrn(urn, tokenUrl) {

  var promise = new Promise((resolve, reject)=> {

   try{

     var options = {
       env: 'AutodeskProduction',
       refreshToken: ()=> {return getTokenSync(tokenUrl)},
       getAccessToken: ()=> {return getTokenSync(tokenUrl)}
     };

     Autodesk.Viewing.Initializer (options, ()=> {

       Autodesk.Viewing.Document.load(
         'urn:' + urn,
         (LMVDocument)=> {

           var patchCollection = getViewablePath(
             LMVDocument);

           return resolve(patchCollection);
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