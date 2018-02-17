import { closeNavigationDrawer, openNavigationDrawer, setSection } from './actions'
import { createStoryStarted, openStoryStarted } from '../story/actions'
import { getCurrentSection, isNavigationDrawerOpen } from './selectors'

import { WELCOME_SECTION } from '../welcome/constants'
import { createStore } from '../store'
import { openAboutDialog } from '../about/actions'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  const state = store.getState()
  expect(getCurrentSection(state)).toBe(WELCOME_SECTION)
  expect(isNavigationDrawerOpen(state)).toBe(false)
})

test('setSection', async () => {
  const section = 'Hello world'
  await store.dispatch(setSection(section))
  expect(getCurrentSection(store.getState())).toBe(section)
})

test('openNavigationDrawer', async () => {
  await store.dispatch(openNavigationDrawer())
  expect(isNavigationDrawerOpen(store.getState())).toBe(true)
})

test('closeNavigationDrawer', async () => {
  await store.dispatch(openNavigationDrawer())
  expect(isNavigationDrawerOpen(store.getState())).toBe(true)

  await store.dispatch(closeNavigationDrawer())
  expect(isNavigationDrawerOpen(store.getState())).toBe(false)
})

test('openAboutDialog', async () => {
  await store.dispatch(openNavigationDrawer())
  expect(isNavigationDrawerOpen(store.getState())).toBe(true)

  await store.dispatch(openAboutDialog())
  expect(isNavigationDrawerOpen(store.getState())).toBe(false)
})

test('openStoryStarted', async () => {
  await store.dispatch(openNavigationDrawer())
  expect(isNavigationDrawerOpen(store.getState())).toBe(true)

  await store.dispatch(openStoryStarted())
  expect(isNavigationDrawerOpen(store.getState())).toBe(false)
})

test('createStoryStarted', async () => {
  await store.dispatch(openNavigationDrawer())
  expect(isNavigationDrawerOpen(store.getState())).toBe(true)

  await store.dispatch(createStoryStarted())
  expect(isNavigationDrawerOpen(store.getState())).toBe(false)
})
