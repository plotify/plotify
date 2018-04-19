import {
  CLOSE_STORY_PREPARATION_STARTED,
  CREATE_STORY_FAILED,
  CREATE_STORY_STARTED,
  CREATE_STORY_SUCCESSFUL,
  OPEN_STORY_FAILED,
  OPEN_STORY_STARTED,
  OPEN_STORY_SUCCESSFUL,
  STORY_CLOSED
} from './action-types'

import { createReducer } from '../../shared/redux'

const initialState = {
  storyPath: null,
  openingStory: false,
  creatingStory: false,
  closingStory: false
}

export default createReducer(initialState, {
  [OPEN_STORY_STARTED]: (state, { path }) => ({
    ...state,
    openingStory: true,
    storyPath: path
  }),
  [OPEN_STORY_SUCCESSFUL]: (state) => ({
    ...state,
    openingStory: false
  }),
  [OPEN_STORY_FAILED]: (state) => ({
    ...state,
    openingStory: false,
    storyPath: null
  }),

  [CREATE_STORY_STARTED]: (state) => ({
    ...state,
    creatingStory: true
  }),
  [CREATE_STORY_SUCCESSFUL]: (state) => ({
    ...state,
    creatingStory: false
  }),
  [CREATE_STORY_FAILED]: (state) => ({
    ...state,
    creatingStory: false
  }),

  [CLOSE_STORY_PREPARATION_STARTED]: (state) => ({
    ...state,
    closingStory: true
  }),
  [STORY_CLOSED]: () => initialState
})
