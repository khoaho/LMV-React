import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import AppView from './common/AppView';
import HomeView from './home/HomeView';
import GalleryView from './gallery/GalleryView';
import ViewerView from './viewer/ViewerView';

export default (

    <Route name="app" path="/?" handler={AppView}>
        <Route name="home" path="home/?" handler={HomeView}/>
        <Route name="gallery" path="gallery/?" handler={GalleryView}/>
        <Route name="viewer" path="viewer/?" handler={ViewerView}/>
        <DefaultRoute handler={HomeView}/>
    </Route>
);
