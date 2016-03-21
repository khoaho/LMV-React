import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools';
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import api from '../middleware/api'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api)
  )
}
