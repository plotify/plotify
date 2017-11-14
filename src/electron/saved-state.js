import { GET_SAVED_STATE } from '../shared/requests'
import { requestHandler } from './shared/communication'

let savedState = null

export const saveState = (state) => {
  savedState = state
}

const handleGetSavedState = (resolve, reject) => {
  if (savedState) {
    resolve(savedState)
  } else {
    reject()
  }
}

export const registerRequestHandlers = () => {
  requestHandler(GET_SAVED_STATE, handleGetSavedState)
}
