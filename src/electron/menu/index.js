import { Menu } from 'electron'
import edit from './edit'
import file from './file'
import help from './help'
import { isDarkThemeEnabled } from '../preferences'
import view from './view'

let initialized = false

// TODO macOS-spezifisches Menü
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

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  initialized = true

  isDarkThemeEnabled().then((enabled) => {
    for (const item of menu.items) {
      if (item.label === 'Ansicht') {
        for (const childItem of item.submenu.items) {
          if (childItem.label === 'Nachtmodus') {
            childItem.checked = enabled
          }
        }
      }
    }
  })
}

export default initMenu
