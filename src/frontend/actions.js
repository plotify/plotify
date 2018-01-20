import { SET_STATE } from './action-types'

export const setState = (state) => ({
  type: SET_STATE,
  payload: { state }
})
