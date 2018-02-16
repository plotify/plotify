import {
  CLOSE_ABOUT_DIALOG,
  CLOSE_CONTRIBUTORS_DIALOG,
  CLOSE_DEPENDENCIES_LICENSES_DIALOG,
  CLOSE_LICENSE_DIALOG,
  OPEN_ABOUT_DIALOG,
  OPEN_CONTRIBUTORS_DIALOG,
  OPEN_DEPENDENCIES_LICENSES_DIALOG,
  OPEN_LICENSE_DIALOG,
  SET_DEPENDENCIES_LICENSES_TEXT
} from './actionTypes'
import {
  CLOSE_STORY_PREPARATION_STARTED,
  CREATE_STORY_STARTED,
  OPEN_STORY_STARTED
} from '../story/action-types'

import { createReducer } from '../../shared/redux'

const initialState = {
  aboutOpen: false,
  contributorsOpen: false,
  licenseOpen: false,
  licenseText: '',
  dependenciesLicensesOpen: false,
  dependenciesLicensesText: ''
}

export default createReducer(initialState, {
  [OPEN_ABOUT_DIALOG]: (state) => ({
    ...state,
    aboutOpen: true
  }),
  [CLOSE_ABOUT_DIALOG]: (state) => ({
    ...state,
    aboutOpen: false
  }),

  [OPEN_CONTRIBUTORS_DIALOG]: (state) => ({
    ...state,
    contributorsOpen: true
  }),
  [CLOSE_CONTRIBUTORS_DIALOG]: (state) => ({
    ...state,
    contributorsOpen: false
  }),

  [OPEN_LICENSE_DIALOG]: (state, { text }) => ({
    ...state,
    licenseOpen: true,
    licenseText: text
  }),
  [CLOSE_LICENSE_DIALOG]: (state) => ({
    ...state,
    licenseOpen: false,
    licenseText: ''
  }),

  [OPEN_DEPENDENCIES_LICENSES_DIALOG]: (state) => ({
    ...state,
    dependenciesLicensesOpen: true,
    dependenciesLicensesText: 'Der Text wird geladen...'
  }),
  [CLOSE_DEPENDENCIES_LICENSES_DIALOG]: (state) => ({
    ...state,
    dependenciesLicensesOpen: false,
    dependenciesLicensesText: ''
  }),
  [SET_DEPENDENCIES_LICENSES_TEXT]: (state, { text }) => ({
    ...state,
    dependenciesLicensesText: state.dependenciesLicensesOpen ? text : ''
  }),

  [CREATE_STORY_STARTED]: () => initialState,
  [OPEN_STORY_STARTED]: () => initialState,
  [CLOSE_STORY_PREPARATION_STARTED]: () => initialState
})
