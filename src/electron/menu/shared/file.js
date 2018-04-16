import { CLOSE_STORY_PREPARATION_REQUESTED, CREATE_STORY_REQUESTED } from '../../../shared/story/requests'
import { createStory as _createStory, isStoryOpenInFocusedWindow, openStory } from '../../story'

import { createSelector } from 'reselect'
import recentlyOpenedFiles from './recently-opened-files'
import { request } from '../../shared/communication'
import { showMessageBox } from '../../shared/dialog'
import store from '../../store'

const fileMenu = (menuLabel, showQuit, recentlyOpenedFiles, openStoryInFocusedWindow) => {
  const menu = {
    label: menuLabel,
    submenu: [
      { label: 'Neu...', click: createStory },
      { label: 'Öffnen...', click: _openStory },
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
  if (window) {
    request(window, CREATE_STORY_REQUESTED)
  } else {
    createStoryInNewWindow()
  }
}

const createStoryInNewWindow = async () => {
  try {
    const path = await store.dispatch(_createStory())
    if (path) {
      store.dispatch(openStory(null, path))
    }
  } catch (error) {
    showMessageBox(null, {
      type: 'error',
      title: 'Die Geschichte konnte nicht erstellt werden.',
      message: error.message,
      buttons: ['Schließen'],
      defaultId: 0
    })
  }
}

const _openStory = (_, window) => {
  store.dispatch(openStory(window))
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
