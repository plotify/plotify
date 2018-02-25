import * as t from './action-types'

import {
  isDarkThemeEnabled as _isDarkThemeEnabled,
  setDarkThemeEnabled as _setDarkThemeEnabled
} from '../../../backend/preferences'

import { getPreferencesDatabase } from '../database'
import { isDarkThemeEnabled } from './selectors'

export const loadDarkTheme = () => async (dispatch, getState) => {
  const database = getPreferencesDatabase(getState())
  const darkThemeEnabled = await _isDarkThemeEnabled(database)
  dispatch(setDarkThemeEnabled(darkThemeEnabled))
}

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
