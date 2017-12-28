import { Menu } from 'electron'
import development from './development'
import edit from './edit'
import file from './file'
import help from './help'
import isDev from 'electron-is-dev'
import view from './view'

let initialized = false

const initMenu = () => {
  if (initialized) {
    Menu.setApplicationMenu(Menu.getApplicationMenu())
    return
  }

  const template = []

  template.push(file())
  template.push(edit())
  template.push(view())
  template.push(help())

  if (isDev) {
    template.splice(template.length - 2, 0, development())
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  initialized = true
}

export default initMenu
