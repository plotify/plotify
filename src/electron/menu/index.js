import { COMPLETE_REBUILD, calculateChanges } from './calculate-changes'

import { Menu } from 'electron'
import applyChanges from './apply-changes'
import linux from './linux'
import macos from './macos'
import os from 'os'
import store from '../store'
import windows from './windows'

let prevTemplate = null

export const initMenu = () => {
  if (prevTemplate === null) {
    const templateCreator = getPlatformTemplateCreator()
    store.subscribe(() => handleStateChanges(templateCreator))
    handleStateChanges(templateCreator)
  }
}

const getPlatformTemplateCreator = () => {
  switch (os.platform()) {
    case 'linux':
      return linux
    case 'darwin':
      return macos
    case 'win32':
    default:
      return windows
  }
}

const handleStateChanges = (templateCreator) => {
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
