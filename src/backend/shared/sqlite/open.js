import Database from './database'
import sqlite3 from 'sqlite3'

const open = (filename, mode) => {
  return new Promise((resolve, reject) => {
    const connection = new sqlite3.Database(filename, mode, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(new Database(connection))
      }
    })
  })
}

export default open
