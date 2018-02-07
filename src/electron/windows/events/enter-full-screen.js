import { FULL_SCREEN_ENTERED } from '../../../shared/view/requests'
import { request } from '../../shared/communication'

const handleEnterFullScreen = (event) => {
  const window = event.sender
  request(window, FULL_SCREEN_ENTERED)
}

export default handleEnterFullScreen
