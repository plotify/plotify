import Database from './database'
import mode from './mode'
import sqlite3 from 'sqlite3'
import { validatePath } from '../validation'

const open = (path, mode) => {
  return new Promise((resolve, reject) => {
    validatePath(path)
    validateMode(mode)
    const connection = new sqlite3.Database(path, mode, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(new Database(connection))
      }
    })
  })
}

const validModes = [
  mode.OPEN_READONLY,
  mode.OPEN_READWRITE,
  mode.OPEN_CREATE,
  mode.OPEN_READONLY | mode.OPEN_READWRITE,
  mode.OPEN_READONLY | mode.OPEN_CREATE,
  mode.OPEN_READWRITE | mode.OPEN_CREATE,
  mode.OPEN_READONLY | mode.OPEN_READWRITE | mode.OPEN_CREATE
]

const validateMode = (mode) => {
  if (!validModes.includes(mode)) {
    throw new TypeError('Invalid mode: ' + mode)
  }
}

export default open
