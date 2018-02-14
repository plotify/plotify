import { combineReducers } from 'redux'
import { reducer as preferences } from './preferences'
import splashScreen from './splash-screen/reducer'
import { reducer as stories } from './story'
import { reducer as windows } from './windows'

const rootReducer = combineReducers({
  splashScreen,
  windows,
  stories,
  preferences
})

export default rootReducer
