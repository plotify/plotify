import { enableDarkTheme, disableDarkTheme } from './actions'
import { eventHandler } from '../shared/communication'
import { DARK_THEME_ENABLED, DARK_THEME_DISABLED } from '../../shared/view/events'

const handleDarkThemeEnabled = (dispatch) => {
  dispatch(enableDarkTheme())
}

const handleDarkThemeDisabled = (dispatch) => {
  dispatch(disableDarkTheme())
}

const registerEventHandlers = () => {
  eventHandler(DARK_THEME_ENABLED, handleDarkThemeEnabled)
  eventHandler(DARK_THEME_DISABLED, handleDarkThemeDisabled)
}

export default registerEventHandlers
