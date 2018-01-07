import { closePreferences, initPreferences, isDarkThemeEnabled, setDarkThemeEnabled } from './'

test('exports initPreferences function', () => {
  expect(initPreferences).toBeInstanceOf(Function)
})

test('exports isDarkThemeEnabled function', () => {
  expect(isDarkThemeEnabled).toBeInstanceOf(Function)
})

test('exports setDarkThemeEnabled function', () => {
  expect(setDarkThemeEnabled).toBeInstanceOf(Function)
})

test('exports closePreferences function', () => {
  expect(closePreferences).toBeInstanceOf(Function)
})
