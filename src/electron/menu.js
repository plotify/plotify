import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../shared/view/requests'

import { Menu } from 'electron'
import { OPEN_ABOUT_DIALOG } from '../shared/about/requests'
import { request } from './shared/communication'

const toggleDarkTheme = (item) => {
  const name = item.checked ? ENABLE_DARK_THEME : DISABLE_DARK_THEME
  request(name)

  // Workaround: Unter Unity aktualisiert sich die Checkbox nicht.
  Menu.setApplicationMenu(Menu.getApplicationMenu())
}

const openAboutDialog = () => {
  request(OPEN_ABOUT_DIALOG)
}

export const createMenuTemplate = (platform) => {
  // TODO macOS-spezifisches Menü
  // TODO Neue Geschichte
  // TODO Geschichte öffnen
  // TODO Rückgängig
  // TODO Wiederherstellen
  // TODO Feedback geben
  // TODO Evtl.: Einführungsvideos, Benutzerhandbuch
  return [
    {
      label: 'Datei',
      submenu: [
        { label: 'Neue Geschichte' },
        { label: 'Geschichte öffnen' },
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
    },
    {
      label: 'Hilfe',
      submenu: [
        { label: 'Entwicklerwerkzeuge', role: 'toggledevtools' },
        { type: 'separator' },
        { label: 'Über Plotify', click: openAboutDialog }
      ]
    }
  ]
}
