import { routerReducer as routing } from 'react-router-redux'
import appState from './appStateReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  appState,
  routing
})

export default rootReducer;
