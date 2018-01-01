import { CLOSE_STORY_PREPARATION_REQUESTED } from '../../../shared/story/requests'
import { getWindowStoryPath } from '../windows'
import { request } from '../../shared/communication'

const handleClose = (event) => {
  const window = event.sender
  const storyPath = getWindowStoryPath(window)
  if (storyPath !== undefined && storyPath !== '') {
    event.preventDefault()
    request(window, CLOSE_STORY_PREPARATION_REQUESTED)
  }
}

export default handleClose
