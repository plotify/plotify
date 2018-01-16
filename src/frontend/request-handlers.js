import { GET_STATE, SET_STATE } from '../shared/requests'

import about from './about/request-handlers'
import recentlyOpenedFiles from './welcome/recently-opened-files/request-handlers'
import { requestHandler } from './shared/communication'
import { setState } from './actions'
import story from './story/request-handlers'
import view from './view/request-handlers'

const handleGetState = (resolve, _, __, ___, state) => {
  resolve(state)
}

const handleSetState = (resolve, _, state, dispatch) => {
  dispatch(setState(state))
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(GET_STATE, handleGetState)
  requestHandler(SET_STATE, handleSetState)
  view()
  about()
  story()
  recentlyOpenedFiles()
}

export default registerRequestHandlers
