import * as t from './action-types'

import { getNumberOfLoadingProccesses, getWindow } from './selectors'

import create from './create'

export const showSplashScreen = () => {
  return (dispatch, getState) => {
    dispatch(incrementLoadingProcesses())
    const window = getWindow(getState())
    if (window === null) {
      dispatch(setWindow(create()))
    } else {
      window.restore()
      window.focus()
    }
  }
}

export const focusSplashScreenIfExisting = () => {
  return (dispatch, getState) => {
    const state = getState()
    const window = getWindow(state)
    const loadingProccesses = getNumberOfLoadingProccesses(state)
    if (window !== null && loadingProccesses > 0) {
      window.restore()
      window.focus()
    }
  }
}

export const closeSplashScreen = () => {
  return (dispatch, getState) => {
    dispatch(decrementLoadingProcesses())
    const state = getState()
    const window = getWindow(state)
    const loadingProccesses = getNumberOfLoadingProccesses(state)
    if (loadingProccesses === 0) {
      window.close()
      dispatch(setWindow(null))
    }
  }
}

const incrementLoadingProcesses = () => ({
  type: t.INCREMENT_LOADING_PROCESSES,
  payload: {}
})

const decrementLoadingProcesses = () => ({
  type: t.DECREMENT_LOADING_PROCESSES,
  payload: {}
})

const setWindow = (window) => ({
  type: t.SET_WINDOW,
  payload: { window }
})
