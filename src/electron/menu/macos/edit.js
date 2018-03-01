// TODO Rückgängig
// TODO Wiederherstellen
const menu = () => ({
  label: 'Bearbeiten',
  submenu: [
    { label: 'Ausschneiden', role: 'cut' },
    { label: 'Kopieren', role: 'copy' },
    { label: 'Einsetzen', role: 'paste' },
    { label: 'Alles auswählen', role: 'selectall' }
  ]
})

const staticMenu = menu()

export default () => staticMenu
