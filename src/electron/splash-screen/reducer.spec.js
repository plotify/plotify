import { decrementLoadingProcesses, incrementLoadingProcesses, setWindow } from './actions'
import { getNumberOfLoadingProccesses, getWindow } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  const state = store.getState()
  expect(getWindow(state)).toBe(null)
  expect(getNumberOfLoadingProccesses(state)).toBe(0)
})

test('setWindow', async () => {
  const window = jest.fn()

  await store.dispatch(setWindow(window))
  expect(getWindow(store.getState())).toBe(window)

  await store.dispatch(setWindow(null))
  expect(getWindow(store.getState())).toBe(null)
})

test('incrementLoadingProcesses', async () => {
  await store.dispatch(incrementLoadingProcesses())
  expect(getNumberOfLoadingProccesses(store.getState())).toBe(1)

  await store.dispatch(incrementLoadingProcesses())
  expect(getNumberOfLoadingProccesses(store.getState())).toBe(2)
})

describe('decrementLoadingProcesses', () => {
  test('reduces the value by 1 if the value is greater than 0', async () => {
    await store.dispatch(incrementLoadingProcesses())
    await store.dispatch(incrementLoadingProcesses())
    await store.dispatch(decrementLoadingProcesses())
    expect(getNumberOfLoadingProccesses(store.getState())).toBe(1)

    await store.dispatch(decrementLoadingProcesses())
    expect(getNumberOfLoadingProccesses(store.getState())).toBe(0)
  })

  test('does not reduce the value by 1 if the value is 0', async () => {
    expect(getNumberOfLoadingProccesses(store.getState())).toBe(0)
    await store.dispatch(decrementLoadingProcesses())
    expect(getNumberOfLoadingProccesses(store.getState())).toBe(0)
  })
})
