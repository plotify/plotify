import characters from './characters/request-handlers'
import story from './story/request-handlers'

const registerRequestHandlers = () => {
  story()
  characters()
}

export default registerRequestHandlers
