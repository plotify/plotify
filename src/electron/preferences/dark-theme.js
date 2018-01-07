import {
  isDarkThemeEnabled as _isDarkThemeEnabled,
  setDarkThemeEnabled as _setDarkThemeEnabled
} from '../../backend/preferences'

import { getPreferences } from './current'

export const isDarkThemeEnabled = async () => {
  return _isDarkThemeEnabled(getPreferences())
}

export const setDarkThemeEnabled = async (enabled) => {
  await _setDarkThemeEnabled(getPreferences(), enabled)
}
