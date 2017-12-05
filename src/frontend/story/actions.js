import * as t from './action-types'

import { CREATE_STORY, OPEN_STORY, OPEN_STORY_FINISHED } from '../../shared/story/requests'
import { isCreatingStory, isOpeningStory } from './selectors'

import { openCharactersSection } from '../characters/actions'
import { request } from '../shared/communication'

export const openStory = (path) => {
  return async (dispatch, getState) => {
    if (isOpeningStory(getState()) || isCreatingStory(getState())) {
      request(OPEN_STORY_FINISHED)
      return
    }

    dispatch(openStoryStarted())

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
      dispatch(openStoryFailed(error))
    }

    request(OPEN_STORY_FINISHED)
  }
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

export const createStory = () => {
  return async (dispatch, getState) => {
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
