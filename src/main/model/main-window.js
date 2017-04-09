let currentMainWindow = null;

export function getMainWindow() {
  return currentMainWindow;
}

export function setMainWindow(mainWindow) {
  currentMainWindow = mainWindow;
}
