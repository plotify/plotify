import { LEAVE_FULL_SCREEN } from '../../shared/view/requests'
import { requestHandler } from '../shared/communication'

const handleLeaveFullScreen = (resolve, _, senderWindow) => {
  senderWindow.setFullScreen(false)
  resolve()
}

export const registerRequestHandlers = () => {
  requestHandler(LEAVE_FULL_SCREEN, handleLeaveFullScreen)
}
