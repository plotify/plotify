import characters from './characters/request-handlers'
import { registerRequestHandlers as development } from './development'
import { registerRequestHandlers as preferences } from './preferences'
import story from './story/request-handlers'

const registerRequestHandlers = () => {
  preferences()
  development()
  story()
  characters()
}

export default registerRequestHandlers
