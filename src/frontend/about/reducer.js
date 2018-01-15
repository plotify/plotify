import * as t from './actionTypes'

import { CLOSE_STORY_PREPARATION_STARTED, CREATE_STORY_STARTED, OPEN_STORY_STARTED } from '../story/action-types'

const initialState = {
  aboutOpen: false,
  contributorsOpen: false,
  licenseOpen: false,
  licenseText: '',
  dependenciesLicensesOpen: false,
  dependenciesLicensesText: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.OPEN_ABOUT_DIALOG:
      return Object.assign({}, state, {
        aboutOpen: true
      })
    case t.CLOSE_ABOUT_DIALOG:
      return Object.assign({}, state, {
        aboutOpen: false
      })

    case t.OPEN_CONTRIBUTORS_DIALOG:
      return Object.assign({}, state, {
        contributorsOpen: true
      })
    case t.CLOSE_CONTRIBUTORS_DIALOG:
      return Object.assign({}, state, {
        contributorsOpen: false
      })

    case t.OPEN_LICENSE_DIALOG:
      return Object.assign({}, state, {
        licenseOpen: true,
        licenseText: action.payload.text
      })
    case t.CLOSE_LICENSE_DIALOG:
      return Object.assign({}, state, {
        licenseOpen: false,
        licenseText: ''
      })

    case t.OPEN_DEPENDENCIES_LICENSES_DIALOG:
      return Object.assign({}, state, {
        dependenciesLicensesOpen: true,
        dependenciesLicensesText: 'Der Text wird geladen...'
      })
    case t.CLOSE_DEPENDENCIES_LICENSES_DIALOG:
      return Object.assign({}, state, {
        dependenciesLicensesOpen: false,
        dependenciesLicensesText: ''
      })
    case t.SET_DEPENDENCIES_LICENSES_TEXT:
      return Object.assign({}, state, {
        dependenciesLicensesText: action.payload.text
      })

    case CREATE_STORY_STARTED:
    case OPEN_STORY_STARTED:
    case CLOSE_STORY_PREPARATION_STARTED:
      return initialState

    default:
      return state
  }
}

export default reducer
