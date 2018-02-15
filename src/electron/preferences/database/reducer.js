import { SET_PREFERENCES_DATABASE } from './action-types'
import { createReducer } from '../../../shared/redux'

const initialState = null

export default createReducer(initialState, {
  [SET_PREFERENCES_DATABASE]: (_, { database }) => database
})
