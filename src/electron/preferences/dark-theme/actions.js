import * as t from './action-types'

import { setDarkThemeEnabled as _setDarkThemeEnabled } from '../../../backend/preferences'
import { getPreferencesDatabase } from '../database'
import { isDarkThemeEnabled } from './selectors'

export const enableDarkTheme = () => async (dispatch, getState) => {
  const state = getState()
  if (!isDarkThemeEnabled(state)) {
    const database = getPreferencesDatabase(state)
    await _setDarkThemeEnabled(database, true)
    dispatch(setDarkThemeEnabled(true))
  }
}

export const disableDarkTheme = () => async (dispatch, getState) => {
  const state = getState()
  if (isDarkThemeEnabled(state)) {
    const database = getPreferencesDatabase(state)
    await _setDarkThemeEnabled(database, false)
    dispatch(setDarkThemeEnabled(false))
  }
}

export const setDarkThemeEnabled = (enabled) => ({
  type: t.SET_DARK_THEME_ENABLED,
  payload: { enabled }
})
