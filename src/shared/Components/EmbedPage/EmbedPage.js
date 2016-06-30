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
  componentDidMount() {

    const { id, controls } = getUrlParams();

    var ids = id.split(';')

    ids.forEach(async(modelId) => {

      var model = await getModel(modelId);

      var LMVDocument = await ViewerToolkit.loadDocument(
        model.urn, '/api/lmv/token');

      var pathCollection = await ViewerToolkit.getViewablePath(
        LMVDocument);

      var path = pathCollection[0].path;

      this.loadViewable(model, path, {
        controls
      });
    })
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  async loadViewable(model, path, viewerOptions) {

    var viewer = null, ctrlGroup = null

    if (viewerOptions.controls) {

      viewer = new Autodesk.Viewing.Private.GuiViewer3D(
        this.viewerContainer)

      var viewerToolbar = viewer.getToolbar(true);

      var ctrlGroup = new Autodesk.Viewing.UI.ControlGroup(
        'lmv-react-ctrl-group');

      viewerToolbar.addControl(ctrlGroup);

    } else {

      viewer = new Autodesk.Viewing.Viewer3D(
        this.viewerContainer)

      var html = `
        <div id="lmv-react-toolbar-container">
        </div>
        `
      $(viewer.container).append(html)

      $('#lmv-react-toolbar-container').css({
        bottom: '0px',
        left: '50%',
        position: 'absolute'
      })

      var toolbar = new Autodesk.Viewing.UI.ToolBar(true)

      ctrlGroup = new Autodesk.Viewing.UI.ControlGroup(
        'lmv-react-ctrl-group')

      toolbar.addControl(ctrlGroup)

      $('#lmv-react-toolbar-container').append(
        toolbar.container)
    }

    viewer.initialize();

    viewer.addEventListener(
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
      this.onGeometryLoaded)

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
      autoLoad: true,
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

      Object.assign(_options, JSON.parse(options));
    }

    viewer.loadExtension(
      '_Viewing.Extension.ExtensionManager',
      _options);

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