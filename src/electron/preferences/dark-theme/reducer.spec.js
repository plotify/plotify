import { isDarkThemeEnabled } from './selectors'
import { setDarkThemeEnabled } from './actions'
import store from '../../store'

test('initial state', () => {
  expect(isDarkThemeEnabled(store.getState())).toBe(false)
})

test('setDarkThemeEnabled', async () => {
  await store.dispatch(setDarkThemeEnabled(true))
  expect(isDarkThemeEnabled(store.getState())).toBe(true)
})
