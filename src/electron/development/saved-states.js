// key: BrowserWindow, value: Object
const savedStates = new Map()

export const getSavedState = (browserWindow, state) => {
  return savedStates.get(browserWindow)
}

export const saveState = (browserWindow, state) => {
  savedStates.set(browserWindow, state)
}

export const removeSavedState = (browserWindow) => {
  savedStates.delete(browserWindow)
}
