// TODO Rückgängig
// TODO Wiederherstellen
const editMenu = () => ({
  label: 'Bearbeiten',
  submenu: [
    // { label: 'Rückgängig', role: 'undo' },
    // { label: 'Wiederherstellen', role: 'redo' },
    // { type: 'separator' },
    { label: 'Ausschneiden', role: 'cut' },
    { label: 'Kopieren', role: 'copy' },
    { label: 'Einfügen', role: 'paste' },
    { type: 'separator' },
    { label: 'Alles auswählen', role: 'selectall' }
  ]
})

const initialState = editMenu()

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
