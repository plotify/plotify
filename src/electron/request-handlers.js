import characters from './characters/request-handlers'
import { registerRequestHandlers as development } from './development'
import story from './story/request-handlers'

const registerRequestHandlers = () => {
  development()
  story()
  characters()
}

export default registerRequestHandlers
