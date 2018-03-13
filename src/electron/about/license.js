import { app, shell } from 'electron'
import { dirname, join } from 'path'

import { showMessageBox } from '../shared/dialog'

const title = 'Lizenzierung'
const message = title
const detail = `Copyright © 2017-2018 Sebastian Schmidt & Jasper Meyer

Plotify ist eine freie Software. Du darfst die Software kostenlos verwenden, weiterverbreiten, deren Quelltext studieren, verändern und verbessern.

Plotify ist lizenziert unter der GNU General Public License Version 3.
`

const appDirectory = dirname(app.getAppPath())
const licenseFile = join(appDirectory, '../LICENSE.txt')
const dependenciesLicensesFile = join(appDirectory, '../LICENSES.dependencies.txt')

const options = {
  title,
  message,
  detail,
  buttons: [
    'Lizenz lesen',
    'Abhängigkeiten',
    'Schließen'
  ],
  defaultId: 2,
  cancelId: 2,
  noLink: true
}

export default async (window) => {
  const button = await showMessageBox(window, options)
  switch (button) {
    case 0:
      shell.openItem(licenseFile)
      break
    case 1:
      shell.openItem(dependenciesLicensesFile)
      break
  }
}
