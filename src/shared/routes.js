import { Route, IndexRoute, IndexRedirect } from 'react-router'
import React from 'react'

import ViewerPage from 'ViewerPage/ViewerPage'
import EmbedPage from 'EmbedPage/EmbedPage'
import HomePage from 'HomePage/HomePage'
import App from 'App/App'

const routes = (

  <div>
    <Route name="embed" path="/embed" component={EmbedPage}>
    </Route>

    //<Route name="app" path="/" component={App}>
    //  <IndexRedirect to="/viewer"/>
    //  <Route name="home" path="home" component={HomePage}/>
    //  <Route name="viewer" path="viewer" component={ViewerPage}/>
    //</Route>
  </div>
);

export default routes;
