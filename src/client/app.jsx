// polyfills
import 'Base64';
import 'es5-shim';
import 'es5-shim/es5-sham';

import React from 'react';
window.React = React;

import jQuery from 'jquery';
window.$ = jQuery;

import router from './router';
import Flux from '../shared/flux';
import mapRouteHandler from
    '../shared/common/utils/mapRouteHandler';

const flux = new Flux();

router.run(async (Handler, state) => {

    await mapRouteHandler(
        state.routes, 'routerWillRun', {flux});

    React.render(
        <Handler flux={flux} {...state}/>,
        document.getElementById('app')
    );
});
