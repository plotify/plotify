import { exportState, importState } from '../development'

import { OPEN_ABOUT_DIALOG } from '../../shared/about/requests'
import { request } from '../shared/communication'

const helpMenu = () => ({
  label: 'Hilfe',
  submenu: [
    {
      label: 'Entwicklung',
      submenu: [
        { label: 'State exportieren...', click: exportStateMenu },
        { label: 'State importieren...', click: importStateMenu },
        { type: 'separator' },
        { label: 'Werkzeuge', role: 'toggledevtools' }
      ]
    },
    { type: 'separator' },
    { label: 'Über Plotify', click: openAboutDialog }
  ]
})

const openAboutDialog = (_, window) => {
  request(window, OPEN_ABOUT_DIALOG)
}

const exportStateMenu = (_, window) => {
  exportState(window)
}

const importStateMenu = (_, window) => {
  importState(window)
}

const initialState = helpMenu()

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
