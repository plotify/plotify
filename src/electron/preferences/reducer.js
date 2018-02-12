import { combineReducers } from 'redux'
import { reducer as darkTheme } from './dark-theme'
import { reducer as database } from './database'

const reducer = combineReducers({
  database,
  darkTheme
})

export default reducer
