import { closeCreateStoryDialog, closeOpenStoryDialog, closeStoryPreparationStarted, createStoryFailed, createStoryStarted, createStorySuccessful, openStoryFailed, openStoryStarted, openStorySuccessful, _storyClosed as storyClosed } from './actions'
import { getStoryPath, isClosingStory, isCreatingStory, isOpeningStory, isShowCreateStoryDialog, isShowOpenStoryDialog, isStoryOpen } from './selectors'

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
  expect(isStoryOpen(state)).toBe(false)
  expect(getStoryPath(state)).toBe(null)
  expect(isOpeningStory(state)).toBe(false)
  expect(isShowOpenStoryDialog(state)).toBe(false)
  expect(isCreatingStory(state)).toBe(false)
  expect(isShowCreateStoryDialog(state)).toBe(false)
  expect(isClosingStory(state)).toBe(false)
}

test('openStoryStarted', async () => {
  await store.dispatch(openStoryStarted())

  const state = store.getState()
  expect(isOpeningStory(state)).toBe(true)
  expect(isShowOpenStoryDialog(state)).toBe(true)
  expect(isShowCreateStoryDialog(state)).toBe(false)
})

test('openStorySuccessful', async () => {
  await store.dispatch(openStoryStarted())

  const path = '/hello/world.story'
  await store.dispatch(openStorySuccessful(path))

  const state = store.getState()
  expect(isStoryOpen(state)).toBe(true)
  expect(getStoryPath(state)).toBe(path)
  expect(isOpeningStory(state)).toBe(false)
})

test('openStoryFailed', async () => {
  await store.dispatch(openStoryStarted())
  await store.dispatch(openStoryFailed())

  const state = store.getState()
  expect(isStoryOpen(state)).toBe(false)
  expect(getStoryPath(state)).toBe(null)
  expect(isOpeningStory(state)).toBe(false)
})

test('closeOpenStoryDialog', async () => {
  await store.dispatch(openStoryStarted())
  expect(isShowOpenStoryDialog(store.getState())).toBe(true)
  await store.dispatch(closeOpenStoryDialog())
  expect(isShowOpenStoryDialog(store.getState())).toBe(false)
})

test('createStoryStarted', async () => {
  await store.dispatch(createStoryStarted())

  const state = store.getState()
  expect(isCreatingStory(state)).toBe(true)
  expect(isShowCreateStoryDialog(state)).toBe(true)
  expect(isShowOpenStoryDialog(state)).toBe(false)
})

test('createStorySuccessful', async () => {
  await store.dispatch(createStoryStarted())
  await store.dispatch(createStorySuccessful())
  expect(isCreatingStory(store.getState())).toBe(false)
})

test('createStoryFailed', async () => {
  await store.dispatch(createStoryStarted())
  await store.dispatch(createStoryFailed())

  const state = store.getState()
  expect(isCreatingStory(state)).toBe(false)
  expect(isShowCreateStoryDialog(state)).toBe(true)
})

test('closeCreateStoryDialog', async () => {
  await store.dispatch(createStoryStarted())
  expect(isShowCreateStoryDialog(store.getState())).toBe(true)
  await store.dispatch(closeCreateStoryDialog())
  expect(isShowCreateStoryDialog(store.getState())).toBe(false)
})

test('closeStoryPreparationStarted', async () => {
  await store.dispatch(openStoryStarted())
  await store.dispatch(openStorySuccessful('/hello/world.story'))
  await store.dispatch(closeStoryPreparationStarted())

  const state = store.getState()
  expect(isStoryOpen(state)).toBe(true)
  expect(isClosingStory(state)).toBe(true)
  expect(isShowOpenStoryDialog(state)).toBe(false)
  expect(isShowCreateStoryDialog(state)).toBe(false)
})

test('storyClosed', async () => {
  await store.dispatch(openStoryStarted())
  await store.dispatch(openStorySuccessful('/hello/world.story'))
  await store.dispatch(closeStoryPreparationStarted())

  await store.dispatch(storyClosed())
  validateInitialState()
})
