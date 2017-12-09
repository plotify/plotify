import { Menu } from 'electron'

const openMenu = (editable, textSelected) => {
  const menu = Menu.buildFromTemplate([
    { label: 'Ausschneiden', role: 'cut', enabled: editable && textSelected },
    { label: 'Kopieren', role: 'copy', enabled: textSelected },
    { label: 'Einfügen', role: 'paste', enabled: editable },
    { label: 'Alles auswählen', role: 'selectall' }
  ])
  menu.popup()
}

const handleContextMenu = (event, params) => {
  const { isEditable, selectionText } = params
  const textSelected = selectionText.length > 0
  if (isEditable || textSelected) {
    openMenu(isEditable, textSelected)
  }
}

export default handleContextMenu
