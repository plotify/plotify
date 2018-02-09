import { app as App } from 'electron'
import { openAboutDialog } from './help'
const app = () => ({
  label: App.getName(),
  submenu: [
    { label: 'Über Plotify', click: openAboutDialog },
    { type: 'separator' },
    { label: 'Plotify Verstecken', role: 'hide' },
    { label: 'Andere Verstecken', role: 'hideothers' },
    { label: 'Alle Anzeigen', role: 'unhide' },
    { type: 'separator' },
    { label: 'Plotify Beenden', role: 'quit' }
  ]
})

export default app
