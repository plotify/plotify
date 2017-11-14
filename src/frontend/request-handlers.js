import about from './about/request-handlers'
import view from './view/request-handlers'

const registerRequestHandlers = () => {
  view()
  about()
}

export default registerRequestHandlers
