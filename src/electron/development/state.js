import { GET_STATE } from '../../shared/requests'
import { dialog } from 'electron'
import { extname } from 'path'
import { request } from '../shared/communication'
import { writeFile } from 'fs-extra'

export const getState = (window) => {
  return request(window, GET_STATE)
}

export const exportState = async (window) => {
  const file = dialog.showSaveDialog(window, { title: 'State exportieren' })
  if (!file) {
    return
  }

  let path
  if (extname(file) === '.json') {
    path = file
  } else {
    path = file + '.json'
  }

  const state = await getState(window)
  const json = JSON.stringify(state)
  await writeFile(path, json, { encoding: 'utf-8' })
}
