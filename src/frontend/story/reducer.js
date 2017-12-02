import { CLOSE_OPEN_STORY_DIALOG, OPEN_STORY_CANCELED, OPEN_STORY_FAILED, OPEN_STORY_STARTED, OPEN_STORY_SUCCESSFUL } from './action-types'

const initialState = {
  openStory: null,
  openingStory: false,
  showOpenStoryDialog: false,
  openingStoryFailed: false,
  openingStoryErrorMessage: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_STORY_STARTED:
      return Object.assign({}, state, {
        openingStory: true,
        showOpenStoryDialog: true,
        openingStoryFailed: false,
        openingStoryErrorMessage: null
      })

    case OPEN_STORY_SUCCESSFUL:
      return Object.assign({}, state, {
        openStory: action.payload.path,
        openingStory: false
      })

    case OPEN_STORY_FAILED:
      return Object.assign({}, state, {
        openingStory: false,
        openingStoryFailed: true,
        openingStoryErrorMessage: action.payload.message
      })

    case OPEN_STORY_CANCELED:
      return Object.assign({}, state, {
        openingStory: false,
        openingStoryFailed: false
      })

    case CLOSE_OPEN_STORY_DIALOG:
      return Object.assign({}, state, {
        showOpenStoryDialog: false
      })

    default:
      return state
  }
}

export default reducer
