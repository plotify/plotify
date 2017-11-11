let currentMainWindow = null

export const getMainWindow = () => (currentMainWindow)

export const setMainWindow = (mainWindow) => {
  currentMainWindow = mainWindow
}
