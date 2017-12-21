import { BrowserWindow } from 'electron'
import { format } from 'url'
import { join } from 'path'

const create = () => {
  const splashScreen = new BrowserWindow({
    width: 600,
    height: 200,
    backgroundColor: '#824DA0',
    resizable: false,
    frame: false,
    show: false
  })

  splashScreen.once('ready-to-show', () => {
    splashScreen.show()
    splashScreen.focus()
  })

  splashScreen.loadURL(format({
    pathname: join(__dirname, './static/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  return splashScreen
}

export default create
