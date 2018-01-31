import * as t from './action-types'

import { getNumberOfLoadingProccesses, getWindow } from './selectors'

import create from './create'

export const showSplashScreen = () => (dispatch, getState) => {
  dispatch(incrementLoadingProcesses())
  const window = getWindow(getState())
  if (window === null) {
    const newWindow = create()
    dispatch(setWindow(newWindow))
  } else {
    window.restore()
    window.focus()
  }
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
    getWindow(getState()).close()
    dispatch(setWindow(null))
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
