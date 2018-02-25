export {
  default as reducer
} from './reducer'

export {
  openPreferences,
  closePreferences
} from './actions'

export {
  isDarkThemeEnabled,
  enableDarkTheme,
  disableDarkTheme,
  SET_DARK_THEME_ENABLED
} from './dark-theme'

export {
  getRecentlyOpenedFiles,
  addOrUpdateRecentlyOpenedFile,
  removeRecentlyOpenedFile,
  pinRecentlyOpenedFile,
  unpinRecentlyOpenedFile
} from './recently-opened-files'

export {
  default as registerRequestHandlers
} from './request-handlers'
