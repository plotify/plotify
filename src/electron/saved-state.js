import { GET_SAVED_STATE } from '../shared/requests'
import { requestHandler } from './shared/communication'

let _shouldSaveState = false
let savedState = null

export const shouldSaveState = () => (_shouldSaveState)

export const setShouldSaveState = (save) => {
  _shouldSaveState = (save === true)
  if (!save) savedState = null
}

export const saveState = (state) => {
  if (_shouldSaveState) {
    savedState = state
  }
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
