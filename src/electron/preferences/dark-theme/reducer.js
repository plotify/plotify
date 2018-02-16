import { SET_DARK_THEME_ENABLED } from './action-types'
import { createReducer } from '../../../shared/redux'

const initialState = false

export default createReducer(initialState, {
  [SET_DARK_THEME_ENABLED]: (_, { enabled }) => enabled === true
})
