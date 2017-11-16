import { GET_STATE } from '../shared/requests'
import about from './about/request-handlers'
import { requestHandler } from './shared/communication'
import view from './view/request-handlers'

const handleGetState = (resolve, _, __, ___, state) => {
  resolve(state)
}

const registerRequestHandlers = () => {
  requestHandler(GET_STATE, handleGetState)
  view()
  about()
}

export default registerRequestHandlers