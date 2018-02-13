import { Menu } from 'electron'
import { createSelector } from 'reselect'
import edit from './edit'
import file from './file'
import help from './help'
import store from '../store'
import view from './view'

const templateCreator = createSelector(
  file, edit, view, help,
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
  if (prevTemplate === null || prevTemplate !== newTemplate) {
    const menu = Menu.buildFromTemplate(newTemplate)
    Menu.setApplicationMenu(menu)
  }
  prevTemplate = newTemplate
}
