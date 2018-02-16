import * as t from './action-types'

import { getUpdateNotificationUrl, isUpdateNotificationOpen } from './selectors'

import { UPDATE_NOTIFICATION_CLOSED } from '../../shared/updates/requests'
import { request } from '../shared/communication'

export const showUpdateNotification = (update) => ({
  type: t.SHOW_UPDATE_NOTIFICATION,
  payload: { update }
})

export const openUpdateNotificationUrl = () => (dispatch, getState) => {
  const state = getState()
  if (isUpdateNotificationOpen(state)) {
    window.open(getUpdateNotificationUrl(state))
    dispatch(closeUpdateNotification())
  }
}

export const closeUpdateNotification = () => (dispatch, getState) => {
  if (isUpdateNotificationOpen(getState())) {
    dispatch({
      type: t.CLOSE_UPDATE_NOTIFICATION,
      payload: {}
    })
    request(UPDATE_NOTIFICATION_CLOSED)
  }
}
