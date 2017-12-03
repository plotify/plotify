import * as t from './actionTypes'

export const setSection = (id) => ({
  type: t.SET_SECTION,
  payload: { id }
})

export const openNavigationDrawer = () => ({
  type: t.OPEN_NAVIGATION_DRAWER,
  payload: {}
})

export const closeNavigationDrawer = () => ({
  type: t.CLOSE_NAVIGATION_DRAWER,
  payload: {}
})
