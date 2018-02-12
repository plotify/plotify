import { CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'
import { STORY_CLOSED, STORY_OPENED, getStoryByWindowId } from '../story'
import { WINDOW_FOCUS_CHANGED, getFocusedWindow } from '../windows'

import { request } from '../shared/communication'
import store from '../store'

const fileMenu = (openStoryInFocusedWindow) => ({
  label: 'Datei',
  submenu: [
    { label: 'Neu...', click: createStory },
    { label: 'Öffnen...', click: openStory },
    { label: 'Schließen', enabled: openStoryInFocusedWindow },
    { type: 'separator' },
    { label: 'Beenden', role: 'quit' }
  ]
})

const createStory = (_, window) => {
  request(window, CREATE_STORY_REQUESTED)
}

const openStory = (_, window) => {
  request(window, OPEN_STORY_REQUESTED)
}

const openStoryInFocusedWindow = fileMenu(true)
const noStoryInFocusedWindow = fileMenu(false)

const initialState = noStoryInFocusedWindow

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WINDOW_FOCUS_CHANGED:
    case STORY_OPENED:
    case STORY_CLOSED:
      const globalState = store.getState()
      const window = getFocusedWindow(globalState)
      if (window && getStoryByWindowId(globalState, window.id)) {
        return openStoryInFocusedWindow
      } else {
        return noStoryInFocusedWindow
      }
    default:
      return state
  }
}

export default reducer
