import React, { Component, PropTypes } from 'react'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import {clientConfig} from 'c0nfig'
import DevTools from 'DevTools'
import 'font-awesome-webpack'
import routes from 'routes'


export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  renderDevTools() {
    if(clientConfig.redux.devtools){
      return (<DevTools/>)
    }
  }

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes}/>
          { this.renderDevTools() }
        </div>
      </Provider>
    )
  }
}