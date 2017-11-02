import * as t from './actionTypes'

export function openNavigationDrawer () {
  return {
    type: t.OPEN_NAVIGATION_DRAWER,
    payload: {}
  }
}

export function closeNavigationDrawer () {
  return {
    type: t.CLOSE_NAVIGATION_DRAWER,
    payload: {}
  }
}
