import * as t from './action-types'

const initialState = {
  openStory: null,
  openingStory: false,
  showOpenStoryDialog: false,
  openingStoryFailed: false,
  openingStoryErrorMessage: null,
  creatingStory: false,
  showCreateStoryDialog: false,
  creatingStoryFailed: false,
  creatingStoryErrorMessage: null,
  closingStory: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.OPEN_STORY_STARTED:
      return Object.assign({}, state, {
        openingStory: true,
        showOpenStoryDialog: true,
        openingStoryFailed: false,
        openingStoryErrorMessage: null,
        showCreateStoryDialog: false
      })

    case t.OPEN_STORY_SUCCESSFUL:
      return Object.assign({}, state, {
        openStory: action.payload.path,
        openingStory: false
      })

    case t.OPEN_STORY_FAILED:
      return Object.assign({}, state, {
        openingStory: false,
        openingStoryFailed: true,
        openingStoryErrorMessage: action.payload.message
      })

    case t.OPEN_STORY_CANCELED:
      return Object.assign({}, state, {
        openingStory: false,
        openingStoryFailed: false
      })

    case t.CLOSE_OPEN_STORY_DIALOG:
      return Object.assign({}, state, {
        showOpenStoryDialog: false
      })

    case t.CREATE_STORY_STARTED:
      return Object.assign({}, state, {
        creatingStory: true,
        showCreateStoryDialog: true,
        showOpenStoryDialog: false
      })

    case t.CREATE_STORY_SUCCESSFUL:
      return Object.assign({}, state, {
        creatingStory: false
      })

    case t.CREATE_STORY_FAILED:
      return Object.assign({}, state, {
        creatingStory: false,
        creatingStoryFailed: true,
        creatingStoryErrorMessage: action.payload.message
      })

    case t.CREATE_STORY_CANCELED:
      return Object.assign({}, state, {
        creatingStory: false,
        creatingStoryFailed: false
      })

    case t.CLOSE_CREATE_STORY_DIALOG:
      return Object.assign({}, state, {
        showCreateStoryDialog: false
      })

    case t.CLOSE_STORY_PREPARATION_STARTED:
      return Object.assign({}, state, {
        closingStory: true,
        showOpenStoryDialog: false,
        showCreateStoryDialog: false
      })

    default:
      return state
  }
}

export default reducer
