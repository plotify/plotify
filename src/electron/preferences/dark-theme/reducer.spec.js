import { createStore } from '../../store'
import { isDarkThemeEnabled } from './selectors'
import { setDarkThemeEnabled } from './actions'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  expect(isDarkThemeEnabled(store.getState())).toBe(false)
})

test('setDarkThemeEnabled', async () => {
  await store.dispatch(setDarkThemeEnabled(true))
  expect(isDarkThemeEnabled(store.getState())).toBe(true)
})
