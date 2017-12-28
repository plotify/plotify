// TODO Save state
// import { setShouldSaveState, shouldSaveState } from './saved-state'
// setShouldSaveState(!shouldSaveState())
// { label: 'Zustand wiederherstellen', type: 'checkbox', checked: shouldSaveState(), click: toggleShouldSaveState }
const development = () => ({
  label: 'Entwicklung',
  submenu: [
    { label: 'Werkzeuge', role: 'toggledevtools' }
  ]
})

export default development
