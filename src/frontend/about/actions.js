import * as t from './action-types'

import { dirname, join } from 'path'

import isDev from 'electron-is-dev'
import { readFile } from 'fs-extra'
import { remote } from 'electron'

export const openAboutDialog = () => ({
  type: t.OPEN_ABOUT_DIALOG,
  payload: {}
})

export const closeAboutDialog = () => ({
  type: t.CLOSE_ABOUT_DIALOG,
  payload: {}
})

export const openContributorsDialog = () => ({
  type: t.OPEN_CONTRIBUTORS_DIALOG,
  payload: {}
})

export const closeContributorsDialog = () => ({
  type: t.CLOSE_CONTRIBUTORS_DIALOG,
  payload: {}
})

export const openLicenseDialog = () => async (dispatch) => {
  const text = await loadLicenseText()
  dispatch(_openLicenseDialog(text))
}

export const _openLicenseDialog = (text) => ({
  type: t.OPEN_LICENSE_DIALOG,
  payload: { text }
})

export const closeLicenseDialog = () => ({
  type: t.CLOSE_LICENSE_DIALOG,
  payload: {}
})

export const openDependenciesLicensesDialog = () => async (dispatch) => {
  dispatch(_openDependenciesLicensesDialog())
  const text = await loadDependenciesLicensesText()
  dispatch(setDependenciesLicensesText(text))
}

export const _openDependenciesLicensesDialog = () => ({
  type: t.OPEN_DEPENDENCIES_LICENSES_DIALOG,
  payload: {}
})

export const closeDependenciesLicensesDialog = () => ({
  type: t.CLOSE_DEPENDENCIES_LICENSES_DIALOG,
  payload: {}
})

export const setDependenciesLicensesText = (text) => ({
  type: t.SET_DEPENDENCIES_LICENSES_TEXT,
  payload: { text }
})

const loadLicenseText = async () => {
  let licenseFile
  if (isDev) {
    licenseFile = './LICENSE'
  } else {
    const appPathDirectory = dirname(remote.app.getAppPath() + '')
    licenseFile = join(appPathDirectory, '../LICENSE')
  }
  return readFile(licenseFile, { encoding: 'utf-8' })
}

const loadDependenciesLicensesText = async () => {
  if (isDev) {
    return 'Die Lizenzen der Abhängigkeiten können im Entwicklungsmodus nicht angezeigt werden.'
  } else {
    const appPathDirectory = dirname(remote.app.getAppPath() + '')
    const licenseFile = join(appPathDirectory, '../LICENSES.dependencies.txt')
    try {
      return readFile(licenseFile, { encoding: 'utf-8' })
    } catch (error) {
      return 'Die Datei ' + licenseFile + ' konnte nicht geladen werden.'
    }
  }
}
