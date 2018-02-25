import { CLOSE_STORY_PREPARATION_REQUESTED, CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED, STORY_CLOSED } from '../../shared/story/requests'
import { closeStoryPreparation, createStory, openStory, storyClosed } from './actions'

import { requestHandler } from '../shared/communication'

const handleCreateStoryRequested = (resolve, _, __, dispatch) => {
  dispatch(createStory())
  resolve()
}

const handleOpenStoryRequested = (resolve, _, payload, dispatch) => {
  dispatch(openStory(payload))
  resolve()
}

const handleCloseStoryPreparationRequested = (resolve, _, { closeWindow, focusWelcomeWindow }, dispatch) => {
  dispatch(closeStoryPreparation(closeWindow, focusWelcomeWindow))
  resolve()
}

const handleStoryClosed = (resolve, _, __, dispatch) => {
  dispatch(storyClosed())
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(CREATE_STORY_REQUESTED, handleCreateStoryRequested)
  requestHandler(OPEN_STORY_REQUESTED, handleOpenStoryRequested)
  requestHandler(CLOSE_STORY_PREPARATION_REQUESTED, handleCloseStoryPreparationRequested)
  requestHandler(STORY_CLOSED, handleStoryClosed)
}

export default registerRequestHandlers
