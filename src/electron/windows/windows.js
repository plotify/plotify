// key: webContents, value: BrowserWindow
const windows = new Map()

// key: BrowserWindow, value: boolean
const readyStatus = new Map()

// key: String, value: BrowserWindow
const storyPaths = new Map()

export const getWindows = () => {
  return windows.values()
}

export const getNumberOfWindows = () => {
  return windows.size
}

export const addWindow = (browserWindow) => {
  windows.set(browserWindow.webContents, browserWindow)
  readyStatus.set(browserWindow, false)
}

export const removeWindow = (browserWindow) => {
  removeWindowValueFromMap(windows, browserWindow)
  removeWindowStoryPath(browserWindow)
  readyStatus.delete(browserWindow)
}

export const getWindowByWebContents = (webContents) => {
  return windows.get(webContents)
}

export const isWindowReady = (browserWindow) => {
  return readyStatus.get(browserWindow)
}

export const setWindowIsReady = (browserWindow) => {
  readyStatus.set(browserWindow, true)
}

export const getWindowByStoryPath = (storyPath) => {
  return storyPaths.get(storyPath)
}

export const setWindowStoryPath = (browserWindow, storyPath) => {
  storyPaths.set(storyPath, browserWindow)
}

export const removeWindowStoryPath = (browserWindow) => {
  removeWindowValueFromMap(storyPaths, browserWindow)
}

const removeWindowValueFromMap = (map, browserWindow) => {
  for (let entry of map.entries()) {
    const key = entry[0]
    const value = entry[1]
    if (value === browserWindow) {
      map.delete(key)
    }
  }
}
