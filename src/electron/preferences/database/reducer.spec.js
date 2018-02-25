import { createStore } from '../../store'
import { getPreferencesDatabase } from './selectors'
import { setPreferncesDatabase } from './actions'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  expect(getPreferencesDatabase(store.getState())).toBe(null)
})

test('setPreferncesDatabase', async () => {
  const db = jest.fn()

  await store.dispatch(setPreferncesDatabase(db))
  expect(getPreferencesDatabase(store.getState())).toBe(db)

  await store.dispatch(setPreferncesDatabase(null))
  expect(getPreferencesDatabase(store.getState())).toBe(null)
})
