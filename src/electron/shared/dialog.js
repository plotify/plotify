import { dialog } from 'electron'

export const showMessageBox = (browserWindow, options) => {
  return new Promise((resolve, reject) => {
    dialog.showMessageBox(browserWindow, options, (response) => {
      resolve(response)
    })
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
