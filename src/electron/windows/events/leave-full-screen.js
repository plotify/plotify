import { FULL_SCREEN_LEFT } from '../../../shared/view/requests'
import { request } from '../../shared/communication'

const handleLeaveFullScreen = (event) => {
  const window = event.sender
  request(window, FULL_SCREEN_LEFT)
}

export default handleLeaveFullScreen
