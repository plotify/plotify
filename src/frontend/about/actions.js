import * as t from './actionTypes'

import isDev from 'electron-is-dev'
import { join } from 'path'
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

export const openLicenseDialog = () => {
  return async (dispatch) => {
    const text = await readFile(getLicenseFile(), { encoding: 'utf-8' })
    dispatch({
      type: t.OPEN_LICENSE_DIALOG,
      payload: { text }
    })
  }
}

export const closeLicenseDialog = () => ({
  type: t.CLOSE_LICENSE_DIALOG,
  payload: {}
})

const getLicenseFile = () => {
  let licenseFile = join(remote.app.getAppPath(), './LICENSE')
  if (isDev) {
    licenseFile = './LICENSE'
  }
  return licenseFile
}
