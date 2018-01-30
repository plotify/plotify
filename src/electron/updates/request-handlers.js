import { CLOSE_UPDATE_NOTIFICATION, UPDATE_NOTIFICATION_CLOSED } from '../../shared/updates/requests'
import { addListener, removeListener } from '../splash-screen'
import { request, requestHandler } from '../shared/communication'

import checkUpdates from './check-updates'
import { getWindows } from '../windows'

let initialSplashScreen = true

const handleSplashScreenEvents = (open) => {
  if (initialSplashScreen && open === false) {
    initialSplashScreen = false
    removeListener(handleSplashScreenEvents)
    checkUpdates()
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
  addListener(handleSplashScreenEvents)
  requestHandler(UPDATE_NOTIFICATION_CLOSED, handleUpdateNotificationClosed)
}
