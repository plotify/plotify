// key: BrowserWindow, value: Object
const savedStates = new Map()

export const getState = (browserWindow, state) => {
  return savedStates.get(browserWindow)
}

export const saveState = (browserWindow, state) => {
  savedStates.set(browserWindow, state)
}

export const removeState = (browserWindow) => {
  savedStates.delete(browserWindow)
}
