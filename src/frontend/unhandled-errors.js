import { RENDERER_ERROR } from '../shared/requests'
import { request } from './shared/communication'

window.onerror = (message, _, __, ___, error) => {
  request(RENDERER_ERROR, {
    stack: error.stack
  })
}
