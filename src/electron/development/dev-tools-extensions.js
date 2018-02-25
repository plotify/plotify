import { readFile, writeFile } from 'fs-extra'

import isDev from 'electron-is-dev'
import { join } from 'path'

const INDEX_FILE = '../../frontend/static/index.html'
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
    await installExtension(REACT_DEVELOPER_TOOLS)
  } catch (error) {
    console.log('Fehler beim Hinzufügen der React Developer Tools:', error)
    throw error
  }

  try {
    // Die Content Security Policy (CSP) verhindert standardmäßig, dass Chrome-Erweiterungen ausgeführt werden können.
    // Damit im Entwicklungsmodus Chrome-Erweiterungen ausgeführt werden können, wird die CSP entsprechend angepasst.
    const indexFilePath = join(__dirname, INDEX_FILE)
    const indexFileOriginal = await readFile(indexFilePath, { encoding: 'utf-8' })
    const indexFileDev = indexFileOriginal.replace(CSP_ORIGINAL, CSP_DEV)
    await writeFile(indexFilePath, indexFileDev)
  } catch (error) {
    console.log('Fehler beim Anpassen der CSP für die Verwendung der React Developer Tools:', error)
    throw error
  }
}

export default init
