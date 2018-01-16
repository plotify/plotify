import { GET_SAVED_STATE } from '../../shared/requests'
import { getSavedState } from './saved-states'
import { requestHandler } from '../shared/communication'

const handleGetSavedState = (resolve, reject, senderWindow) => {
  const state = getSavedState(senderWindow)
  if (state) {
    resolve(state)
  } else {
    reject()
  }
}

export const registerRequestHandlers = () => {
  requestHandler(GET_SAVED_STATE, handleGetSavedState)
}
