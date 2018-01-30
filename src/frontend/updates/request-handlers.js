import { CLOSE_UPDATE_NOTIFICATION, SHOW_UPDATE_NOTIFICATION } from '../../shared/updates/requests'
import { closeUpdateNotification, showUpdateNotification } from './actions'

import { requestHandler } from '../shared/communication'

const handleShowUpdateNotification = (resolve, _, payload, dispatch) => {
  dispatch(showUpdateNotification(payload))
  resolve()
}

const handleCloseUpdateNotification = (resolve, _, __, dispatch) => {
  dispatch(closeUpdateNotification())
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(SHOW_UPDATE_NOTIFICATION, handleShowUpdateNotification)
  requestHandler(CLOSE_UPDATE_NOTIFICATION, handleCloseUpdateNotification)
}

export default registerRequestHandlers
