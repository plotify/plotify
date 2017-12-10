import * as t from './action-types'

import { shell } from 'electron'

export const openFileInFolder = (path) => {
  return async (dispatch) => {
    const successful = shell.showItemInFolder(path)
    if (!successful) {
      dispatch(openFolderNotFoundDialog())
    }
  }
}

const openFolderNotFoundDialog = () => ({
  type: t.OPEN_FOLDER_NOT_FOUND_DIALOG,
  payload: {}
})

export const closeFolderNotFoundDialog = () => ({
  type: t.CLOSE_FOLDER_NOT_FOUND_DIALOG,
  payload: {}
})
