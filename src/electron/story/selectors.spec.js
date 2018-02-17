import { addLoadingStory, setStoryLoaded } from './actions'
import { addWindow, setWindowFocusStatus } from '../windows'
import { getStoryByWindowId, isStoryLoading, isStoryOpenInFocusedWindow } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

describe('getStoryByWindowId', () => {
  test('returns undefined when called with unknown window id', () => {
    expect(getStoryByWindowId(store.getState(), 1111)).toBe(undefined)
  })
})

describe('isStoryLoading', () => {
  test('returns false when called with unknown path', () => {
    expect(isStoryLoading(store.getState(), '/unknown.story')).toBe(false)
  })
})

test('isStoryOpenInFocusedWindow', async () => {
  expect(isStoryOpenInFocusedWindow(store.getState())).toBe(false)

  const window = { id: 123 }
  await store.dispatch(addWindow(window))

  const path = '/hello/world.story'
  await store.dispatch(addLoadingStory(path, window.id))
  await store.dispatch(setStoryLoaded(path, jest.fn()))

  await store.dispatch(setWindowFocusStatus(window.id, true))
  expect(isStoryOpenInFocusedWindow(store.getState())).toBe(true)
})
