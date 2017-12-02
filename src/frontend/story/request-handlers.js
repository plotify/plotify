import { OPEN_STORY_REQUESTED } from '../../shared/story/requests'
import { openStory } from './actions'
import { requestHandler } from '../shared/communication'

const handleOpenStoryRequested = (resolve, _, __, dispatch) => {
  dispatch(openStory())
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(OPEN_STORY_REQUESTED, handleOpenStoryRequested)
}

export default registerRequestHandlers
