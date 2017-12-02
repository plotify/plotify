import { CLOSE_OPEN_STORY_DIALOG, OPEN_STORY_CANCELED, OPEN_STORY_FAILED, OPEN_STORY_STARTED, OPEN_STORY_SUCCESSFUL } from './action-types'

import { OPEN_STORY } from '../../shared/story/requests'
import { isOpeningStory } from './selectors'
import { request } from '../shared/communication'

export const openStory = () => {
  return async (dispatch, getState) => {
    if (isOpeningStory(getState())) {
      return
    }

    dispatch(openStoryStarted())

    try {
      const path = await request(OPEN_STORY)
      if (path) {
        dispatch(openStorySuccessful(path))
      } else {
        dispatch(openStoryCanceled())
      }
      dispatch(closeOpenStoryDialog())
    } catch (error) {
      dispatch(openStoryFailed(error))
    }
  }
}

const openStoryStarted = () => ({
  type: OPEN_STORY_STARTED,
  payload: {}
})

const openStorySuccessful = (path) => ({
  type: OPEN_STORY_SUCCESSFUL,
  payload: { path }
})

const openStoryFailed = (message) => ({
  type: OPEN_STORY_FAILED,
  payload: { message }
})

const openStoryCanceled = () => ({
  type: OPEN_STORY_CANCELED,
  payload: {}
})

export const closeOpenStoryDialog = () => ({
  type: CLOSE_OPEN_STORY_DIALOG,
  paylaod: {}
})
