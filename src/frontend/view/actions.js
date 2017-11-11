import * as t from './actionTypes'

export const enableDarkTheme = () => ({
  type: t.ENABLE_DARK_THEME,
  payload: {}
})

export const disableDarkTheme = () => ({
  type: t.DISABLE_DARK_THEME,
  payload: {}
})
