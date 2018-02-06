import characters from './characters/request-handlers'
import { registerRequestHandlers as development } from './development'
import { registerRequestHandlers as preferences } from './preferences'
import story from './story/request-handlers'
import { registerRequestHandlers as updates } from './updates'
import { registerRequestHandlers as windows } from './windows'

const registerRequestHandlers = () => {
  windows()
  preferences()
  development()
  updates()
  story()
  characters()
}

export default registerRequestHandlers
