import { GET_STATE } from '../../shared/requests'
import path from 'path'
import { request } from '../shared/communication'
import { saveState } from './saved-states'
import watch from 'node-watch'

export const initReload = (window) => {
  const frontend = path.join(__dirname, '../../frontend/')
  watch(frontend, { recursive: true }, () => {
    request(window, GET_STATE)
      .then(state => reload(window, state))
  })
}

const reload = (window, state) => {
  saveState(window, state)
  window.webContents.reloadIgnoringCache()
}
