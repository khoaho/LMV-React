import { createStore, applyMiddleware, compose } from 'redux'
import DevTools from '../../Components/DevTools'
import { persistState } from 'redux-devtools';
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import api from '../middleware/api'
import thunk from 'redux-thunk'

export default function configureStore(initialState = {}) {

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument(),
      //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )
  );


  //let finalCreateStore;
  //
  //if (process.env.CLIENT) {
  //
  //  finalCreateStore = compose(
  //    applyMiddleware(thunk),
  //    DevTools.instrument(),
  //    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  //  )(createStore);
  //} else {
  //
  //  finalCreateStore = applyMiddleware(thunk)(createStore);
  //}
  //
  //const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}