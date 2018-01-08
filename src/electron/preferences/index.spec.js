import { addOrUpdateRecentlyOpenedFile, closePreferences, getRecentlyOpenedFiles, initPreferences, isDarkThemeEnabled, registerRequestHandlers, setDarkThemeEnabled } from './'

test('exports initPreferences function', () => {
  expect(initPreferences).toBeInstanceOf(Function)
})

test('exports isDarkThemeEnabled function', () => {
  expect(isDarkThemeEnabled).toBeInstanceOf(Function)
})

test('exports setDarkThemeEnabled function', () => {
  expect(setDarkThemeEnabled).toBeInstanceOf(Function)
})

test('exports getRecentlyOpenedFiles function', () => {
  expect(getRecentlyOpenedFiles).toBeInstanceOf(Function)
})

test('exports addOrUpdateRecentlyOpenedFile function', () => {
  expect(addOrUpdateRecentlyOpenedFile).toBeInstanceOf(Function)
})

test('exports closePreferences function', () => {
  expect(closePreferences).toBeInstanceOf(Function)
})

test('exports registerRequestHandlers function', () => {
  expect(registerRequestHandlers).toBeInstanceOf(Function)
})
