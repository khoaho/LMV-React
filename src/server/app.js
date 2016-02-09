
import path from 'path';
import express from 'express';
import logger from 'morgan';
import swig from 'swig';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import serveFavicon from 'serve-favicon';
import { host, port, env, dbConfig } from 'c0nfig';
import mountClient from './mountClient';
import Lmv from 'view-and-data';
import DbSvc from './services/dbSvc';

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
const app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../../layouts'));
app.use(logger('tiny'));
app.use(cookieParser());
app.use(compression());
app.use(serveFavicon(path.join(
    __dirname, '../../public/assets/favicon.png')));

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
async function initializeRoutes() {

    try {

        var lmv = new Lmv({
            credentials: {
                ConsumerKey: process.env.LMV_CONSUMERKEY,
                ConsumerSecret: process.env.LMV_CONSUMERSECRET
            }});

        await lmv.initialize();

        var dbSvc = new DbSvc(dbConfig);

        var db = await dbSvc.connect();

        app.use(host + '/api/lmv',
            require('./api/lmv')(lmv));

        app.use(host + '/api/models',
            require('./api/models')(db));

        app.use(host, express.static(
            path.join(__dirname, '../../public')));

        app.use(mountClient());

        console.log('Routes initialized')
    }
    catch (ex) {

        console.log('Routes initialization failed...');
        console.log(ex);
    }
}

initializeRoutes();

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || port);

app.listen(app.get('port'), () => {

    console.log(`LMV React Server listening on
      http://localhost:${app.get('port')}${host}
      (env=${env})`);
});


