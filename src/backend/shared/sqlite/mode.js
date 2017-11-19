import sqlite3 from 'sqlite3'

const mode = {
  OPEN_READONLY: sqlite3.OPEN_READONLY,
  OPEN_READWRITE: sqlite3.OPEN_READWRITE,
  OPEN_CREATE: sqlite3.OPEN_CREATE
}

export default mode
