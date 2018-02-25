import * as t from './action-types'

import { focusSplashScreenIfExisting, showSplashScreen } from '../splash-screen'
import { getWindowByStoryPath, isWindowReady } from './selectors'

import { BrowserWindow } from 'electron'
import { format } from 'url'
import initEventHandlers from './events'
import { initReload } from '../development'
import isDev from 'electron-is-dev'
import path from 'path'

export const createOrFocus = (storyPath = '') => (dispatch, getState) => {
  const state = getState()
  let window = getWindowByStoryPath(state, storyPath)
  if (window) {
    focusExistingWindowOrSplashScreen(dispatch, state, window)
  } else {
    createNewWindow(dispatch, storyPath)
  }
}

const createNewWindow = (dispatch, storyPath) => {
  dispatch(showSplashScreen())

  const window = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#FAFAFA',
    show: false
  })

  dispatch(addWindow(window))
  dispatch(setWindowStoryPath(window.id, storyPath))
  initEventHandlers(window)

  if (isDev) {
    initReload(window)
  }

  window.loadURL(format({
    pathname: path.join(__dirname, '../../frontend/static/index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

const focusExistingWindowOrSplashScreen = (dispatch, state, window) => {
  if (isWindowReady(state, window.id)) {
    focusWindow(window)
  } else {
    dispatch(focusSplashScreenIfExisting())
  }
}

export const focusWindow = (window) => {
  const maximized = window.isMaximized()
  if (window.isMinimized()) {
    window.restore()
  }
  if (maximized) {
    window.maximize()
  }
  window.focus()
}

export const addWindow = (window) => ({
  type: t.ADD_WINDOW,
  payload: { window }
})

export const removeWindow = (window) => ({
  type: t.REMOVE_WINDOW,
  payload: { window }
})

export const setWindowIsReady = (id) => ({
  type: t.SET_WINDOW_IS_READY,
  payload: { id }
})

export const setWindowStoryPath = (id, storyPath) => ({
  type: t.SET_WINDOW_STORY_PATH,
  payload: { id, storyPath }
})

export const setWindowFocusStatus = (id, status) => ({
  type: t.SET_WINDOW_FOCUS_STATUS,
  payload: { id, status }
})

export const windowFocusChanged = () => ({
  type: t.WINDOW_FOCUS_CHANGED,
  payload: {}
})
