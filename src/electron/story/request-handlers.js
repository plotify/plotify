import { OPEN_STORY } from '../../shared/story/requests'
import openStory from './open'
import { requestHandler } from '../shared/communication'

const handleOpenStory = (resolve, reject) => {
  openStory()
    .then(story => resolve(story ? story.path : undefined))
    .catch(error => reject(error.message))
}

const registerRequestHandlers = () => {
  requestHandler(OPEN_STORY, handleOpenStory)
}

export default registerRequestHandlers
