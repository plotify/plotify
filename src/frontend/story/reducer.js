import {
  CLOSE_CREATE_STORY_DIALOG,
  CLOSE_OPEN_STORY_DIALOG,
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
  openStory: null,
  openingStory: false,
  showOpenStoryDialog: false,
  creatingStory: false,
  showCreateStoryDialog: false,
  closingStory: false
}

export default createReducer(initialState, {
  [OPEN_STORY_STARTED]: (state) => ({
    ...state,
    openingStory: true,
    showOpenStoryDialog: true,
    showCreateStoryDialog: false
  }),
  [OPEN_STORY_SUCCESSFUL]: (state, { path }) => ({
    ...state,
    openStory: path,
    openingStory: false
  }),
  [OPEN_STORY_FAILED]: (state) => ({
    ...state,
    openingStory: false
  }),
  [CLOSE_OPEN_STORY_DIALOG]: (state) => ({
    ...state,
    showOpenStoryDialog: false
  }),

  [CREATE_STORY_STARTED]: (state) => ({
    ...state,
    creatingStory: true,
    showCreateStoryDialog: true,
    showOpenStoryDialog: false
  }),
  [CREATE_STORY_SUCCESSFUL]: (state) => ({
    ...state,
    creatingStory: false
  }),
  [CREATE_STORY_FAILED]: (state) => ({
    ...state,
    creatingStory: false
  }),
  [CLOSE_CREATE_STORY_DIALOG]: (state) => ({
    ...state,
    showCreateStoryDialog: false
  }),

  [CLOSE_STORY_PREPARATION_STARTED]: (state) => ({
    ...state,
    closingStory: true,
    showOpenStoryDialog: false,
    showCreateStoryDialog: false
  }),
  [STORY_CLOSED]: () => initialState
})
