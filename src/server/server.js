
//Server stuff
import {env, serverConfig, dbConfig} from 'c0nfig';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import express from 'express';
import path from 'path';

//Authentication stuff
import session from 'express-session';
import store from 'connect-mongo';
import passport from 'passport';

//API's
import AuthenticateAPI from '../api/endpoints/authenticate';
import ExtensionAPI from '../api/endpoints/extensions';
import ModelAPI from '../api/endpoints/models';
import ToolsAPI from '../api/endpoints/tools';
import UserAPI from '../api/endpoints/users';
import LmvAPI from '../api/endpoints/lmv';

//Services
import ServiceManager from '../api/services/svcManager';
import ExtensionSvc from '../api/services/extensionSvc';
import SocketSvc from '../api/services/socketSvc';
import ModelSvc from '../api/services/modelSvc';
import UserSvc from '../api/services/userSvc';
import LmvSvc from '../api/services/lmvSvc';
import DbSvc from '../api/services/dbSvc';

//Webpack hot reloading stuff
import webpackConfig from '../../webpack/webpack.config.development';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

// React + Redux Setup
import { configureStore } from '../shared/redux/store/configureStore';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function authenticatePage(req, res, next) {

  if(env == 'production' && !req.user) {

    res.redirect('/login');
    return;
  }

  next();
}

function authenticateAPI(req, res, next) {

  if(env == 'production' && !req.user) {
    res.status(401);
    return res.send('Unauthorized!');
  }

  next();
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
export function fetchComponentData(
  dispatch, components, params) {

  const needs = components.reduce((prev, current) => {

    return (current.need || [])
      .concat((current.WrappedComponent &&
      (current.WrappedComponent.need !== current.need) ?
        current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);

  const promises = needs.map(need => dispatch(need(params)));

  return Promise.all(promises);
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function handleRender(req, res){

  match({
    routes,
    location: req.url
  }, (err, redirectLocation, renderProps) => {

    if (err) {

      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {

      return res.status(404).end('Not found!');
    }

    const initialState = { posts: [], post: {} };

    const store = configureStore(initialState);

    fetchComponentData(
      store.dispatch,
      renderProps.components,
      renderProps.params)
      .then(() => {

        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const finalState = store.getState();

        res.status(200).end(
          renderFullPage(initialView, finalState));
      })
      .catch(() => {
        res.end(renderFullPage('Error', {}));
      });
  });
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function initializeRoutes(app, server) {

  return new Promise(async(resolve, reject)=> {

    try {

      var svcManager = new ServiceManager();

      var dbSvc = new DbSvc(svcManager, {
        config: dbConfig
      });

      await dbSvc.connect();

      var socketSvc = new SocketSvc(svcManager, {
        server: server
      });

      var modelSvc = new ModelSvc(svcManager, {
        config: {
          collections: dbConfig.collections
        }
      });

      var userSvc = new UserSvc(svcManager, {
        config: {
          collections: dbConfig.collections,
          usernameField: 'username',
          passwordField: 'password',
          adminField: 'isAdmin',
          loginField: 'email',
          env: env
        }
      });

      var lmvSvc = new LmvSvc(svcManager, {
        config: {
          credentials: {
            ConsumerKey: serverConfig.LMV_CONSUMERKEY,
            ConsumerSecret: serverConfig.LMV_CONSUMERSECRET
          }
        }
      });

      var extensionSvc = new ExtensionSvc(svcManager, {
        config: {
          extensionsFolder: path.resolve(
            __dirname, '../../dynamic/extensions/'),
          collections: dbConfig.collections,
          env: env
        }
      });

      var MongoStore = store(session);

      app.use(session({
        secret: '352EB973-A522-4362-87C0-4A87A7A8D33D',
        saveUninitialized: true,
        resave: false,
        store: new MongoStore({url: dbSvc.getConnectionURL()})
      }));

      app.use(passport.initialize());
      app.use(passport.session());

      //API Endpoints Public
      app.use('/api/authenticate',
        AuthenticateAPI(svcManager));

      //API Endpoints Private
      app.use('/api/users',
        authenticateAPI,
        UserAPI(svcManager));

      app.use('/api/extensions',
        authenticateAPI,
        ExtensionAPI(svcManager));

      app.use('/api/models',
        authenticateAPI,
        ModelAPI(svcManager));

      app.use('/api/tools',
        authenticateAPI,
        ToolsAPI(svcManager));

      app.use('/api/lmv',
        authenticateAPI,
        LmvAPI(svcManager));

      //Web Pages
      app.use('/login',
        express.static(path.resolve(
          __dirname, '../../dist/login')));

      app.use(
        authenticatePage,
        express.static(path.resolve(
          __dirname, '../../dist')));

      app.get('*',
        authenticatePage,
        (req, res)=> {
          res.sendFile(path.resolve(
            __dirname, '../../dist/index.html'));
        });

      //app.use(handleRender)

      resolve();
    }
    catch (ex) {

      reject(ex);
    }
  });
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function setWebpackHotReloading(app) {

  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function createServer() {

  return new Promise(async(resolve, reject)=> {

    try {

      var app = express();

      if(process.env.NODE_ENV == 'development')
        setWebpackHotReloading(app);

      var faviconPath = path.resolve(
        __dirname, '../../dist/img/favicon.png');

      app.use(favicon(faviconPath));
      app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
      app.use(bodyParser.json({ limit: '20mb' }));
      app.use(cookieParser());

      app.set('port', process.env.PORT || serverConfig.port);

      var server = app.listen(app.get('port'), async()=> {

        try {

          await initializeRoutes(app, server);

          resolve(server);
        }
        catch (ex) {

          reject(ex);
        }
      });
    }
    catch (ex){

      reject(ex);
    }
  });
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
async function runServer() {

  try {

    var server = await createServer();

    console.log('Server listening on: ');
    console.log(server.address());
    console.log('ENV: ' + process.env.NODE_ENV);

  }
  catch (ex) {

    console.log('Failed to run server... ');
    console.log(ex);
  }
}

runServer();

