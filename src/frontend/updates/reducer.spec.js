import { _closeUpdateNotification as closeUpdateNotification, showUpdateNotification } from './actions'
import { getUpdateNotificationUrl, isUpdateNotificationOpen } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  const state = store.getState()
  expect(isUpdateNotificationOpen(state)).toBe(false)
  expect(getUpdateNotificationUrl(state)).toBe(null)
})

test('showUpdateNotification', async () => {
  const url = 'https://plotify.org/'
  await store.dispatch(showUpdateNotification({ url }))

  const state = store.getState()
  expect(isUpdateNotificationOpen(state)).toBe(true)
  expect(getUpdateNotificationUrl(state)).toBe(url)
})

test('closeUpdateNotification', async () => {
  await store.dispatch(showUpdateNotification({ url: 'https://hello.world/' }))
  expect(isUpdateNotificationOpen(store.getState())).toBe(true)

  await store.dispatch(closeUpdateNotification())

  const state = store.getState()
  expect(isUpdateNotificationOpen(state)).toBe(false)
  expect(getUpdateNotificationUrl(state)).toBe(null)
})
