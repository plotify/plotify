import * as t from './actionTypes'

import { LEAVE_FULL_SCREEN } from '../../shared/view/requests'
import { request } from '../shared/communication'

export const enableDarkTheme = () => ({
  type: t.ENABLE_DARK_THEME,
  payload: {}
})

export const disableDarkTheme = () => ({
  type: t.DISABLE_DARK_THEME,
  payload: {}
})

export const showFullScreenHint = () => ({
  type: t.SHOW_FULL_SCREEN_HINT,
  payload: {}
})

export const closeFullScreenHint = () => ({
  type: t.CLOSE_FULL_SCREEN_HINT,
  payload: {}
})

export const leaveFullScreen = () => () => {
  request(LEAVE_FULL_SCREEN)
}
