import { CLOSE_UPDATE_NOTIFICATION, UPDATE_NOTIFICATION_CLOSED } from '../../shared/updates/requests'
import { getWindows, isAnyWindowReady } from '../windows'
import { request, requestHandler } from '../shared/communication'

import checkUpdates from './check-updates'
import store from '../store'

let updatesChecked = false
let unsubscribe = null

const waitForAnyWindowToBeReady = () => {
  if (updatesChecked === false && isAnyWindowReady()) {
    updatesChecked = true
    unsubscribe()
    setTimeout(checkUpdates, 1000)
  }
}

const handleUpdateNotificationClosed = (resolve, _, senderWindow) => {
  for (const window of getWindows()) {
    if (window !== senderWindow) {
      request(window, CLOSE_UPDATE_NOTIFICATION)
    }
  }
  resolve()
}

export const registerRequestHandlers = () => {
  unsubscribe = store.subscribe(waitForAnyWindowToBeReady)
  requestHandler(UPDATE_NOTIFICATION_CLOSED, handleUpdateNotificationClosed)
}
