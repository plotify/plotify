import { event } from './shared/communications'
import { DARK_THEME_ENABLED, DARK_THEME_DISABLED } from '../shared/view/events'

const toggleDarkTheme = (item) => {
  const name = item.checked ? DARK_THEME_ENABLED : DARK_THEME_DISABLED
  event(name)
}

export const createMenuTemplate = (platform) => {
  // TODO macOS-spezifisches Menü
  // TODO Neue Geschichte
  // TODO Geschichte öffnen
  // TODO Rückgängig
  // TODO Wiederherstellen
  // TODO Nachtmodus
  // TODO Feedback geben
  // TODO Über Plotify
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
        { label: 'Nachtmodus', type: 'checkbox', click: toggleDarkTheme },
        { type: 'separator' },
        { label: 'Vollbild', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Hilfe',
      submenu: [
        { label: 'Einführungsvideos' },
        { label: 'Benutzerhandbuch' },
        { label: 'Feedback geben' },
        { type: 'separator' },
        { label: 'Entwicklerwerkzeuge', role: 'toggledevtools' },
        { type: 'separator' },
        { label: 'Über Plotify' }
      ]
    }
  ]
}
