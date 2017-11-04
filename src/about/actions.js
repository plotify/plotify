import * as t from './actionTypes'

export const openAboutDialog = () => ({
  type: t.OPEN_ABOUT_DIALOG,
  payload: {}
})

export const closeAboutDialog = () => ({
  type: t.CLOSE_ABOUT_DIALOG,
  payload: {}
})

export const openContributorsDialog = () => ({
  type: t.OPEN_CONTRIBUTORS_DIALOG,
  payload: {}
})

export const closeContributorsDialog = () => ({
  type: t.CLOSE_CONTRIBUTORS_DIALOG,
  payload: {}
})
