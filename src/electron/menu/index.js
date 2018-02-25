import { COMPLETE_REBUILD, calculateChanges } from './calculate-changes'

import { Menu } from 'electron'
import applyChanges from './apply-changes'
import { createSelector } from 'reselect'
import edit from './edit'
import file from './file'
import help from './help'
import store from '../store'
import view from './view'
import windows from './windows'

const templateCreator = createSelector(
  file, edit, view, windows, help,
  (...categories) => [...categories]
)

let prevTemplate = null

export const initMenu = () => {
  if (prevTemplate === null) {
    store.subscribe(() => handleStateChanges())
    handleStateChanges()
  }
}

const handleStateChanges = () => {
  const newTemplate = templateCreator(store.getState())

  if (prevTemplate === null) {
    createMenu(newTemplate)
  } else if (prevTemplate !== newTemplate) {
    const changes = calculateChanges(prevTemplate, newTemplate)
    if (changes.includes(COMPLETE_REBUILD)) {
      createMenu(newTemplate)
    } else {
      applyChanges(Menu.getApplicationMenu(), changes)
    }
  }
  prevTemplate = newTemplate
}

// TODO Memory leaks verhindern: https://github.com/electron/electron/issues/9823
const createMenu = (template) => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
