import { addWindow, removeWindow, setWindowFocusStatus, setWindowIsReady, setWindowStoryPath } from './actions'
import { getNumberOfWindows, getWindowByStoryPath, getWindowStoryPath, isWindowFocused, isWindowReady } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  const state = store.getState()
  expect(getNumberOfWindows(state)).toBe(0)
})

test('addWindow', async () => {
  const id = 123
  const window = { id }
  await store.dispatch(addWindow(window))

  const state = store.getState()
  expect(getNumberOfWindows(state)).toBe(1)
  expect(isWindowReady(state, id)).toBe(false)
  expect(isWindowFocused(state, id)).toBe(false)
  expect(getWindowStoryPath(state, id)).toBe('')
  expect(getWindowByStoryPath(state, '')).toBe(window)
})

test('removeWindow', async () => {
  const window = { id: 123 }
  await store.dispatch(addWindow(window))
  expect(getNumberOfWindows(store.getState())).toBe(1)

  await store.dispatch(removeWindow(window))
  expect(getNumberOfWindows(store.getState())).toBe(0)
})

test('setWindowIsReady', async () => {
  const id = 123
  const window = { id }
  await store.dispatch(addWindow(window))
  expect(isWindowReady(store.getState(), id)).toBe(false)

  await store.dispatch(setWindowIsReady(id))

  const state = store.getState()
  expect(isWindowReady(state, id)).toBe(true)
  expect(isWindowFocused(state, id)).toBe(false)
  expect(getWindowStoryPath(state, id)).toBe('')
  expect(getWindowByStoryPath(state, '')).toBe(window)
})

test('setWindowStoryPath', async () => {
  const id = 123
  const window = { id }
  const path = '/hello/world.story'
  await store.dispatch(addWindow(window))
  expect(getWindowByStoryPath(store.getState(), path)).toBe(undefined)

  await store.dispatch(setWindowStoryPath(id, path))

  const state = store.getState()
  expect(isWindowReady(state, id)).toBe(false)
  expect(isWindowFocused(state, id)).toBe(false)
  expect(getWindowStoryPath(state, id)).toBe(path)
  expect(getWindowByStoryPath(state, path)).toBe(window)
})

test('setWindowFocusStatus', async () => {
  const id = 123
  const window = { id }
  await store.dispatch(addWindow(window))
  expect(isWindowFocused(store.getState(), id)).toBe(false)

  await store.dispatch(setWindowFocusStatus(id, true))

  const state = store.getState()
  expect(isWindowReady(state, id)).toBe(false)
  expect(isWindowFocused(state, id)).toBe(true)
  expect(getWindowStoryPath(state, id)).toBe('')
  expect(getWindowByStoryPath(state, '')).toBe(window)

  await store.dispatch(setWindowFocusStatus(id, false))
  expect(isWindowFocused(store.getState(), id)).toBe(false)
})
