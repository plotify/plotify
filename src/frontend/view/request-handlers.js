import { DISABLE_DARK_THEME, ENABLE_DARK_THEME, FULL_SCREEN_ENTERED, FULL_SCREEN_LEFT } from '../../shared/view/requests'
import { closeFullScreenHint, disableDarkTheme, enableDarkTheme, showFullScreenHint } from './actions'

import { requestHandler } from '../shared/communication'

const handleEnableDarkTheme = (resolve, _, __, dispatch) => {
  dispatch(enableDarkTheme())
  resolve()
}

const handleDisableDarkTheme = (resolve, _, __, dispatch) => {
  dispatch(disableDarkTheme())
  resolve()
}

const handleFullScreenEntered = (resolve, _, __, dispatch) => {
  dispatch(showFullScreenHint())
  resolve()
}

const handleFullScreenLeft = (resolve, _, __, dispatch) => {
  dispatch(closeFullScreenHint())
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(ENABLE_DARK_THEME, handleEnableDarkTheme)
  requestHandler(DISABLE_DARK_THEME, handleDisableDarkTheme)
  requestHandler(FULL_SCREEN_ENTERED, handleFullScreenEntered)
  requestHandler(FULL_SCREEN_LEFT, handleFullScreenLeft)
}

export default registerRequestHandlers
