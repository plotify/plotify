import { combineReducers } from 'redux'
import edit from './edit'
import file from './file'
import help from './help'
import view from './view'

const reducer = combineReducers({
  0: file,
  1: edit,
  2: view,
  3: help
})

export default reducer
