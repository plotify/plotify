import * as t from './action-types'

import { CLOSE_STORY_PREPARATION_FINISHED, CREATE_STORY, OPEN_STORY, OPEN_STORY_FINISHED } from '../../shared/story/requests'
import { isClosingStory, isCreatingStory, isOpeningStory } from './selectors'

import { openCharactersSection } from '../characters/actions'
import { openWelcomeSection } from '../welcome/actions'
import { request } from '../shared/communication'

export const openStory = (path) => async (dispatch, getState) => {
  if (isOpeningStory(getState()) || isCreatingStory(getState())) {
    request(OPEN_STORY_FINISHED)
    return
  }

  dispatch(openStoryStarted())

  let openError

  try {
    path = await request(OPEN_STORY, path)

    if (path) {
      dispatch(openStorySuccessful(path))
      dispatch(openCharactersSection())
    } else {
      dispatch(openStoryCanceled())
    }

    dispatch(closeOpenStoryDialog())
  } catch (error) {
    openError = error
    dispatch(openStoryFailed(error))
  }

  request(OPEN_STORY_FINISHED, openError)
}

const openStoryStarted = () => ({
  type: t.OPEN_STORY_STARTED,
  payload: {}
})

const openStorySuccessful = (path) => ({
  type: t.OPEN_STORY_SUCCESSFUL,
  payload: { path }
})

const openStoryFailed = (message) => ({
  type: t.OPEN_STORY_FAILED,
  payload: { message }
})

const openStoryCanceled = () => ({
  type: t.OPEN_STORY_CANCELED,
  payload: {}
})

export const closeOpenStoryDialog = () => ({
  type: t.CLOSE_OPEN_STORY_DIALOG,
  paylaod: {}
})

export const createStory = () => async (dispatch, getState) => {
  if (isOpeningStory(getState()) || isCreatingStory(getState())) {
    return
  }

  dispatch(createStoryStarted())

  try {
    const path = await request(CREATE_STORY)

    if (path) {
      dispatch(createStorySuccessful())
    } else {
      dispatch(createStoryCanceled())
    }

    dispatch(closeCreateStoryDialog())

    if (path) {
      dispatch(openStory(path))
    }
  } catch (error) {
    dispatch(createStoryFailed(error))
  }
}

const createStoryStarted = () => ({
  type: t.CREATE_STORY_STARTED,
  payload: {}
})

const createStorySuccessful = () => ({
  type: t.CREATE_STORY_SUCCESSFUL,
  payload: {}
})

const createStoryFailed = (message) => ({
  type: t.CREATE_STORY_FAILED,
  payload: { message }
})

const createStoryCanceled = () => ({
  type: t.CREATE_STORY_CANCELED,
  payload: {}
})

export const closeCreateStoryDialog = () => ({
  type: t.CLOSE_CREATE_STORY_DIALOG,
  payload: {}
})

export const closeStoryPreparation = (closeWindow, focusWelcomeWindow) => async (dispatch, getState) => {
  if (isClosingStory(getState())) {
    return
  }
  dispatch(closeStoryPreparationStarted())
  // TODO Sichergehen, dass ungespeicherte Änderungen gespeichert wurden.
  request(CLOSE_STORY_PREPARATION_FINISHED, { closeWindow, focusWelcomeWindow })
}

const closeStoryPreparationStarted = () => ({
  type: t.CLOSE_STORY_PREPARATION_STARTED,
  payload: {}
})

export const storyClosed = () => async (dispatch) => {
  await dispatch(openWelcomeSection())
  dispatch({
    type: t.STORY_CLOSED,
    payload: {}
  })
}
