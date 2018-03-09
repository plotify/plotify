import { CLOSE_STORY_PREPARATION_REQUESTED, CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../../shared/story/requests'
import { openStory as _openStory, isStoryOpenInFocusedWindow } from '../../story'

import { createSelector } from 'reselect'
import recentlyOpenedFiles from './recently-opened-files'
import { request } from '../../shared/communication'
import store from '../../store'

const fileMenu = (menuLabel, showQuit, recentlyOpenedFiles, openStoryInFocusedWindow) => {
  const menu = {
    label: menuLabel,
    submenu: [
      { label: 'Neu...', click: createStory },
      { label: 'Öffnen...', click: openStory },
      {
        label: 'Zuletzt geöffnet',
        enabled: recentlyOpenedFiles.length > 0,
        submenu: recentlyOpenedFiles.length > 0 ? recentlyOpenedFiles : emptySubmenu
      },
      { type: 'separator' },
      { label: 'Schließen', enabled: openStoryInFocusedWindow, click: closeStory }
    ]
  }
  if (showQuit) {
    menu.submenu.push({ type: 'separator' })
    menu.submenu.push({ label: 'Beenden', role: 'quit' })
  }
  return menu
}

const emptySubmenu = [
  {
    label: 'Keine Geschichten',
    enabled: false
  }
]

const createStory = (_, window) => {
  request(window, CREATE_STORY_REQUESTED)
}

const openStory = (_, window) => {
  if (window) {
    request(window, OPEN_STORY_REQUESTED)
  } else {
    store.dispatch(_openStory())
  }
}

const closeStory = (_, window) => {
  const closeWindow = false
  const focusWelcomeWindow = true
  request(window, CLOSE_STORY_PREPARATION_REQUESTED, { closeWindow, focusWelcomeWindow })
}

export default (menuLabel, showQuit) => createSelector(
  () => menuLabel,
  () => showQuit,
  recentlyOpenedFiles,
  isStoryOpenInFocusedWindow,
  fileMenu
)
