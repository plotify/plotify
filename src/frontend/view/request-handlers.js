import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../shared/view/requests'
import { disableDarkTheme, enableDarkTheme } from './actions'

import { requestHandler } from '../shared/communication'

const handleEnableDarkTheme = (resolve, _, __, dispatch) => {
  dispatch(enableDarkTheme())
  resolve()
}

const handleDisableDarkTheme = (resolve, _, __, dispatch) => {
  dispatch(disableDarkTheme())
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(ENABLE_DARK_THEME, handleEnableDarkTheme)
  requestHandler(DISABLE_DARK_THEME, handleDisableDarkTheme)
}

export default registerRequestHandlers
