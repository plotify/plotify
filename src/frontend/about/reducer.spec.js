import { closeAboutDialog, closeContributorsDialog, closeDependenciesLicensesDialog, closeLicenseDialog, openAboutDialog, openContributorsDialog, _openDependenciesLicensesDialog as openDependenciesLicensesDialog, _openLicenseDialog as openLicenseDialog, setDependenciesLicensesText } from './actions'
import { closeStoryPreparationStarted, createStoryStarted, openStoryStarted } from '../story/actions'
import { getDependenciesLicensesText, getLicenseText, isAboutDialogOpen, isContributorsDialogOpen, isDependenciesLicensesOpen, isLicenseDialogOpen } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  validateInitialState()
})

const validateInitialState = () => {
  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(false)
  expect(isContributorsDialogOpen(state)).toBe(false)
  expect(isLicenseDialogOpen(state)).toBe(false)
  expect(isDependenciesLicensesOpen(state)).toBe(false)
  expect(getLicenseText(state)).toBe('')
  expect(getDependenciesLicensesText(state)).toBe('')
}

test('openAboutDialog', async () => {
  await store.dispatch(openAboutDialog())

  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(true)
  expect(isContributorsDialogOpen(state)).toBe(false)
  expect(isLicenseDialogOpen(state)).toBe(false)
  expect(isDependenciesLicensesOpen(state)).toBe(false)
})

test('closeAboutDialog', async () => {
  await store.dispatch(openAboutDialog())
  expect(isAboutDialogOpen(store.getState())).toBe(true)

  await store.dispatch(closeAboutDialog())

  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(false)
  expect(isContributorsDialogOpen(state)).toBe(false)
  expect(isLicenseDialogOpen(state)).toBe(false)
  expect(isDependenciesLicensesOpen(state)).toBe(false)
})

test('openContributorsDialog', async () => {
  await store.dispatch(openContributorsDialog())

  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(false)
  expect(isContributorsDialogOpen(state)).toBe(true)
  expect(isLicenseDialogOpen(state)).toBe(false)
  expect(isDependenciesLicensesOpen(state)).toBe(false)
})

test('closeContributorsDialog', async () => {
  await store.dispatch(openContributorsDialog())
  expect(isContributorsDialogOpen(store.getState())).toBe(true)

  await store.dispatch(closeContributorsDialog())

  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(false)
  expect(isContributorsDialogOpen(state)).toBe(false)
  expect(isLicenseDialogOpen(state)).toBe(false)
  expect(isDependenciesLicensesOpen(state)).toBe(false)
})

test('openLicenseDialog', async () => {
  const text = 'Hello world!'
  await store.dispatch(openLicenseDialog(text))

  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(false)
  expect(isContributorsDialogOpen(state)).toBe(false)
  expect(isLicenseDialogOpen(state)).toBe(true)
  expect(isDependenciesLicensesOpen(state)).toBe(false)
  expect(getLicenseText(state)).toBe(text)
})

test('closeLicenseDialog', async () => {
  await store.dispatch(openLicenseDialog('Hello world'))
  expect(isLicenseDialogOpen(store.getState())).toBe(true)

  await store.dispatch(closeLicenseDialog())

  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(false)
  expect(isContributorsDialogOpen(state)).toBe(false)
  expect(isLicenseDialogOpen(state)).toBe(false)
  expect(isDependenciesLicensesOpen(state)).toBe(false)
  expect(getLicenseText(state)).toBe('')
})

test('openDependenciesLicensesDialog', async () => {
  await store.dispatch(openDependenciesLicensesDialog())

  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(false)
  expect(isContributorsDialogOpen(state)).toBe(false)
  expect(isLicenseDialogOpen(state)).toBe(false)
  expect(isDependenciesLicensesOpen(state)).toBe(true)
})

describe('setDependenciesLicensesText', () => {
  test('sets dependencies licenses text if the dialog is open', async () => {
    await store.dispatch(openDependenciesLicensesDialog())
    expect(isDependenciesLicensesOpen(store.getState())).toBe(true)

    const text = 'Lorem ipsum'
    await store.dispatch(setDependenciesLicensesText(text))
    expect(getDependenciesLicensesText(store.getState())).toBe(text)
  })

  test('does not set dependencies licenses text if the dialog is not open', async () => {
    expect(isDependenciesLicensesOpen(store.getState())).toBe(false)
    await store.dispatch(setDependenciesLicensesText('Lorem ipsum'))
    expect(getDependenciesLicensesText(store.getState())).toBe('')
  })
})

test('closeDependenciesLicensesDialog', async () => {
  await store.dispatch(openDependenciesLicensesDialog())
  await store.dispatch(setDependenciesLicensesText('Lorem ipsum'))
  expect(isDependenciesLicensesOpen(store.getState())).toBe(true)

  await store.dispatch(closeDependenciesLicensesDialog())

  const state = store.getState()
  expect(isAboutDialogOpen(state)).toBe(false)
  expect(isContributorsDialogOpen(state)).toBe(false)
  expect(isLicenseDialogOpen(state)).toBe(false)
  expect(isDependenciesLicensesOpen(state)).toBe(false)
  expect(getDependenciesLicensesText(state)).toBe('')
})

test('createStoryStarted', async () => {
  await store.dispatch(openAboutDialog())
  await store.dispatch(createStoryStarted())
  validateInitialState()
})

test('openStoryStarted', async () => {
  await store.dispatch(openAboutDialog())
  await store.dispatch(openStoryStarted())
  validateInitialState()
})

test('openStoryStarted', async () => {
  await store.dispatch(openAboutDialog())
  await store.dispatch(closeStoryPreparationStarted())
  validateInitialState()
})
