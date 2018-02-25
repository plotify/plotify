import { SET_RECENTLY_OPENED_FILES } from './action-types'
import { createReducer } from '../../../shared/redux'

const initialState = []

export default createReducer(initialState, {
  [SET_RECENTLY_OPENED_FILES]: (_, { files }) => files
})
