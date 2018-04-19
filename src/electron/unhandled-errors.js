import { app, clipboard, shell } from 'electron'
import { platform, release } from 'os'
import { showErrorBox, showMessageBox } from './shared/dialog'

import { RENDERER_ERROR } from '../shared/requests'
import packageJson from '../package.json'
import { requestHandler } from './shared/communication'

process.on('unhandledRejection', (error) => {
  handleError('Unhandled promise rejection', error)
})

process.on('uncaughtException', (error) => {
  handleError('Uncaught exception', error)
})

requestHandler(RENDERER_ERROR, (resolve, _, __, error) => {
  handleError('Renderer error', error)
  resolve()
})

let appReady = false
app.on('ready', () => {
  appReady = true
})

const handleError = (type, error) => {
  console.error('[Error] ' + type + ':', error.stack ? error.stack : error)
  if (appReady) {
    handleErrorWhenAppIsReady(type, error)
  } else {
    handleErrorBeforeAppIsReady(type, error)
  }
}

const title = 'Es ist ein unerwarteter Fehler aufgetreten.'
const message = 'Bitte melde diesen Fehler an die Entwickler von Plotify. ' +
  'Auf der Website erfährst du, wie du einen Fehler melden kannst.'

const handleErrorWhenAppIsReady = async (type, error) => {
  const button = await showMessageBox(null, {
    type: 'error',
    message: title,
    detail: message +
      ' Wenn du auf den Button "Fehler kopieren" klickst, wird die Fehlermeldung in die Zwischenablage kopiert.',
    buttons: ['Fehler kopieren', 'Website öffnen', 'Schließen'],
    defaultId: 2,
    cancelId: 2,
    noLink: true
  })

  if (button === 0) {
    clipboard.writeText(createErrorReport(type, error))
  } else if (button === 1) {
    shell.openExternal(packageJson.homepage)
  }

  if (button !== 2) {
    handleErrorWhenAppIsReady(type, error)
  }
}

const handleErrorBeforeAppIsReady = (type, error) => {
  const errorReport = createErrorReport(type, error)
  const content = message +
    '\n\nWebsite: ' + packageJson.homepage +
    '\n\nFehlermeldung:\n\n' + errorReport
  showErrorBox(title, content)
}

const createErrorReport = (type, error) => `Plotify-Version: ${packageJson.version}
Betriebssystem: ${platform()} ${release()}
Fehlertyp: ${type}

${error.stack ? error.stack : error + ''}`
