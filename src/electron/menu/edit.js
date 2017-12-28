const edit = () => ({
  label: 'Bearbeiten',
  submenu: [
    // { label: 'Rückgängig', role: 'undo' },
    // { label: 'Wiederherstellen', role: 'redo' },
    // { type: 'separator' },
    { label: 'Ausschneiden', role: 'cut' },
    { label: 'Kopieren', role: 'copy' },
    { label: 'Einfügen', role: 'paste' },
    { label: 'Alles auswählen', role: 'selectall' }
  ]
})

export default edit
