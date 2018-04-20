import { getWindow } from '../splash-screen'
import openContributorsDialog from './contributors'
import openLicenseDialog from './license'
import { shell } from 'electron'
import { showMessageBox } from '../shared/dialog'
import store from '../store'

const packageJson = require('../../package.json')
const productName = packageJson.productName
const version = packageJson.version
const description = packageJson.description
const homepage = packageJson.homepage

const options = {
  title: 'Über ' + productName,
  message: productName,
  detail: 'Version: ' + version + '\n\n' + description + '\n',
  buttons: [
    'Lizenzierung',
    'Mitwirkende',
    'Website',
    'Schließen'
  ],
  defaultId: 3,
  cancelId: 3,
  noLink: true
}

export default async (window) => {
  // Der About-Dialog soll nicht am Splash Screen angeheftet werden.
  if (isSplashScreen(window)) {
    window = null
  }

  const button = await showMessageBox(window, options)
  switch (button) {
    case 0:
      openLicenseDialog(window)
      break
    case 1:
      openContributorsDialog(window)
      break
    case 2:
      shell.openExternal(homepage)
      break
  }
}

const isSplashScreen = (window) => {
  const splashScreen = getWindow(store.getState())
  return splashScreen === window
}
