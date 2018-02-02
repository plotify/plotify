import { combineReducers } from 'redux'
import splashScreen from './splash-screen/reducer'
import { reducer as windows } from './windows'

const rootReducer = combineReducers({
  splashScreen,
  windows
})

export default rootReducer
