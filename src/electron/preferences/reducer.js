import { combineReducers } from 'redux'
import { reducer as darkTheme } from './dark-theme'
import { reducer as database } from './database'
import { reducer as recentlyOpenedFiles } from './recently-opened-files'

const reducer = combineReducers({
  database,
  darkTheme,
  recentlyOpenedFiles
})

export default reducer
