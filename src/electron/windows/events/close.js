import { CLOSE_STORY_PREPARATION_REQUESTED } from '../../../shared/story/requests'
import { getWindowStoryPath } from '../selectors'
import { request } from '../../shared/communication'

const handleClose = (event) => (dispatch, getState) => {
  const window = event.sender
  const storyPath = getWindowStoryPath(getState(), window.id)
  if (storyPath !== undefined && storyPath !== '') {
    event.preventDefault()
    request(window, CLOSE_STORY_PREPARATION_REQUESTED)
  }
}

export default handleClose
