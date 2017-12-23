import { CREATE_STORY, OPEN_STORY } from '../../shared/story/requests'

import createStory from './create'
import openStory from './open'
import { requestHandler } from '../shared/communication'

const handleCreateStory = (resolve, reject, senderWindow) => {
  createStory(senderWindow)
    .then(story => resolve(story ? story.path : undefined))
    .catch(error => reject(error.message))
}

const handleOpenStory = (resolve, reject, senderWindow, path) => {
  openStory(senderWindow, path)
    .then(story => resolve(story ? story.path : undefined))
    .catch(error => reject(error.message))
}

const registerRequestHandlers = () => {
  requestHandler(CREATE_STORY, handleCreateStory)
  requestHandler(OPEN_STORY, handleOpenStory)
}

export default registerRequestHandlers
