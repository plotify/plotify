import { CLOSE_STORY_PREPARATION_REQUESTED, CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'
import { closeStoryPreparation, createStory, openStory } from './actions'

import { requestHandler } from '../shared/communication'

const handleCreateStoryRequested = (resolve, _, __, dispatch) => {
  dispatch(createStory())
  resolve()
}

const handleOpenStoryRequested = (resolve, _, payload, dispatch) => {
  dispatch(openStory(payload))
  resolve()
}

const handleCloseStoryPreparationRequested = (resolve, _, __, dispatch) => {
  dispatch(closeStoryPreparation())
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(CREATE_STORY_REQUESTED, handleCreateStoryRequested)
  requestHandler(OPEN_STORY_REQUESTED, handleOpenStoryRequested)
  requestHandler(CLOSE_STORY_PREPARATION_REQUESTED, handleCloseStoryPreparationRequested)
}

export default registerRequestHandlers
