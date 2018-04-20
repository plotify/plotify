import * as t from './action-types'

import { getNumberOfLoadingProccesses, getWindow } from './selectors'

import create from './create'

export const showSplashScreen = () => (dispatch, getState) => {
  dispatch(incrementLoadingProcesses())
  let window = getWindow(getState())
  if (window === null) {
    window = create()
    dispatch(setWindow(window))
  } else {
    window.restore()
    window.focus()
  }
  return window
}

export const focusSplashScreenIfExisting = () => (dispatch, getState) => {
  const window = getWindow(getState())
  const loadingProccesses = getNumberOfLoadingProccesses(getState())
  if (window !== null && loadingProccesses > 0) {
    window.restore()
    window.focus()
  }
}

export const closeSplashScreen = () => (dispatch, getState) => {
  dispatch(decrementLoadingProcesses())
  const loadingProccesses = getNumberOfLoadingProccesses(getState())
  if (loadingProccesses === 0) {
    getWindow(getState()).destroy()
    dispatch(setWindow(null))
  }
}

export const incrementLoadingProcesses = () => ({
  type: t.INCREMENT_LOADING_PROCESSES,
  payload: {}
})

export const decrementLoadingProcesses = () => ({
  type: t.DECREMENT_LOADING_PROCESSES,
  payload: {}
})

export const setWindow = (window) => ({
  type: t.SET_WINDOW,
  payload: { window }
})
