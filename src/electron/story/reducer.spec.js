import { addLoadingStory, removeStoryByWindowId, setStoryLoaded } from './actions'
import { getStoryByWindowId, getStoryPaths, isStoryLoading } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  expect(getStoryPaths(store.getState()).length).toBe(0)
})

test('addLoadingStory', async () => {
  const path = '/hello/world.story'
  const windowId = 123
  await store.dispatch(addLoadingStory(path, windowId))

  const state = store.getState()
  expect(getStoryByWindowId(state, windowId)).toBe(null)
  expect(isStoryLoading(state, path)).toBe(true)
  expect(getStoryPaths(state)[0]).toBe(path)
})

test('setStoryLoaded', async () => {
  const path = '/hello/world.story'
  const windowId = 123
  await store.dispatch(addLoadingStory(path, windowId))

  const instance = jest.fn()
  await store.dispatch(setStoryLoaded(path, instance))

  const state = store.getState()
  expect(getStoryByWindowId(state, windowId)).toBe(instance)
  expect(isStoryLoading(state, path)).toBe(false)
  expect(getStoryPaths(state)[0]).toBe(path)
})

test('removeStoryByWindowId', async () => {
  const path1 = '/hello/world.story'
  const windowId1 = 123
  await store.dispatch(addLoadingStory(path1, windowId1))

  const path2 = '/lorem/ipsum.story'
  const windowId2 = 456
  await store.dispatch(addLoadingStory(path2, windowId2))
  expect(getStoryPaths(store.getState()).length).toBe(2)

  await store.dispatch(removeStoryByWindowId(windowId1))

  const state = store.getState()
  expect(getStoryPaths(state).length).toBe(1)
  expect(getStoryPaths(state)[0]).toBe(path2)
})
