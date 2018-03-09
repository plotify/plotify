import { dialog } from 'electron'

export const showMessageBox = (browserWindow, options) => {
  return new Promise((resolve, reject) => {
    dialog.showMessageBox(browserWindow, options, (response) => {
      resolve(response)
    })
  })
}
