import { CREATE_STORY, OPEN_STORY } from '../../shared/story/requests'

import openStory from './open'
import { requestHandler } from '../shared/communication'

const handleCreateStory = (resolve, reject) => {
  console.log('CREATE STORY!')
  resolve()
}

const handleOpenStory = (resolve, reject, path) => {
  openStory(path)
    .then(story => resolve(story ? story.path : undefined))
    .catch(error => reject(error.message))
}

const registerRequestHandlers = () => {
  requestHandler(CREATE_STORY, handleCreateStory)
  requestHandler(OPEN_STORY, handleOpenStory)
}

export default registerRequestHandlers
