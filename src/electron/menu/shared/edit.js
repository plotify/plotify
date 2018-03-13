import { createSelector } from 'reselect'
import { isAnyWindowFocused } from '../../windows'

const editMenu = (pasteLabel, enabled) => ({
  label: 'Bearbeiten',
  submenu: [
    { label: 'Ausschneiden', role: 'cut', enabled },
    { label: 'Kopieren', role: 'copy', enabled },
    { label: pasteLabel, role: 'paste', enabled },
    { label: 'Alles auswählen', role: 'selectall', enabled }
  ]
})

export default (pasteLabel) => createSelector(
  () => pasteLabel,
  isAnyWindowFocused,
  editMenu
)
