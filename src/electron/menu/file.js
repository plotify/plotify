import { CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'

import { createSelector } from 'reselect'
import { isStoryOpenInFocusedWindow } from '../story'
import { request } from '../shared/communication'

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

const selector = createSelector(
  isStoryOpenInFocusedWindow,
  (open) => open ? openStoryInFocusedWindow : noStoryInFocusedWindow
)

export default selector
