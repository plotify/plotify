import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../shared/view/requests'
import { setShouldSaveState, shouldSaveState } from './saved-state'

import { Menu } from 'electron'
import { OPEN_ABOUT_DIALOG } from '../../shared/about/requests'
import { OPEN_STORY_REQUESTED } from '../../shared/story/requests'
import isDev from 'electron-is-dev'
import { request } from '../shared/communication'

// Workaround: Unter Unity aktualisiert sich die Checkbox nicht.
const unityWorkaround = () => {
  Menu.setApplicationMenu(Menu.getApplicationMenu())
}

const openStory = () => {
  request(OPEN_STORY_REQUESTED)
}

const toggleDarkTheme = (item) => {
  const name = item.checked ? ENABLE_DARK_THEME : DISABLE_DARK_THEME
  request(name)
  unityWorkaround()
}

const toggleShouldSaveState = () => {
  setShouldSaveState(!shouldSaveState())
  unityWorkaround()
}

const openAboutDialog = () => {
  request(OPEN_ABOUT_DIALOG)
}

export const addDeveloperMenu = (template) => {
  if (isDev) {
    template.push({
      label: 'Entwicklung',
      submenu: [
        { label: 'Werkzeuge', role: 'toggledevtools' },
        { type: 'separator' },
        { label: 'Zustand wiederherstellen', type: 'checkbox', checked: shouldSaveState(), click: toggleShouldSaveState }
      ]
    })
  }
}

export const addHelpMenu = (template) => {
  template.push({
    label: 'Hilfe',
    submenu: [
      { label: 'Über Plotify', click: openAboutDialog }
    ]
  })
}

export const createMenuTemplate = (platform) => {
  // TODO macOS-spezifisches Menü
  // TODO Neue Geschichte
  // TODO Geschichte öffnen
  // TODO Rückgängig
  // TODO Wiederherstellen
  // TODO Feedback geben
  const template = [
    {
      label: 'Datei',
      submenu: [
        { label: 'Neue Geschichte' },
        { label: 'Geschichte öffnen', click: openStory },
        { type: 'separator' },
        { label: 'Plotify beenden', role: 'quit' }
      ]
    },
    {
      label: 'Bearbeiten',
      submenu: [
        { label: 'Rückgängig', role: 'undo' },
        { label: 'Wiederherstellen', role: 'redo' },
        { type: 'separator' },
        { label: 'Ausschneiden', role: 'cut' },
        { label: 'Kopieren', role: 'copy' },
        { label: 'Einfügen', role: 'paste' },
        { label: 'Alles auswählen', role: 'selectall' }
      ]
    },
    {
      label: 'Ansicht',
      submenu: [
        { label: 'Vergrößern', role: 'zoomin' },
        { label: 'Verkleinern', role: 'zoomout' },
        { label: 'Standardgröße', role: 'resetzoom' },
        { type: 'separator' },
        { label: 'Nachtmodus', type: 'checkbox', checked: false, click: toggleDarkTheme },
        { type: 'separator' },
        { label: 'Vollbild', role: 'togglefullscreen' }
      ]
    }
  ]
  addDeveloperMenu(template)
  addHelpMenu(template)
  return template
}
