import { closeCreateStoryDialog, closeOpenStoryDialog, closeStoryPreparationStarted, createStoryCanceled, createStoryFailed, createStoryStarted, createStorySuccessful, openStoryCanceled, openStoryFailed, openStoryStarted, openStorySuccessful, _storyClosed as storyClosed } from './actions'
import { getCreatingStoryErrorMessage, getOpeningStoryErrorMessage, getStoryPath, isClosingStory, isCreatingStory, isCreatingStoryFailed, isOpeningStory, isOpeningStoryFailed, isShowCreateStoryDialog, isShowOpenStoryDialog, isStoryOpen } from './selectors'

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
  expect(isOpeningStoryFailed(state)).toBe(false)
  expect(getOpeningStoryErrorMessage(state)).toBe(null)
  expect(isCreatingStory(state)).toBe(false)
  expect(isShowCreateStoryDialog(state)).toBe(false)
  expect(isCreatingStoryFailed(state)).toBe(false)
  expect(getCreatingStoryErrorMessage(state)).toBe(null)
  expect(isClosingStory(state)).toBe(false)
}

test('openStoryStarted', async () => {
  await store.dispatch(openStoryStarted())

  const state = store.getState()
  expect(isOpeningStory(state)).toBe(true)
  expect(isShowOpenStoryDialog(state)).toBe(true)
  expect(isOpeningStoryFailed(state)).toBe(false)
  expect(getOpeningStoryErrorMessage(state)).toBe(null)
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

  const message = 'Hello world!'
  await store.dispatch(openStoryFailed(message))

  const state = store.getState()
  expect(isOpeningStoryFailed(state)).toBe(true)
  expect(getOpeningStoryErrorMessage(state)).toBe(message)
  expect(isStoryOpen(state)).toBe(false)
  expect(getStoryPath(state)).toBe(null)
  expect(isOpeningStory(state)).toBe(false)
})

test('openStoryCanceled', async () => {
  await store.dispatch(openStoryStarted())
  await store.dispatch(openStoryCanceled())

  const state = store.getState()
  expect(isOpeningStory(state)).toBe(false)
  expect(isOpeningStoryFailed(state)).toBe(false)
  expect(getStoryPath(state)).toBe(null)
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
  expect(isCreatingStoryFailed(state)).toBe(false)
  expect(getCreatingStoryErrorMessage(state)).toBe(null)
  expect(isShowOpenStoryDialog(state)).toBe(false)
})

test('createStorySuccessful', async () => {
  await store.dispatch(createStoryStarted())
  await store.dispatch(createStorySuccessful())
  expect(isCreatingStory(store.getState())).toBe(false)
})

test('createStoryFailed', async () => {
  await store.dispatch(createStoryStarted())

  const message = 'Lorem ipsum'
  await store.dispatch(createStoryFailed(message))

  const state = store.getState()
  expect(isCreatingStory(state)).toBe(false)
  expect(isShowCreateStoryDialog(state)).toBe(true)
  expect(isCreatingStoryFailed(state)).toBe(true)
  expect(getCreatingStoryErrorMessage(state)).toBe(message)
})

test('createStoryCanceled', async () => {
  await store.dispatch(createStoryStarted())
  await store.dispatch(createStoryCanceled())

  const state = store.getState()
  expect(isCreatingStory(state)).toBe(false)
  expect(isCreatingStoryFailed(state)).toBe(false)
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
