import Database from './database'
import mode from './mode'
import { parse } from 'path'
import sqlite3 from 'sqlite3'

const open = (path, mode) => {
  validatePath(path)
  validateMode(mode)
  return new Promise((resolve, reject) => {
    const connection = new sqlite3.Database(path, mode, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(new Database(connection))
      }
    })
  })
}

const validatePath = (path) => {
  try {
    parse(path)
  } catch (error) {
    throw new TypeError('Invalid path: ' + path)
  }
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
