import Lockr from 'lockr';
import React from 'react';
import {env} from 'c0nfig';
import ViewerToolkit from 'ViewerToolkit';

export default class EmbedPage extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    const { user } = this.props;

    return (
      <div className="embed" ref={(c)=>this.viewerContainer=c}>
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

    var LMVDocument = await ViewerToolkit.loadDocument(
      model.urn,
      '/api/lmv/token');

    var pathCollection = await ViewerToolkit.getViewablePath(
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

    let { extIds, options } = getUrlParams();

    var enabledExtensions = [
      '_Viewing.Extension.ControlSelector',
      ...(extIds ? extIds : '').split(';')
    ];

    var _options = {
      waitEventsList: [
        Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
        Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT
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
    };

    if(options) {

      options = Autodesk.Viewing.Private.getParameterByName("options");

      options = replaceAll(options, "'", "");

      Object.assign(_options,
        JSON.parse(options));
    }

    viewer.loadExtension(
      '_Viewing.Extension.ExtensionManager',
      _options);

    viewer.load(path);
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

///////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////
function replaceAll (str, find, replace) {

  return str.replace(new RegExp(
      find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
    replace);
};