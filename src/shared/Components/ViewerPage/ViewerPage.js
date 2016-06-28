import Lockr from 'lockr';
import React from 'react';
import {env} from 'c0nfig';
import ViewerToolkit from 'ViewerToolkit';

export default class ViewerPage extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    const { user } = this.props;

    return (
        <div className="viewer" ref={(c)=>this.viewerContainer=c}>
        </div>
    );
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  async componentDidMount() {

    const { id, pathIdx, path, urn } = getUrlParams();

    var model = null

    if(urn) {

      model = {
        urn: urn
      }
    }
    else {

      model = await getModelById(id);
    }

    if(path){

      console.log('local')

      Autodesk.Viewing.Initializer ({env: 'Local'}, ()=> {

        this.loadViewable(model, path);
      });
    }
    else {

      var LMVDocument = await ViewerToolkit.loadDocument(
        model.urn, '/api/lmv/token');

      var pathCollection = await ViewerToolkit.getViewablePath(
        LMVDocument);

      this.loadViewable(
        model,
        pathCollection[pathIdx || 0].path);
    }
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  async loadViewable(model, path) {

    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(
      this.viewerContainer);

    viewer.initialize();

    viewer.addEventListener(
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
      this.onGeometryLoaded)

    var viewerToolbar = viewer.getToolbar(true);

    var ctrlGroup = new Autodesk.Viewing.UI.ControlGroup(
      'LMV-React');

    viewerToolbar.addControl(ctrlGroup);

    var enabledExtensions = [
      '_Viewing.Extension.ControlSelector'
    ];

    viewer.loadExtension('_Viewing.Extension.ExtensionManager', {
      waitEventsList: [
        Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
        Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT
      ],
      enabledList: enabledExtensions,

      showHidden: env == 'development',
      parentControl: ctrlGroup,
      visible: true,
      apiUrl: '/api',
      model: model,
      storage:{
        key: 'ExtensionManager.' + this.props.user.login,
        enabled: env == 'development',
        Lockr:  Lockr
      }
    });

    viewer.load(path);
  }

  //////////////////////////////////////////////////////////////////////////
  // geometry loaded callback
  //
  //////////////////////////////////////////////////////////////////////////
  onGeometryLoaded (e) {

    var viewer = e.target

    viewer.setLightPreset(1)

    setTimeout(()=> {

      viewer.setLightPreset(0)

      viewer.setBackgroundColor(
        122, 198, 255,
        219, 219, 219)

    }, 100)
  }
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
function getModelById(id){

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