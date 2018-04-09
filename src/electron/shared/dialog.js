import { dialog } from 'electron'

export const showMessageBox = (browserWindow, options) => {
  return new Promise((resolve, reject) => {
    if (browserWindow) {
      dialog.showMessageBox(browserWindow, options, (response) => {
        resolve(response)
      })
    } else {
      // Workaround: Ohne setTimeout wird der Button-Code (response) nicht zurückgegeben.
      dialog.showMessageBox(options, (response) => {
        setTimeout(() => resolve(response), 0)
      })
    }
  })
}

export const showOpenDialog = (browserWindow, options) => {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog(browserWindow, options, (filePaths) => {
      resolve(filePaths)
    })
  })
}

export const showSaveDialog = (browserWindow, options) => {
  return new Promise((resolve, reject) => {
    dialog.showSaveDialog(browserWindow, options, (filename) => {
      resolve(filename)
    })
  })
}

export const showErrorBox = (title, content) => {
  return new Promise((resolve) => {
    dialog.showErrorBox(title, content)
    resolve()
  })
}
