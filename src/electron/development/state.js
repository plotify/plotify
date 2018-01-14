import { GET_STATE, SET_STATE } from '../../shared/requests'
import { readFile, writeFile } from 'fs-extra'

import { dialog } from 'electron'
import { extname } from 'path'
import { request } from '../shared/communication'

export const getState = (window) => {
  return request(window, GET_STATE)
}

export const exportState = async (window) => {
  const options = { title: 'State exportieren' }
  const file = dialog.showSaveDialog(window, options)
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

export const importState = async (window) => {
  const options = {
    title: 'State importieren',
    properties: ['openFile']
  }
  const files = dialog.showOpenDialog(window, options)
  if (!files) {
    return
  }
  const path = files[0]

  let content
  try {
    content = await readFile(path, { encoding: 'utf-8' })
  } catch (error) {
    console.log(error)
    showError(window, 'Die Datei konnte nicht eingelesen werden.')
    return
  }

  let state
  try {
    state = JSON.parse(content)
    if (typeof state !== 'object') {
      throw new Error()
    }
  } catch (error) {
    showError(window, 'Die Datei enthält kein valides Objekt im JSON-Format.')
    return
  }

  request(window, SET_STATE, state)
}

const showError = (window, message) => {
  dialog.showMessageBox(window, {
    type: 'error',
    title: 'State konnte nicht importiert werden',
    buttons: ['Schließen'],
    defaultId: 0,
    message
  })
}
