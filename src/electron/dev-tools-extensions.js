import { readFile, writeFile } from 'fs-extra'

import isDev from 'electron-is-dev'
import { join } from 'path'

const INDEX_FILE = '../frontend/static/index.html'
const CSP_ORIGINAL = "script-src 'self';"
const CSP_DEV = "script-src 'self' chrome-extension:;"

const init = async () => {
  if (!isDev) {
    return
  }

  try {
    // Das Paket electron-devtools-installer steht nur im Entwicklungsmodus zur Verfügung und
    // kann daher nicht in Produktion geladen werden. Aus diesem Grund kann kein import-Statement verwendet werden.
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
    const name = await installExtension(REACT_DEVELOPER_TOOLS)
    console.log(`Added Extension: ${name}`)
  } catch (error) {
    console.log('Extension error:', error)
    throw error
  }

  try {
    const indexFilePath = join(__dirname, INDEX_FILE)
    const indexFileOriginal = await readFile(indexFilePath, { encoding: 'utf-8' })
    const indexFileDev = indexFileOriginal.replace(CSP_ORIGINAL, CSP_DEV)
    await writeFile(indexFilePath, indexFileDev)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default init
