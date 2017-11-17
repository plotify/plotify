import { GET_STATE } from '../shared/requests'
import path from 'path'
import { request } from './shared/communication'
import { saveState } from './saved-state'
import watch from 'node-watch'

const initReload = (mainWindow) => {
  const frontend = path.join(__dirname, '../frontend/')
  watch(frontend, { recursive: true }, () => {
    request(GET_STATE)
      .then(state => reload(mainWindow, state))
  })
}

const reload = (mainWindow, state) => {
  saveState(state)
  mainWindow.webContents.reloadIgnoringCache()
}

export default initReload
