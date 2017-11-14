import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../shared/view/requests'
import { disableDarkTheme, enableDarkTheme } from './actions'

import { requestHandler } from '../shared/communication'

const handleDarkThemeEnabled = (resolve, reject, dispatch, payload) => {
  dispatch(enableDarkTheme())
  resolve()
}

const handleDarkThemeDisabled = (resolve, reject, dispatch, payload) => {
  dispatch(disableDarkTheme())
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(ENABLE_DARK_THEME, handleDarkThemeEnabled)
  requestHandler(DISABLE_DARK_THEME, handleDarkThemeDisabled)
}

export default registerRequestHandlers
