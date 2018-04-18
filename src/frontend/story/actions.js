import * as t from './action-types'

import { CLOSE_STORY_PREPARATION_FINISHED, CREATE_STORY, OPEN_STORY } from '../../shared/story/requests'
import { isClosingStory, isCreatingStory, isOpeningStory } from './selectors'

import { openWelcomeSection } from '../welcome/actions'
import { request } from '../shared/communication'

export const openStory = (path) => async (dispatch, getState) => {
  if (isOpeningStory(getState()) || isCreatingStory(getState())) {
    return
  }

  dispatch(openStoryStarted())
  request(OPEN_STORY, path)
}

export const openStoryStarted = () => ({
  type: t.OPEN_STORY_STARTED,
  payload: {}
})

export const openStorySuccessful = (path) => ({
  type: t.OPEN_STORY_SUCCESSFUL,
  payload: { path }
})

export const openStoryFailed = () => ({
  type: t.OPEN_STORY_FAILED,
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

export const createStoryStarted = () => ({
  type: t.CREATE_STORY_STARTED,
  payload: {}
})

export const createStorySuccessful = () => ({
  type: t.CREATE_STORY_SUCCESSFUL,
  payload: {}
})

export const createStoryFailed = (message) => ({
  type: t.CREATE_STORY_FAILED,
  payload: { message }
})

export const createStoryCanceled = () => ({
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

export const closeStoryPreparationStarted = () => ({
  type: t.CLOSE_STORY_PREPARATION_STARTED,
  payload: {}
})

export const storyClosed = () => async (dispatch) => {
  await dispatch(openWelcomeSection())
  await dispatch(_storyClosed())
}

export const _storyClosed = () => ({
  type: t.STORY_CLOSED,
  payload: {}
})
