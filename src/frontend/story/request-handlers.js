import { CLOSE_STORY_PREPARATION_REQUESTED, CREATE_STORY_FAILED, CREATE_STORY_STARTED, CREATE_STORY_SUCCESSFUL, OPEN_STORY_FAILED, OPEN_STORY_STARTED, OPEN_STORY_SUCCESSFUL, STORY_CLOSED } from '../../shared/story/requests'
import { closeStoryPreparation, createStoryFailed, createStoryStarted, createStorySuccessful, openStoryFailed, openStoryStarted, openStorySuccessful, storyClosed } from './actions'

import { openCharactersSection } from '../characters/actions'
import { requestHandler } from '../shared/communication'

const handleCreateStoryStarted = async (resolve, _, __, dispatch) => {
  await dispatch(createStoryStarted())
  resolve()
}

const handleCreateStorySuccessful = async (resolve, _, __, dispatch) => {
  await dispatch(createStorySuccessful())
  resolve()
}

const handleCreateStoryFailed = async (resolve, _, __, dispatch) => {
  await dispatch(createStoryFailed())
  resolve()
}

const handleOpenStoryStarted = async (resolve, _, path, dispatch) => {
  await dispatch(openStoryStarted(path))
  resolve()
}

const handleOpenStorySuccessful = async (resolve, _, __, dispatch) => {
  await dispatch(openCharactersSection())
  await dispatch(openStorySuccessful())
  resolve()
}

const handleOpenStoryFailed = async (resolve, _, __, dispatch) => {
  await dispatch(openStoryFailed())
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
  requestHandler(CREATE_STORY_STARTED, handleCreateStoryStarted)
  requestHandler(CREATE_STORY_SUCCESSFUL, handleCreateStorySuccessful)
  requestHandler(CREATE_STORY_FAILED, handleCreateStoryFailed)

  requestHandler(OPEN_STORY_STARTED, handleOpenStoryStarted)
  requestHandler(OPEN_STORY_SUCCESSFUL, handleOpenStorySuccessful)
  requestHandler(OPEN_STORY_FAILED, handleOpenStoryFailed)

  requestHandler(CLOSE_STORY_PREPARATION_REQUESTED, handleCloseStoryPreparationRequested)
  requestHandler(STORY_CLOSED, handleStoryClosed)
}

export default registerRequestHandlers
