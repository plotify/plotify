import {
  createOrFocus as _createOrFocus,
  setWindowStoryPath as _setWindowStoryPath
} from './actions'
import {
  getWindowByStoryPath as _getWindowByStoryPath,
  getWindowStoryPath as _getWindowStoryPath,
  getWindows as _getWindows
} from './selectors'

import { bind } from '../shared/redux'
import store from '../store'

export const getWindows = () => _getWindows(store.getState())
export const getWindowByStoryPath = (storyPath) => _getWindowByStoryPath(store.getState(), storyPath)
export const getWindowStoryPath = (id) => _getWindowStoryPath(store.getState(), id)

export const createOrFocus = bind(_createOrFocus)
export const setWindowStoryPath = bind(_setWindowStoryPath)

export { default as reducer } from './reducer'
export { registerRequestHandlers } from './request-handlers'
