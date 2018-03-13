import { CLOSE_STORY_PREPARATION_FINISHED, CREATE_STORY, OPEN_STORY } from '../../shared/story/requests'

import { bind as _ } from '../shared/redux'
import closeStory from './close'
import createStory from './create'
import openStory from './open'
import { requestHandler } from '../shared/communication'

const handleCreateStory = (resolve, reject, senderWindow) => (dispatch) => {
  dispatch(createStory(senderWindow))
    .then(path => resolve(path))
    .catch(error => reject(error.message))
}

const handleOpenStory = (resolve, reject, senderWindow, path) => (dispatch) => {
  dispatch(openStory(senderWindow, path))
    .then(story => resolve(story ? story.path : undefined))
    .catch(error => reject(error.message))
}

const handleCloseStory = (resolve, _, senderWindow, { closeWindow, focusWelcomeWindow }) => (dispatch) => {
  dispatch(closeStory(senderWindow, closeWindow, focusWelcomeWindow))
    .then(() => resolve())
}

const registerRequestHandlers = () => {
  requestHandler(CREATE_STORY, _(handleCreateStory))
  requestHandler(OPEN_STORY, _(handleOpenStory))
  requestHandler(CLOSE_STORY_PREPARATION_FINISHED, _(handleCloseStory))
}

export default registerRequestHandlers
