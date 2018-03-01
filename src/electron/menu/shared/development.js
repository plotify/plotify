import { exportState, importState } from '../../development'

const menu = () => ({
  label: 'Entwicklung',
  submenu: [
    { label: 'State exportieren...', click: exportStateMenu },
    { label: 'State importieren...', click: importStateMenu },
    { type: 'separator' },
    { label: 'Werkzeuge', role: 'toggledevtools' }
  ]
})

const exportStateMenu = (_, window) => {
  exportState(window)
}

const importStateMenu = (_, window) => {
  importState(window)
}

const staticMenu = menu()

export default () => staticMenu
