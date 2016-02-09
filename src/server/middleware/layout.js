/**
 * Serve HTML layout with pre-rendered React views
 */

import { env, hotReloadUrl } from 'c0nfig';
import React from 'react';
import ReactRouter from 'react-router';
import versionifyAssets from 'versionify-assets';

import routes from '../../shared/routes';
import mapRouteHandler
    from '../../shared/common/utils/mapRouteHandler';

function handler (title, mainJS, mainCSS) {

    return (req, res, next) => {

        title = req.title || title;

        const flux = req.flux;

        ReactRouter.run(routes, req.url, renderBaseHTML);

        async function renderBaseHTML (Handler, state) {

            try {

                await mapRouteHandler(
                    state.routes, 'routerWillRun', { flux });

                const element = React.createElement(
                    Handler, { flux });

                const appString = React.renderToString(element);

                const snapshot = new Buffer(
                    flux.serialize(), 'utf-8').toString('base64');

                res.render('base', {
                    mainJS,
                    mainCSS,
                    env,
                    title,
                    snapshot,
                    appString
                });

            } catch (err) {
                next(err);
            }
        }
    };
}

export function development () {
    return handler(
        'LMV React | Dev',
        `build/app.js`
    );
}

export function developmentHotReload () {
    return handler(
        'LMV React | Dev',
        `${hotReloadUrl}build/app.js`
    );
}

export function production () {
    return handler(
        'LMV React ',
        versionifyAssets('/build/app.min.js')
    );
}
