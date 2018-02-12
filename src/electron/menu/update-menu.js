import { Menu } from 'electron'
import store from '../store'

let prevState = null

const initMenu = () => {
  if (prevState === null) {
    store.subscribe(() => handleStateChanges())
    handleStateChanges()
  }
}

const handleStateChanges = () => {
  const newState = store.getState()
  if (prevState === null || prevState.menu !== newState.menu) {
    updateMenu(newState.menu)
  }
  prevState = newState
}

const updateMenu = (menuState) => {
  const keys = Object.keys(menuState)
  const template = []
  for (const key in keys) {
    template[key] = menuState[key]
  }
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

export default initMenu
