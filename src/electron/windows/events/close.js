import { CLOSE_STORY_PREPARATION_REQUESTED } from '../../../shared/story/requests'
import { getWindowStoryPath } from '../selectors'
import { request } from '../../shared/communication'

const handleClose = (event) => (dispatch, getState) => {
  const window = event.sender
  const storyPath = getWindowStoryPath(getState(), window.id)
  if (storyPath !== undefined && storyPath !== '') {
    event.preventDefault()
    const closeWindow = true
    const focusWelcomeWindow = false
    request(window, CLOSE_STORY_PREPARATION_REQUESTED, { closeWindow, focusWelcomeWindow })
  }
}

export default handleClose
