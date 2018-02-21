import { addWindow, setWindowFocusStatus, setWindowIsReady } from './actions'
import { getWindowEntities, getWindows, isAnyWindowFocused, isAnyWindowReady } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

test('getWindowEntities', async () => {
  const window = { id: 123 }
  await store.dispatch(addWindow(window))

  const result = getWindowEntities(store.getState())
  expect(result.length).toBe(1)
  expect(result[0]).toEqual({
    instance: window,
    ready: false,
    storyPath: '',
    focused: false
  })
})

test('getWindows', async () => {
  const window = { id: 123 }
  await store.dispatch(addWindow(window))

  const result = getWindows(store.getState())
  expect(result.length).toBe(1)
  expect(result[0]).toBe(window)
})

test('isAnyWindowReady', async () => {
  const id = 123
  const window = { id }
  await store.dispatch(addWindow(window))
  expect(isAnyWindowReady(store.getState())).toBe(false)

  await store.dispatch(setWindowIsReady(id))
  expect(isAnyWindowReady(store.getState())).toBe(true)
})

test('isAnyWindowFocused', async () => {
  const id = 123
  const window = { id }
  await store.dispatch(addWindow(window))
  expect(isAnyWindowFocused(store.getState())).toBe(false)

  await store.dispatch(setWindowFocusStatus(id, true))
  expect(isAnyWindowFocused(store.getState())).toBe(true)
})
