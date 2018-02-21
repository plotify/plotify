import { combineReducers } from 'redux'
import { reducer as preferences } from './preferences'
import { reducer as splashScreen } from './splash-screen'
import { reducer as stories } from './story'
import { reducer as windows } from './windows'

const rootReducer = combineReducers({
  splashScreen,
  windows,
  stories,
  preferences
})

export default rootReducer
