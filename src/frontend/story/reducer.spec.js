import { closeStoryPreparationStarted, createStoryFailed, createStoryStarted, createStorySuccessful, openStoryFailed, openStoryStarted, openStorySuccessful, _storyClosed as storyClosed } from './actions'
import { getStoryPath, isClosingStory, isCreatingStory, isOpeningStory } from './selectors'

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
  expect(getStoryPath(state)).toBe(null)
  expect(isOpeningStory(state)).toBe(false)
  expect(isCreatingStory(state)).toBe(false)
  expect(isClosingStory(state)).toBe(false)
}

test('openStoryStarted', async () => {
  const path = '/hello/world.story'
  await store.dispatch(openStoryStarted(path))

  const state = store.getState()
  expect(getStoryPath(state)).toBe(path)
  expect(isOpeningStory(state)).toBe(true)
})

test('openStorySuccessful', async () => {
  const path = '/hello/world.story'
  await store.dispatch(openStoryStarted(path))

  await store.dispatch(openStorySuccessful())

  const state = store.getState()
  expect(getStoryPath(state)).toBe(path)
  expect(isOpeningStory(state)).toBe(false)
})

test('openStoryFailed', async () => {
  await store.dispatch(openStoryStarted('/hello/world.story'))
  await store.dispatch(openStoryFailed())

  const state = store.getState()
  expect(getStoryPath(state)).toBe(null)
  expect(isOpeningStory(state)).toBe(false)
})

test('createStoryStarted', async () => {
  await store.dispatch(createStoryStarted())
  expect(isCreatingStory(store.getState())).toBe(true)
})

test('createStorySuccessful', async () => {
  await store.dispatch(createStoryStarted())
  await store.dispatch(createStorySuccessful())
  expect(isCreatingStory(store.getState())).toBe(false)
})

test('createStoryFailed', async () => {
  await store.dispatch(createStoryStarted())
  await store.dispatch(createStoryFailed())
  expect(isCreatingStory(store.getState())).toBe(false)
})

test('closeStoryPreparationStarted', async () => {
  await store.dispatch(openStoryStarted('/hello/world.story'))
  await store.dispatch(openStorySuccessful())
  await store.dispatch(closeStoryPreparationStarted())
  expect(isClosingStory(store.getState())).toBe(true)
})

test('storyClosed', async () => {
  await store.dispatch(openStoryStarted('/hello/world.story'))
  await store.dispatch(openStorySuccessful())
  await store.dispatch(closeStoryPreparationStarted())

  await store.dispatch(storyClosed())
  validateInitialState()
})
