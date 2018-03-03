import { CLOSE_STORY_PREPARATION_REQUESTED, CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../../shared/story/requests'

import { createSelector } from 'reselect'
import { isStoryOpenInFocusedWindow } from '../../story'
import recentlyOpenedFiles from './recently-opened-files'
import { request } from '../../shared/communication'

const fileMenu = (menuLabel, showQuit, recentlyOpenedFiles, openStoryInFocusedWindow) => {
  const menu = {
    label: menuLabel,
    submenu: [
      { label: 'Neu...', click: createStory },
      { label: 'Öffnen...', click: openStory },
      {
        label: 'Zuletzt geöffnet',
        enabled: recentlyOpenedFiles.length > 0,
        submenu: recentlyOpenedFiles
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

const createStory = (_, window) => {
  request(window, CREATE_STORY_REQUESTED)
}

const openStory = (_, window) => {
  request(window, OPEN_STORY_REQUESTED)
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
