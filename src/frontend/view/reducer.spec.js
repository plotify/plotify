import { closeFullScreenHint, disableDarkTheme, enableDarkTheme, showFullScreenHint } from './actions'
import { isDarkThemeEnabled, isFullScreenHintOpen } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  const state = store.getState()
  expect(isDarkThemeEnabled(state)).toBe(false)
  expect(isFullScreenHintOpen(state)).toBe(false)
})

test('enableDarkTheme', async () => {
  await store.dispatch(enableDarkTheme())
  expect(isDarkThemeEnabled(store.getState())).toBe(true)
})

test('disableDarkTheme', async () => {
  await store.dispatch(enableDarkTheme())
  expect(isDarkThemeEnabled(store.getState())).toBe(true)
  await store.dispatch(disableDarkTheme())
  expect(isDarkThemeEnabled(store.getState())).toBe(false)
})

test('showFullScreenHint', async () => {
  await store.dispatch(showFullScreenHint())
  expect(isFullScreenHintOpen(store.getState())).toBe(true)
})

test('closeFullScreenHint', async () => {
  await store.dispatch(showFullScreenHint())
  expect(isFullScreenHintOpen(store.getState())).toBe(true)
  await store.dispatch(closeFullScreenHint())
  expect(isFullScreenHintOpen(store.getState())).toBe(false)
})
