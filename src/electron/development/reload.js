import { getState } from './state'
import path from 'path'
import { saveState } from './saved-states'
import watch from 'node-watch'

export const initReload = (window) => {
  const frontend = path.join(__dirname, '../../frontend/')
  watch(frontend, { recursive: true }, () => {
    getState(window)
      .then((state) => reload(window, state))
  })
}

const reload = (window, state) => {
  saveState(window, state)
  window.webContents.reloadIgnoringCache()
}
