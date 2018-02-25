import { SHOW_UPDATE_NOTIFICATION } from '../../shared/updates/requests'
import { checkUpdates } from '../../backend/updates'
import { getWindows } from '../windows'
import { request } from '../shared/communication'
import store from '../store'

const packageJson = require('../../package.json')

const check = async () => {
  console.log('[Updates] Suche nach Updates...')
  try {
    const currentVersion = packageJson.version
    const update = await checkUpdates(currentVersion)
    if (update) {
      console.log('[Updates] Es wurde ein Update gefunden:', update)
      for (const window of getWindows(store.getState())) {
        request(window, SHOW_UPDATE_NOTIFICATION, update)
      }
    } else {
      console.log('[Updates] Es wurden keine Updates gefunden.')
    }
  } catch (error) {
    console.log(error)
    const message = error.message ? error.message : error
    console.log('[Updates] Fehler beim Suchen nach Updates:', message)
  }
}

export default check
